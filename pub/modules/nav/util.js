var history = require('./history')
var route = require('route')
var Event = require('venders/emitter/Event')

var navUtil = exports

var listeners = {}
$.each(Event.TYPE.NAV, function(val, key){
	listeners[val] = []
})

navUtil.addListener = function(type, listener){
	listeners[type].push(listener)
	return navUtil
}

navUtil.location = function(url, options){
	options = options || {}
	var isReplace = options.isReplace
	var isReload = options.isReload
	var isBack = options.isBack
	var type = isReplace ? Event.TYPE.NAV.REPLACE :  isReload ? Event.TYPE.NAV.RELOAD : Event.TYPE.NAV.LOCATION
	var e = new Event({
		type: type,
		href: url
	})
	// 需要在 excuteListeners 之前执行 ignoreCurrentPage
	// 因为 excuteListeners 可能会改变页面的URL，那么 ignore 的就是新的页面了
	if(isReplace)
		history.ignoreCurrentPage()
	excuteListeners(e)
	if(isReplace){
		// history.isReplace = isReplace
		if(!e.defaultPrevented) location.replace(url)
	}
	else if(isReload){
		if(!e.defaultPrevented) location.reload()
	}
	else {
		if(isBack){
			history.isBack = isBack

			var isBackUrlInHistory = false
			var lastIndex = history.history.length - 1
			// 最后一个如果跟需要后退到的相同，不行
			for(var index = lastIndex - 1; index >= 0; index--){
				if(url == history.history[index]) {
					isBackUrlInHistory = true
					break
				}
			}
			// 如果要后退到的URL确实在历史记录中，则，此记录(自身保留)后面的URL都会被删除
			if(isBackUrlInHistory){
				history.pop(index+1)
			}
		}

		if(!e.defaultPrevented) location.href = url
	}
	return url
}

/**
 *
 * @param url 如果传了此参数，意味着，不论系统中存储的上一个 URL 是什么，都把 url 当作上一个 URL 来后退
 */
navUtil.back = function(url){
//	if(!url) url = history.getLastPage(true)
	// 不论有没有提供url参数，都要把现存的 history 栈中把最后一个给 pop 出来
	var lastUrl = history.getLastPage(true)
	if(!url) url = lastUrl || '/'

	navUtil.location(url, {
		isBack: true
	})
}

navUtil.backToLastPagePermissionLogin = function(){
	navUtil.back(history.getLastPageByPermission(true, route.PERMISSION_TYPE_LOGIN))
}

navUtil.backToLastPagePermissionNotLogin = function(){
	navUtil.back(history.getLastPageByPermission(true, route.PERMISSION_TYPE_NOT_LOGIN))
}

navUtil.reload = function(){
	navUtil.location(location.href, {
		isReload: true
	})
}

navUtil.replace = function(url){
	navUtil.location(url, {
		isReplace: true
	})
}

function excuteListeners(e){
	listeners[e.type].forEach(function(listener){
		listener(e)
	})
}