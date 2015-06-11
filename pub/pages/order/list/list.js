var route = require('route')
var common = require('common')
var nav = require('nav')
var Toast = require('toast')
var tplFn = require('templates/order/list.content.html')
var ajax = require('ajax')
var inherit = require('inherit')
var ajaxCache = require('modules/ajax/cache')
var loading = require('loading')
var tabManager = require('./_tabManager')
var Status = require('./_orderStatus')
var Type = require('pages/item/list/_itemType')
var du = require('baiduTongji')
var PageViewController = require('PageViewController')
var SCROLL_TOP_TYPE = require('modules/spa/_TypeScrollTop')

var toast = Toast.getToast()

var params
var orderType
var isRedeem, isToComment

// 这个 ViewController 表示了订单的三个页面，其实这样不太好
var OrderList = inherit({
	name: 'OrderList',
	base: PageViewController,
	proto: {
		onCreate: function () {
			var me = this
			me.__base()
			me._scrollTopByType = {}
		},
		onShow: function(){
			var me = this
			me.__base()

			params = route.getPathParam(route.R.ORDER_LIST)
			orderType = params.type
			isRedeem = orderType === route.ORDER_TYPE_REDEEM
			isToComment = orderType === route.ORDER_TYPE_TO_COMMENT

			nav.btnLeft.setText('返回').actionBack()
			// 待领用
			if(isRedeem){
				nav.btnCenter.setText('待领用')
				nav.btnRight.setText('已领用').setHref(route.getRoute(route.R.ORDER_LIST, {
					type: route.ORDER_TYPE_TO_COMMENT
				}))
			}
			// 已领用
			else{
				tabManager.getTab(isToComment ? 0 : 1).update({active: true})
				nav.btnCenter.beTabContainer(tabManager).setTitle(isToComment ? '待评论订单' : '已完成订单')

			}

			me.orderType = orderType
			me.isRedeem = isRedeem

			me.scrollTop = me._scrollTopByType[me.orderType]

			var customVarValue = orderType === route.ORDER_TYPE_REDEEM ? du.CustomValue.PAGE_ORDER_LIST_REDEEM :
					orderType === route.ORDER_TYPE_TO_COMMENT ? du.CustomValue.PAGE_ORDER_LIST_TO_COMMENT :
							orderType === route.ORDER_TYPE_DONE ? du.CustomValue.PAGE_ORDER_LIST_DONE :
									''
			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, customVarValue, du.CustomScope.PAGE)
		},
		onShouldUpdate: function(){
			var me = this

			loading.show()
			me.xhr = ajax.getJSON(ajax.API_ORDER, {
				type: me.orderType
			}, success, error, {
				useCache: true,
				cacheType: ajaxCache.TYPE_STILL_LOAD,
				cacheKey: [ajaxCache.ORDER_LIST, me.orderType],
				complete: function(){
					loading.hide()
				}
			})

			function success(data, status, xhr, code, args){
				var html = tplFn({
					// 数据是否再次分类了，比如分为：往下拍 和 倒计时 的订单
					hasCategory: me.isRedeem,
					isRedeem: me.isRedeem,
					Status: Status,
					Type: Type,
					data: data.data,
					route: route,
					orderType: orderType
				})

				//console.log('order type: '+ me.orderType + ', execute time: ' + args.execute_time)

				me.node = $(html)
				me.onDomReady(args.execute_time)
			}
			function error(xhr, errorType, error, code, message){

				//console.log('error order type: ', me.orderType)

				if(errorType !== 'abort'){
					toast.show(message || '网络错误，请重试')
				}

				if(code == 401){

				}
			}
			return me
		},
		onHide: function () {
			var me = this
			me.__base()

			me._scrollTopByType[me.orderType] = me.scrollTop
		}
	},
	statics: {
		scrollTopType: SCROLL_TOP_TYPE.LAST_TIME,
		NAME: route.N.ORDER_LIST
	}
})