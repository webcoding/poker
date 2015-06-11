var detect = require('modules/common/detect')

var WX_DEBUG = false
exports.WX_DEBUG = WX_DEBUG


var app = {
	// 开放平台，网页应用的信息
	open: {
		appid:'wx1a04da7a5d85e882',
		appsecret:'794cc51e639b0f44f4cc0a3f4fc7ecfd'
	},
	// 公众平台，公众账号信息
	mp: {
//		appid:'wxaa8d6f34c8d0a56b',
//		appsecret:'0bf39d0cfb7ed07263ed1534117c415d'

	}
}
exports.app = app

var commonCallback = ['success', 'fail', 'complete', 'cancel', 'trigger']
exports.commonCallback = commonCallback

var wechatMethods = [
	['onMenuShare', ['QQ', 'Weibo', 'Timeline', 'AppMessage']],
	'chooseImage', 'previewImage', 'uploadImage', 'downloadImage',
	'startRecord','stopRecord', 'onVoiceRecordEnd', 'playVoice',
	'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice',
	'downloadVoice', 'translateVoice', 'getNetworkType', 'openLocation',
	'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow',
	'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem',
	'showAllNonBaseMenuItem', 'scanQRCode', 'openProductSpecificView',
	'chooseCard','addCard', 'openCard', 'chooseWXPay'
]
exports.wechatMethods = wechatMethods

var caches = []
exports.caches = caches

function generateFakeMethods(methods, wechat){
	each(methods, function(method){
		if(type(method) === '[object Array]') {
			var subMethods = map(method[1], function(subName){ return method[0] + subName })
			generateFakeMethods(subMethods, wechat)

			method = method[0]
		}
		wechat[method] = function(){
			if(detect.micromessenger || WX_DEBUG){
				// 方法只有一次参数，只存放 arguments[0] 即可
				caches.push([method, arguments[0]])
			}
		}
	})
}
exports.generateFakeMethods = generateFakeMethods


function addArrayMethod(methodName, subMethod, wechat){
	// methodName: onMenuShare
	wechat[methodName] = function(param){

		// subMethod: ['QQ', 'Weibo', 'Timeline', 'AppMessage']
		each(subMethod, function(_type){
			// fullMethodName: onMenuShareQQ, onMenuShareWeibo, onMenuShareTimeline, onMenuShareAppMessage
			var _fullMethodName = methodName + _type
			packParam(param, _type)
			wechat[_fullMethodName](param)
		})
	}
}
exports.addArrayMethod = addArrayMethod

function packParam(param, methodType){
	each(commonCallback, function(callbackType){
		param[callbackType] = generateHandler(methodType, param[callbackType])
	})
}
exports.packParam = packParam

function generateHandler(methodType, originalCallback){
	return function(responseData){
		//alert(methodType)
		if(originalCallback && type(originalCallback) === '[object Function]'){
			responseData.methodType = methodType
			originalCallback(responseData)
		}
	}
}
exports.generateHandler = generateHandler

function each(arr, callback){
	if('length' in arr) {
		for (var i = 0, len = arr.length; i < len; i++) if (callback(arr[i], i, arr) === false) break;
	}
	else {
		for (var key in arr) if (arr.hasOwnProperty(key)) if (callback(arr[key], key, arr) === false) break;
	}
}
exports.each = each

function map(arr, fn){
	var _arr = []
	each(arr, function(val,i,arr){
		_arr[i] = fn(val,i,arr)
	})
	return _arr
}
exports.map = map

function type(o){
	return Object.prototype.toString.call(o)
}
exports.type = type

function merge(target){
	for(var i = 1, len = arguments.length; i<len; i++){
		var source = arguments[i]
		if(Object.prototype.toString.call(source) == '[object Object]')
			each(source, function(val, key){ target[key] = val })
	}
}
exports.merge = merge