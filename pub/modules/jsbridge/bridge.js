var detect = require('modules/common/detect')
var storage = require('storage')

/**
 * can_motion:    是否可以摇一摇
 * can_goForward: 是否 webview 可以前进
 * can_goBack:    是否 webview 可以后退
 *
 * share:              调出分享框
 * push:               推入一个新的 webview
 * pop:                推出当前 webview
 * vibrate:            振动手机
 * hide_navigationBar: 隐藏navigationBar
 * show_navigationBar: 显示navigationBar
 */
var bridgeMethods = [
	//'can_motion', 'can_goForward', 'can_goBack',

	'share', 'push', 'pop', 'vibrate',
	['hideNavigationBar', 'hide_navigationBar'],
	['showNavigationBar', 'show_navigationBar'],
	['historyGetCurrentIndex', 'get_historyIndex'],
	['getDate', 'get_data']
];
/**
 * share:   监听或取消监听 分享的动作
 * motion:  监听或取消监听 摇一摇
 */
var bridgeEvents = ['share', 'motion'];

var method_event_caches = []
function generateFakeMethods(methods){
	each(methods, function(method){
		if(type(method) == '[object Array]') method = method[0]
		addCache(method)
	})
}

function generateFakeEvents(events){
	each(events, function(event){
		each(['on', 'off'], function(action){
			var method = action + event.charAt(0).toUpperCase() + event.substr(1)
			addCache(method)
		})
	})
}

function addCache(methodName){
	exports[methodName] = function(){
		if(detect.iqg){
			// 方法只有一次参数，只存放 arguments[0] 即可
			method_event_caches.push([methodName, arguments[0]])
		}
	}
}


function each(arr, callback){
	if(!arr) return
	if('length' in arr) {
		for (var i = 0, len = arr.length; i < len; i++) if (callback(arr[i], i, arr) === false) break;
	}
	else {
		for (var key in arr) if (arr.hasOwnProperty(key)) if (callback(arr[key], key, arr) === false) break;
	}
}

function type(o){
	return Object.prototype.toString.call(o)
}


var isBridgeReady = false
var readyCaches = []
var inited = false
function init(bridge){
	if(!inited){
		bridge.init()
		inited = true

		bridge.addMethods(bridgeMethods)
		bridge.addEvents(bridgeEvents)
		merge(exports, window.webAttributes, bridge)

		// 定位的地点
		var geoAddr = exports.geolocationAddr
		storage.set(storage.USER_LOCATION, {
			timestamp: Date.now(),
			coords: {
				accuracy: null,
				latitude: geoAddr.lat,
				longitude: geoAddr.lng,
				altitude: null,
				altitudeAcuracy: null,
				heading: null,
				speed: null
			}
		})

		// 使用的地点
		storage.set(storage.USING_ADDR, exports.usingAddr)

		// 选择的城市
		storage.set(storage.CURR_CITY, exports.city) // {id: 21, name: '上海'}

		// 把缓存的函数都执行一遍
		each(method_event_caches, function(cache){
			exports[cache[0]](cache[1])
		})
		method_event_caches = null

		// 把 ready 的缓存执行了
		each(readyCaches, function(callback){ callback(exports) })
		readyCaches = null
	}
}

function onWebViewJavascriptBridgeReady(){
	isBridgeReady = true
	init(window.WebViewJavascriptBridge)
}

function merge(target){
	for(var i = 1, len = arguments.length; i<len; i++){
		var source = arguments[i]
		if(Object.prototype.toString.call(source) == '[object Object]')
			each(source, function(val, key){ target[key] = val })
	}
}


generateFakeMethods(bridgeMethods)
generateFakeEvents(bridgeEvents)

if(window.WebViewJavascriptBridge)
	onWebViewJavascriptBridgeReady()
else
	document.addEventListener('WebViewJavascriptBridgeReady', onWebViewJavascriptBridgeReady, false)


exports.ready = function(callback){
	if(callback){
		if(!detect.iqg || isBridgeReady){
			callback(exports)
		}
		else {
			readyCaches.push(callback)
		}
	}
}