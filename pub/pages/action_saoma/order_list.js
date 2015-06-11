var route = require('route')
var common = require('common')
var nav = require('nav')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')
var Toast = require('toast')
var tplFn = require('templates/action_saoma/order_list.content.html')
var inherit = require('inherit')
var loading = require('loading')
var url = require('url')
var downTip = require('widgets/down-tip/down-tip')
var HashTongJi = require('modules/icount/hash_tj')

var toast = Toast.getToast()

//var fakeData = require--('data/action_saoma/order_list')

var qs

var OrderList = inherit({
	name: 'ActionSaomaOrderList',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			var me = this
			me.__base()

			qs = url.parseSearch()

			downTip.hide()
			nav.hide()

			me._hash_tongji = new HashTongJi().saoma(qs.shop_id, qs.qrtype, ajax.Type.TONGJI_SAOMA_SCAN_CODE)
		},
		onHide: function(){
			var me = this
			me.__base()

			nav.show()
		},
		onShouldUpdate: function(){
			var me = this

//			var ajaxData = {}
//			if(qs.shop_id) ajaxData.shop_id = qs.shop_id

			loading.show()
			me.xhr = ajax.getJSON(ajax.API_ORDER_BY_TYPE, {
				type: ajax.Type.ORDER_ACTION
			}, success, error, {
				//fakeData: fakeData,
				useCache: true,
				cacheType: ajaxCache.TYPE_STILL_LOAD,
				cacheKey: ajaxCache.A_SM_ORDER_LIST,
				complete: function(){
					loading.hide()
				}
			})

			function success(data, status, xhr, code, args){
				var html = tplFn({
					route: route,
					orders: data.data,
					server_time: data.status.server_time,
					urlIPhoneDownload: common.urlIPhoneDownload,
					urlAndroidDownload: common.urlAndroidDownload
				})

				me.node = $(html)
				me.onDomReady(args.execute_time)
			}

			function error(xhr, errorType, error, code, message){
				if(errorType !== 'abort'){
					toast.show(message || '网络错误，请重试')
				}
			}

			return me
		}
	},
	statics: {
		NAME: route.N.A_SM_ORDER_LIST
	}
})