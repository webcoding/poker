var storage = require('storage')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')

function getProfile(successCb, errorCb, completeCb){
	var profile, isNetError

	var xhr = ajax.getJSON(ajax.API_USER_PROFILE, success, error, {
		_auth: ajax.API_USER_PROFILE,

		useCache: true,
		cacheType: ajaxCache.TYPE_STILL_LOAD,
		cacheKey: ajaxCache.USER_PROFILE,
		capture401AutoRedirect: true,
		complete: complete
	})

	return xhr

	function success(data, status, xhr, code, args){
		//alert('去服务器检查是否登录：已登录')
		profile = data.data
		setLogin(profile)

		successCb && successCb(data, status, xhr, code, args)
	}

	function error(xhr, errType, error, code, message,args){
		//alert('去服务器检查是否登录：未登录')
		profile = null

		// 状态 401，明确标明是【未登录】
		if(xhr && xhr.status == 401){
			setLogout()
		}
		// TODO 正确返回了错误信息，具体可能遇到哪些信息，需要日后遇到了，再改进
		else if(error){

		}
		// 可能是 HTTP 500 了等情况
		else{
			isNetError = true
		}
		errorCb && errorCb(xhr, errType, error, code, message, args)
	}

	function complete(_,__,args){
		completeCb && completeCb(profile, isNetError, args)
	}
}

function cleanCache(){
	ajaxCache.removeItem(ajaxCache.USER_PROFILE)
}

/**
 *
 * @param cb {(isLogin, isNetError)=>}
 * @returns {*}
 */
function isLogin(useRemote, cb){
	if(useRemote){
		getProfile(null, null, function(profile, isNetError){
			cb(!!profile, isNetError, profile)
		})
	}
	else{
		var localCheckIsLogin = storage.get(storage.USER_INFO)

		if(cb) cb(localCheckIsLogin)
		else return localCheckIsLogin
	}
}

function setLogin(userInfo){
	storage.set(storage.USER_INFO, userInfo)
}

function setLogout(){
	storage.remove(storage.USER_INFO)
}

exports.getProfile = getProfile

exports.isLogin = isLogin

exports.setLogin = setLogin

exports.setLogout = setLogout

exports.cleanCache = cleanCache