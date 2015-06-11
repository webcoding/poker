var urlCore = require('../url/core')

//var CONST = require('./const')
////
//// 注意，此文件最好只在 ./route.js 中引用进来
////

//var regRoute = /\{\s*(.+?)\s*\}/g
var regRoute = /\:([^\/?\)&]+)(\))?(\?)?/g
function ruleHasVarirable(rule){
	return rule.match(regRoute)
}
var ruleRegCache = {}
function getRuleRegExp(rule){
	if(ruleRegCache[rule]) return ruleRegCache[rule]

	var ruleReg
	if(rule === '/'){
		ruleReg = new RegExp('^/?$')
	}
	else{
		// URL 最后面的 '/' 是可选的，都需要匹配
		// 如果最后的参数也是可选的，那么最后一个必选路径后面的 '/' 也是可选的
		// '/register/:code'  => '/register/123'
		// '/register/:code'  => '/register/123/'
		// '/register/:code?' => '/register/123'
		// '/register/:code?' => '/register/123/'
		// '/register/:code?' => '/register'
		// '/register/:code?' => '/register/'
		var regStr
//		// '/register/:code?' => "/register/?:code?/?"
//		regStr = rule.replace(/(\/)([^\/?]+)(\?)?$/, function(match, $1, $2, $3){
//			// $3 是 "?"，如果最后面是'?'，那前面的 '/' 也是可选的，最后的 '/' 是可选的
//			var _return = ($3 ? $1+'?' : $1) + $2 + ($3||'') + '/?'
//			return _return
//		})
//		// "/register/?:code?/?" => "/register(/:code)?/?"
//		regStr = regStr.replace(/\/\?([^\/]+)\?/, function(match, $1){
//			return '(/' + $1 + ')?'
//		})
		// 一步完成这个步骤
		// :code 应该和前面的 / 同时存在或不存在，它们应该是一个整体
		// '/register/:code?' => "/register(/:code)?/?"
		regStr = rule.replace(/(\/)([^\/?]+)(\?)?$/, function(match, $1, $2, $3){
			// rule => '/register/:code?'
			// $1   => '/'
			// $2   => ':code'
			// $3   => '?'

			// rule => '/item/:item_id'
			// $1   => '/'
			// $2   => ':item_id'
			// $3   => ''
			var tplStr
			if($3){
				tplStr = '(?:/{{name}})?/?'
			}
			else{
				tplStr = '/{{name}}/?'
			}
			var _return = tpl(tplStr, {
				name: $2
			})
			return _return
		})
		// "/register(/:code)?/?" => "/register(/([^\/]+)?/?"
		regStr = regStr.replace(regRoute, function(match, $1, $2, $3){
			return '([^\\/]+)' + ($2||'') + ($3||'')
		})
		ruleReg = new RegExp('^' + regStr + '$')
	}
	return ruleRegCache[rule] = ruleReg
}
exports.getRuleRegExp = getRuleRegExp

/**
 * 因为 pathname 路径里面也有参数，所有 pathname 也需要解析
 *
 * @param rule
 * @param path
 * @returns {map | null - 路径不匹配路由}
 */
exports.getPathParam = function(rule, path){
	var p = path || location.pathname
	var param = {}
	// 下面这一段逻辑与 nodejs 开发服务器的解析逻辑保持一致
	var m
	if(m = ruleHasVarirable(rule)){
		var ruleReg = getRuleRegExp(rule)
		var pathMatch = p.match(ruleReg)
		if(pathMatch){
			$.each(m,function(i,m){
				// 去掉两边的大括号
				// var name = m.substring(1,m.length-1).trim()
				// 去掉左侧的冒号，有右侧可能有的问号
				var name = m.match(/^\:([^\?]+)\??$/)[1]
				var value = pathMatch[i + 1]
				param[name] = value
			})
		}
		else{
			/**
			 * ONLY_DEVELOPMENT_CODE_BEGIN
			 */
			var errMsg = '[ERROR] the location pathname "'+p+'" is not match the route "'+rule+'".'
			throw errMsg
			/**
			 * ONLY_DEVELOPMENT_CODE_END
			 */
		}
	}
	return param
}

/**
 *
 * @param routeName
 * @returns {*}
 */
exports.getRoute = function(rule, qs){
	qs = qs || {}
	var url = rule.replace(regRoute, function(match,$1,_,$3){
		var val = qs[$1]
		if(val === undefined){
			// 可选参数
			if($3 === '?') val = ''
			else throw new Error('[ERROR][ROUTE] route "'+rule+'" need parameter "'+$1+'".')
		}
		delete qs[$1]
		return val
	})
	// 如果不是 "/"，就去掉最后面的 '/'
	if(url !== '/' && url.lastIndexOf('/') === url.length - 1) url = url.substring(0, url.length - 1)
	var _qs = urlCore.stringify(qs)
	if(_qs) url += '?' + _qs

	return url
}

// 是否是当前路径
exports.isRoute = function(rule, path){
	return path.match(getRuleRegExp(rule))
}

// 是否拥有需要的权限
exports.isPermission = function(permission, needPermission){
	return (needPermission & permission) == needPermission
}

// 一个极其简单的模板处理器
function tpl(str, ctx){
	return str.replace(/\{\{\s*([\w\d_$]+)\s*\}\}/g, function(match, $1){
		return ctx[$1]
	})
}


var each = function(o,fn){
	for(var key in o)
		if(o.hasOwnProperty(key))
			if(fn(o[key],key)===false)
				break
}
var extend = function(dest,source){
	each(source,function(v,n){
		dest[n]=v
	})
}
exports.each = each
exports.extend = extend