var inherit = require('inherit')
var route = require('route')
var PageRouteController = require('PageRouteController')
var PageViewController = require('PageViewController')
var history = require('modules/nav/history')
var style = require('./_style')
var navUtil = require('navUtil')
var url = require('url')
var loading = require('loading')
var ready = require('modules/ready/ready')
var Event = require('venders/emitter/Event')
var EventTypeNav = Event.TYPE.NAV
var windowHistory = window.history

var originHost = getHost(location.host)

var Spa = inherit({
	name: 'Spa',
	proto: {
		__constructor: function(){
			var me = this
			// 延迟，
			// 因为 imod 模块都是懒执行的，define 阶段并不执行并 export，只有被 require 时才会 export
			// 所以需要避免 viewController require此模块时，才第一次执行 此模块，
			// 而 viewController 还在 require 其他模块的阶段，并未执行完毕
			//
			// Important
			setTimeout(function(){
				me.init()
			})
		},
		init: function(){
			if(windowHistory.pushState){
				var onNav = $.proxy(this.onNav, this)
				navUtil.addListener(EventTypeNav.REPLACE, onNav)
						.addListener(EventTypeNav.RELOAD, onNav)
						.addListener(EventTypeNav.LOCATION, onNav)

				$(window).on('click', 'a', $.proxy(this.onAnchorClick, this))
				window.addEventListener('popstate', $.proxy(this.onPopstate, this))

				this._changePage(new Event({
					url: url.parseUrl(location.href),
					href: location.href,
					type: EventTypeNav.RELOAD
				}), true)
			}
		},
		/**
		 * @param e {url, href, type}
		 * @param isNextPageSafe
		 */
		_changePage: function(e, isNextPageSafe){
			if(!isNextPageSafe && e.href.indexOf('http') === 0){
				var host = getHost(e.url.host)
				if(host != originHost){
					if(e.type == e.TYPE.NAV.REPLACE) return location.replace(e.href)
					else return (location.href = e.href)
				}
			}

			var routeController = PageRouteController.getControllerByOptions({
				href: e.url.href,
				pathname: e.url.pathname
			})

			if(routeController.isDone()) {
				afterViewControllerLoaded()
			}else{
				loading.show()

				var moduleConfName = imod.path.join(imod.getConfig('viewDirName'), route.C[routeController.routeName] + '.conf.html')
				imod.loadModuleWithNoDependency(moduleConfName, function (_require) {
					var moduleConfFn = _require(moduleConfName)
					var moduleConf = getModuleConf(moduleConfFn)

					style.load(moduleConf.style)

					imod.use(moduleConf.script.main, moduleConf.script.deps, function(){
						var viewController = PageViewController.getViewByRouteName(routeController.routeName)

						routeController
								.setViewController(viewController.setConfig(moduleConf))
								.setMainModule(moduleConf.script.main)
								.done()

						afterViewControllerLoaded()
					})
				})
			}

			function afterViewControllerLoaded(){
				ready.pageReady(function(){
					loading.hide()

					pushState(routeController, e)
					PageRouteController.use(routeController)
					history.addPage()
				})
			}
		},
		onAnchorClick: function(e){
			// 理论上，这里不用检测，只需要在需要的地方添加 e.stopPropagation() 即可
			// 但是，在开发业务逻辑的时候不应该理会底层所做的工作，
			// 而且，在 <a/> 标签执行 e.preventDefault() 本来就意味着阻止页面跳转的动作
			if(e.isDefaultPrevented()) return

			var a = e.currentTarget
			var aNode = $(a)
			if(!a.href.match(/^(http|https|file):/) || a.origin !== location.origin) return

			e.preventDefault()
			e.href = aNode.attr('href')
			e.url = {
				hash: a.hash,
				href: a.href,
				host: a.host,
				hostname: a.hostname,
				pathname: a.pathname,
				origin: a.origin,
				port: a.port,
				search: a.search
			}
			this._changePage(e)
		},
		onNav: function(e){
			e.preventDefault()
			e.url = url.parseUrl(e.href)

			this._changePage(e)
		},
		// popstate 是无法知道，究竟是【前进】还是【后退】的
		onPopstate: function(e){
			var state = e.state

			// safari 下，手动刷新网页或第一次进入网页，会立即触发这个 onpopstate 一次，且 state 是 null
			if(state === null) return

			e.routeName = state.routeName
			e.url = {
				href: location.href,
				pathname: state.pathname
			}

			this._changePage(e, true)
		}
	}
})

function getHost(host){
	return host.match(/[^\.]+\.[^\.]+\:?(\d+)?$/)[0]
}

function getModuleConf(moduleConfFn){
	var moduleConf = {}
	moduleConfFn(moduleConf)
	var script = {
		main: moduleConf.script('main').toString().trim(),
		deps: moduleConf.script('deps').toString().trim()
	}
	var style = moduleConf.style().toString().trim()
	var title = moduleConf.title().toString().trim()
	return {
		script: script,
		style: style,
		title: title
	}
}

function pushState(routeController, e){
	if(e.type === 'popstate') return
	var useReplace = e.type === EventTypeNav.RELOAD
	windowHistory[useReplace ? 'replaceState' : 'pushState'](routeController.json(), null, routeController.href)
}

var spa = new Spa

module.exports = spa