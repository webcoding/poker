var storage = require('storage')
var navUtil = require('navUtil')
var route = require('route')
var _url = require('url')
var userUtil = require('modules/user/util')

// 必须先选择城市才能进入的页面
var listMustHaveCity = [
	//route.R.INDEX,
	route.R.ITEM_LIST_BARGAIN,
	route.R.ITEM_LIST_COUNTDOWN,
	route.R.NOTICE_CENTER,
	route.R.ADDR_SELECT,
	route.R.PROFILE,
	route.R.A_MOTION_START
]

module.exports = function(pageName, callback){
	var qs = _url.parseSearch()

	// 保证先执行 callback，再执行 navUtil 的跳转
	checkCurrCity(pageName, function(available){
		if(available)
			pagePermission(pageName, qs.remote, function(available){
				callback(available)
			})
	})
}

function checkCurrCity(pageName, callback){
	var currCity = storage.get(storage.CURR_CITY)
	if(!currCity && listMustHaveCity.some(function(rule){return route.isRoute(rule, location.pathname)})){
		callback(false)
		//navUtil.location(route.getRoute(route.R.CITY_SELECT))
		_redirect(route.N.CITY_SELECT, pageName)
	}
	else{
		callback(true)
	}
}

function pagePermission(pageName, useRemote, callback){
	var permissionType = route.P[pageName]

	if(permissionType == route.PERMISSION_TYPE_ANYWAY)
		return callback(true)

	userUtil.isLogin(useRemote, function(isLogin){
		// 不能登陆却登录了
		if(permissionType == route.PERMISSION_TYPE_NOT_LOGIN && isLogin){
			callback(false)
			navUtil.back()
		}
		// 需要登陆却没有登录
		else if(permissionType == route.PERMISSION_TYPE_LOGIN && !isLogin){
			callback(false)

			var redirect = route.REDIRECT[pageName]
			_redirect(redirect.routeName, pageName)
		}
		else{
			callback(true)
		}
	})
}

function _redirect(redirectToPageName, pageName){
	var redirect = route.REDIRECT[pageName]
	var qs = {}
	if(redirect.params.length){
		var params = route.getPathParam(route.R[pageName]),
				_qs
		redirect.params.forEach(function(paramName){
			// redirect 就是 from 了，从哪里来的，接下来需要重新重定向
			// 但是 from 字段太容易冲突了
			if(paramName == route.Type.REDIRECT){
				_qs = _qs || _url.parseSearch()
				qs[paramName] = route.getRoute(route.R[pageName], $.extend({}, _qs, params))
			}
			// 先从路由的 path 中取值
			else if(params[paramName]) qs[paramName] = params[paramName]
			// 再从 queryString 中取值
			else {
				_qs = _qs || _url.parseSearch()
				qs[paramName] = _qs[paramName]
			}
		})
	}
	navUtil.location(route.getRoute(route.R[redirectToPageName], qs))
}