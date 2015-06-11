// 用来整合各种 ready 事件
// 从来源来说：
//     DOMContentLoaded、iqg_js_bridge_ready、wifi_app_js_bridge_ready 等
// 从影响来看：
//     pageReady -- 所有内容必须在此事件之后，整合了 DOMContentLoaded 和 爱抢购APP jsbridge 的ready
//     wxReady   -- 微信配置 ready 之后
var bridge = require('dwdBridge')

var isPageReady = false
var pageReadyCaches = []

$(function(){
	bridge.ready(function(){
		isPageReady = true

		pageReadyCaches.forEach(function(callback){
			callback()
		})
		pageReadyCaches = []
	})
})

exports.pageReady = function(callback){
	if(!callback) return

	if(isPageReady) callback()
	else pageReadyCaches.push(callback)
}