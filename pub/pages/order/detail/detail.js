var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var url = require('url')
var nav = require('nav')
var inherit = require('inherit')
//var navUtil = require('modules/nav/util')
var Toast = require('toast')
var tplFn = require('templates/order/detail.content.html')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')
var loading = require('loading')
var Status = require('pages/order/list/_orderStatus')
var du = require('baiduTongji')

var params
var qs
var needCheckStatus

var pageAction = {
	// 进入页面时需要检查订单状态 -- 比如订单支付之后，从支付宝调到这个页面的时候需要检查
	CHECK_STATUS: 'checkstatus'
}

var toast = Toast.getToast()

var OrderDetail = inherit({
	name: 'OrderDetail',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_ORDER_DETAIL, du.CustomScope.PAGE)

			params = route.getPathParam(route.R.ORDER_DETAIL)
			qs = url.parseSearch()
			var hashParam = url.parseHash()
			var orderType = qs.type

			/**
			 * 刚从支付宝付款回来
			 * 需要检查订单
			 */
			if(pageAction.CHECK_STATUS in hashParam){
				delete hashParam[pageAction.CHECK_STATUS]
				var hash = url.stringifyHash(hashParam)
				location.hash = hash
				needCheckStatus = true
			}

			nav.btnLeft.setText('返回').actionBack()
			nav.btnCenter.setText(commonUtil.tpl('{{type}}订单详情', {
				type: orderType == route.ORDER_TYPE_REDEEM ? '待领用' : orderType == route.ORDER_TYPE_DONE ? '已结束' : ''
			}))

			this.orderId = params.order_id
		},
		onShouldUpdate: function(){
			var me = this

			// 这两个接口返回的内容一样，只有 status 有可能不一样
			var api = needCheckStatus ? ajax.API_PAYMENT_STATUS : ajax.API_ORDER_DETAIL

			loading.show()
			me.xhr = ajax.getJSON(api, {
				order_id: me.orderId
			}, success, error, {
				useCache: true,
				cacheType: ajaxCache.TYPE_STILL_LOAD,
				cacheKey: [ajaxCache.ORDER_DETAIL, me.orderId],
				complete: function(){
					loading.hide()
				}
			})

			function success(data, status, xhr, code, args){
				var orderData = data.data
				var itemId = orderData.item_id

				// 是否已经使用过了
				//var isDone = orderData.status > Status.PAID //orderData.redeem_time

				me.orderData = orderData

				var html = tplFn({
					//done: isDone
					order: orderData
					, item: orderData
					, itemId: itemId
					, route: route
					, Status: Status
				})

				me.node = $(html)
				me.onDomReady(args.execute_time)
			}
			function error(xhr, errorType, error, code, message){
				if(errorType !== 'abort'){
					toast.show(message || '网络请求失败了，请亲重试下吧~')
				}
			}
			return this
		}
	},
	statics: {
		NAME: route.N.ORDER_DETAIL
	}
})