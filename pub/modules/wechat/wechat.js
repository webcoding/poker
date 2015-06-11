var detect = require('modules/common/detect')
var ajax = require('ajax')
var Emitter = require('emitter')
var url = require('url')
var inherit = require('inherit')
var wx = require('./jweixin')
var _const = require('./_const')

var wechat = exports
var configError = false

_const.generateFakeMethods(_const.wechatMethods, wechat)

var isReadyCalled = false
function afterGlobalConfigReady(){
	if(isReadyCalled) return
	isReadyCalled = true

	_const.merge(wechat, wx)
	_const.each(_const.wechatMethods, function(method){
		if(_const.type(method) === '[object Array]') _const.addArrayMethod(method[0], method[1], wechat)
	})
	// 把缓存的动作都执行了
	_const.each(_const.caches, function(cache){
		wechat[cache[0]](cache[1])
	})
	// 清空
	_const.caches.splice(_const.caches.length)
}

var globalReadyCaches = []
function ready(callback){
	if(typeof callback == 'function'){
		globalReadyCaches.push(callback)
	}
}
wechat.ready = ready


var WX_DEBUG = _const.WX_DEBUG
var qs

var WeixinPage = inherit({
	name: 'WeixinPage',
	proto: {
		/**
		 * @param {url, }
		 */
		__constructor: function (options) {
			this.readyCaches = []
			this.extend(options)
			this.config()
			wechat.ready = $.proxy(this.ready, this)
		},
		extend: function(options){
			$.extend(this, options)
		},
		config: function(){
			var me = this
			me.isConfiging = true
			if(detect.micromessenger || WX_DEBUG){
				ajax.ajax({
					url: ajax.API_WECHAT_SIGN,
					dataType: 'json',
					// 使用我自己的服务器来调试，成功
					//url: 'http://www.miaoyinfm.com/api/weixin_jssdk_sign',
					//dataType: 'jsonp',
					data: {
						url: me.url
					},
					success: onGetSignSuccess
				})
			}
			else{
				me.afterConfigReady()
			}

			function onGetSignSuccess(data){
				var info = data.data
				//var infoStr = JSON.stringify(info, null, 4)
				//console.log(infoStr)
				//$('#aaa').html('<pre>'+infoStr+'</pre>')

				wx.config({
					debug: imod.isProduction() ? false : WX_DEBUG,
					appId: 'wxaa8d6f34c8d0a56b',//info.appid,
					timestamp: parseInt(info.timestamp),
					nonceStr: info.noncestr,
					signature: info.sign || info.signature,
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
				})

				wx.ready(function(){
					me.isConfiging = false
					me.isConfigReady = true

					afterGlobalConfigReady()

					me.afterConfigReady()
				})

				wx.error(function(res){
					err = res
					afterGlobalConfigReady()
					//alert(JSON.stringify(res))
				})

			}
		},
		ready: function(callback){
			var me = this
			if(me.isConfigReady){
				callback && callback(wechat)
			}
			else{
				me.readyCaches.push(callback)
			}
		},
		afterConfigReady: function(){
			var me = this
			if(globalReadyCaches) {
				globalReadyCaches.forEach(function (readyCache) {
					readyCache(wechat)
				})
				globalReadyCaches = null
			}

			me.readyCaches.forEach(function (readyCache) {
				readyCache(wechat)
			})
		}
	},
	statics: {
		newPage: function(options){
			return new WeixinPage(options)
		}
	}
})

wechat.newPage = WeixinPage.newPage
window.wechat = wechat