var route = require('route')
var common = require('common')
var nav = require('nav')
var Toast = require('toast')
var tplFn = require('templates/other/notice.content.html')
var ajax = require('ajax')
var storage = require('storage')
var inherit = require('inherit')
var ajaxCache = require('modules/ajax/cache')
var loading = require('loading')

var toast = Toast.getToast()

var Notice = inherit({
	name: 'Notice',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('通知中心')
			nav.btnLeft.setText('返回').actionBack()
		},
		onShouldUpdate: function(){
			var me = this

			var time_stamp = storage.get(storage.TS_NOTIFACATION) || 0
			// PHP 的时间戳是到 秒
			var now = Math.round(Date.now() / 1000)

			loading.show()
			me.xhr = ajax.getJSON(ajax.API_NOTIFICATION, {
				time_stamp: time_stamp
			}, success, error, {
				useCache: true,
				cacheType: ajaxCache.TYPE_STILL_LOAD,
				cacheKey: ajaxCache.OTHER_NOTICE,
				complete: function(){
					loading.hide()
				}
			})

			function success(data, status, xhr, code, args){
				storage.set(storage.TS_NOTIFACATION, now)

				var htmlNotification = tplFn({
					data: data.data
				})
				me.node = $(htmlNotification)
				me.onDomReady(args.execute_time)
			}
			function error(){
				toast.show('获取通知失败，请重试一下吧~')
			}
		}
	},
	statics:{
		NAME: route.N.NOTICE_CENTER
	}
})