!function (exports) {
	oldCheck()

	var imod = exports.imod || {}
	var tpl = function(str, ctx){return str.replace(/\{\{\w+?\}\}/g, function(match){return ctx[match.match(/\{\{(\w+?)\}\}/)[1]]})}
	var path = imod.path
	var tryCacheModule = true

	var STATUS = {
		INIT: 1,
		LOADED: 2,
		INITING: 3,
		EXPORTED: 4
	}
	var storeFactory = true
	var factoryExecuteStack = []

	imod._config = {}
	imod.getConfig = function(key){
		return imod._config[key]
	}

	imod.isProduction = isProduction
	imod.isStaging = isStaging
	imod.isDevelopment = isDevelopment
	imod.addResources = addResources
	imod.parseModuleName = parseModuleName

	imod.store = (function(){
		var store = {}
		var storageModules = store.storageModules = {}, needClear = []

		for(var i = 0,len=localStorage.length; i<len; i++){
			var key = localStorage.key(i)
			if(key.indexOf('~') === 0){
				var module = parseModuleName(key)
				if(module.name){
					var m = storageModules[module.name], version
					if(m){
						var versions = Object.keys(m)
						versions.push(module.version)
						versions.sort()
						version = versions[versions.length - 1]

						// 把小的版本删掉
						delete m[versions[0]]
						needClear.push(stringifyModule(module.name.match(/^(.+?)(?:\.js)?$/)[1], versions[0]))
					}
					else{
						m = storageModules[module.name] = {}
						version = module.version
					}
					m[version] = true
				}
				else{
					needClear.push(key)
				}
			}
		}
		needClear.forEach(function(key){ localStorage.removeItem(key) })

		store.set = function(moduleName, content, version){
			if(isProduction() && tryCacheModule){
				var moduleFullName = stringifyModule(moduleName, version)
				var storageModule = storageModules[moduleName]
				if(!storageModule || !storageModule[version]){
					if(!storageModule){
						storageModules[moduleName] = {}
						storageModules[moduleName][version] = true
					}
					// 如果有老的版本，先把老的版本清除掉
					else{
						localStorage.removeItem(moduleFullName)
						storageModules[moduleName][version] = true
					}

					localStorageSetItem(moduleFullName, content)
				}
			}
		}

		store.get = function(moduleName, version){
			if(isProduction() && tryCacheModule){
				var moduleFullName = stringifyModule(moduleName, version)
				return localStorage.getItem(moduleFullName)
			}
		}

		return store
	})()

	imod.caches = {}
	imod.loadings = {}
	imod.config = function(conf){
		for(var key in conf){
			if(conf.hasOwnProperty(key)) imod._config[key] = conf[key]
		}
		var preload = imod._config.preload
		if(preload && preload.length){
			if(typeof preload == 'string') preload = preload.split(',')
			imod.loadModuleWithNoDependency(preload)
		}
	}
	imod.use = function (id, dependencies, callback, extra) {
		dependencies = dependencies || []
		if(typeof dependencies === 'string') dependencies = dependencies.split(',')
		dependencies.push(id)

		addResources(dependencies, callback, extra)
	}
	imod.loadModuleWithNoDependency = function(moduleNames, callback, extra, currentModuleID){
		if(typeof moduleNames === 'string') moduleNames = moduleNames.split(',')
		moduleNames = moduleNames.map(function(moduleName){return normalizeModuleID(moduleName, currentModuleID)})
		addResources(moduleNames, callback, extra)
	}
	function define (id, factory, version) {
		var module = {
			id: id,
			exports: {},
			exportImmediately: false,
			status: STATUS.INIT,
			STATUS: STATUS
		}
		removeLoading(module.id)

		module.factory = factory
		imod.caches[id] = module

		storeFactory && imod.store.set(id, factory.toString(), version)

		module.status = STATUS.LOADED

		Group.onLoadOneModule(module)

		if(module.exportImmediately) executeFactory(module)
	}
	function require (id, currentModuleID) {
		if(factoryExecuteStack.length){
			id = normalizeModuleID(id, factoryExecuteStack[factoryExecuteStack.length - 1].id)
		}
		else if(currentModuleID){
			id = normalizeModuleID(id, currentModuleID)
		}

		var module = imod.caches[id]
		if(module){
			if(module.status < STATUS.INITING){
				executeFactory(module)
			}
			return module.exports
		}
		else{
			throw new Error('[ERROR] can not find "' + id + '"')
			return {}
		}
	}

	function uniqLoadModules(modules){
		var _modules = []
		modules.forEach(function(id){
			var moduleName, parsedModuleName
			parsedModuleName = parseModuleName(id, true)
			moduleName = parsedModuleName.name

			// 已经加载了的 module 就不要再次重复加载
			if(imod.caches[moduleName]) return

			var factory = imod.store.get(moduleName, parsedModuleName && parsedModuleName.version)
			if(factory){
				factory = new Function('return ' + factory)()
				storeFactory = false
				define(moduleName, factory)
				storeFactory = true
			}
			else{
				_modules.push(id)
			}
		})
		return _modules
	}

	function hasPostfix(moduleName){
		var m = moduleName.match(/\.(js|css)$/)
		return m && m[1]
	}

	function addResources(moduleNames, type, callback, extra){
		if(typeof type !== 'string'){
			extra = callback
			callback = type
			type = 'js'
		}
		var isScript = type === 'js'

		var needLoadModules = moduleNames
		if(isScript){
			var useModule = moduleNames[moduleNames.length - 1]
			// 带 .js 的文件名
			moduleNames = uniqLoadModules(moduleNames)

			//var loadingModuleIds = []
			needLoadModules = []
			moduleNames.forEach(function(moduleName){
				var moduleId = parseModuleName(moduleName, true).name
				if(!imod.loadings[moduleId]) {
					needLoadModules.push(moduleName)
					addLoading(moduleId)
				}
			})

			Group.addGroup(moduleNames, useModule, callback, extra)
		}

		if(needLoadModules.length > 0){
			if(isDevelopment()){
				needLoadModules = needLoadModules.map(function(moduleName){ return parseModuleName(moduleName).name })
			}
			// css 文件是已经带了后缀名 ".css" 了的
			// js 文件是纯模块名，没有带 ".js"
			type = isScript ? ('.' + type) : ''
			if(imod.getConfig('combo')){
				var comboBaseUrl = imod._config.comboBaseUrl || ''
				var comboServer = imod._config.comboServer || '/combo'
				var src = tpl('{{comboServer}}?f={{modules}}&b={{comboBaseUrl}}&v={{v}}', {
					modules: needLoadModules.map(function(moduleName){ return moduleName + (hasPostfix(moduleName) ? '' : type) }).join(','),
					comboBaseUrl: comboBaseUrl,
					comboServer: comboServer,
					v: imod._config.v
				})
				isScript ? addScript(src) : addStyle(src)
			}
			else{
				var baseUrl = imod._config.baseUrl || ''
				// 虽然脚本的加载顺序是正确的，但是加载完成的顺序却是随机的
				needLoadModules.forEach(function(id){
					var scriptPath = imod.path.join(baseUrl, id)
					var postfix = hasPostfix(scriptPath) ? '' : type
					var src = tpl('{{scriptPath}}{{postfix}}?v={{v}}',{
						scriptPath: scriptPath,
						v: imod._config.v,
						postfix: postfix
					})
					isScript ? addScript(src) : addStyle(src)
				})
			}
		}
	}

	function addLoading(moduleId){
		//if(isArray(moduleId)) moduleId.forEach(function(moduleId){ imod.loadings[moduleId] = true })
		imod.loadings[moduleId] = true
	}

	function removeLoading(moduleId){
		delete imod.loadings[moduleId]
	}

	function normalizeModuleID(id, currentModuleID){
		var alias = imod._config.alias || {}
		if(id.indexOf('.') == 0) id = path.join(path.dirname(currentModuleID), id)
		id = alias[id] || id
		return id
	}

	function addScript(src){
		var script = document.createElement('script')
		script.src = src
		document.getElementsByTagName('body')[0].appendChild(script)
	}
	function addStyle(href){
		var link = document.createElement('link')
		link.rel = 'stylesheet'
		link.href = href
		document.getElementsByTagName('head')[0].appendChild(link)
	}

	function executeFactory(module, extra){
		if(module.status < STATUS.INITING || (extra && extra.forceExecute)){
			module.status = STATUS.INITING
			factoryExecuteStack.push(module)
			module.getCaller = getModuleCaller
			var factory = module.factory
			factory(require, module.exports, module, extra || {})
			delete module.getCaller
			factoryExecuteStack.pop()
			module.status = STATUS.EXPORTED
		}
	}

	function getModuleCaller(){
		// 最后一个是当前模块
		return factoryExecuteStack[factoryExecuteStack.length - 2]
	}

	function isProduction () {
		return imod._config.env === 'prod'
	}
	function isStaging(){
		return imod._config.env === 'staging'
	}
	function isDevelopment(){
		return imod._config.env === 'dev'
	}

	define.icmd = {}
	exports.imod = imod
	exports.define = define


	/**
	 * Group
	 * 每一组的模块是唯一的，跨组之间也不允许有重复的模块
	 */
	Group.groups = []
	Group.addGroup = function(moduleIDs, useModule, callback, extra){
		var group = new Group(moduleIDs, useModule, callback, extra)
		Group.groups.push(group)
	}
	Group.onLoadOneModule = function(module){
		var groups = Group.groups.filter(function(group){ return !group.done && group.moduleIDs.indexOf(module.id) >= 0 })
		groups.forEach(function(group){
			group.onLoadProgress(module)
		})
	}
	function Group(moduleIDs, useModule, onComplete, extra){
		this.moduleIDs = moduleIDs && moduleIDs.map(function(moduleName){return parseModuleName(moduleName, true).name })
		// 最后一个 module 就是入口模块
		this.useModuleID = useModule && parseModuleName(useModule, true).name//this.moduleIDs[this.moduleIDs.length - 1]
		this.done = false
		this.onComplete = onComplete
		this.extra = extra
		this.loadedModules = []
		if(this.moduleIDs.length === 0) this.complete()
	}
	Group.prototype.onLoadProgress = function(module){
		this.loadedModules.push(module)
		if(this.loadedModules.length == this.moduleIDs.length){
			this.complete()
		}
	}
	Group.prototype.complete = function(){
		this.done = true
		if(this.useModuleID){
			this.useModule = imod.caches[this.useModuleID]
			executeFactory(this.useModule, this.extra)
		}
		this.onComplete && this.onComplete.call(this, require)
	}

	function parseModuleName(moduleName, pureModuleId){
		var reg = new RegExp('^~?(.+?)'+(pureModuleId ? '(?:\\.(?:js|css))?' : '')+'(?:_(\\d+)\\.(?:js|css))?$')
		var m = moduleName.match(reg)
		return {
			name: m && m[1],
			version: m && m[2]
		}
	}

	function stringifyModule(moduleName, version){
		return '~' + moduleName + '.js_' + version + '.js'
	}

	function localStorageSetItem(key, val){
		try{
			localStorage.setItem(key, val)
		}
		// mobile safari 无痕浏览，无法写入
		catch(e){

		}
	}

	// 最初的缓存方案与后来不同，需要把老的缓存全部清除
	function oldCheck(){
		var OLD_IMOD_CACHE_KEY = 'IMOD_MODULE_CACHE'
		if(localStorage.getItem(OLD_IMOD_CACHE_KEY)){
			localStorage.clear()
		}
	}

	//function isArray(arr){
	//	if(Array.isArray) return Array.isArray(arr)
	//	return Object.prototype.toString.call(arr) === '[object Array]'
	//}
}(window)