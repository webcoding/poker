// 这个页面只能从 “商品详情”->“立即购买” 来进入

var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var nav = require('nav')
var navUtil = require('navUtil')
var ajax = require('ajax')
var Toast = require('toast')
var tplFn = require('templates/order/pay.content.html')
var storage = require('storage')
var inherit = require('inherit')
var ActionSheet = require('widgets/overlay/actionsheet')
var Modal = require('widgets/overlay/modal')
var history = require('modules/nav/history')
var CountDown = require('./Countdown')
var Payment = require('./Payment')
var du = require('baiduTongji')
var url = require('url')
var detect = require('modules/common/detect')

var toast = Toast.getToast()
var params
var itemId
var orderId
var orderPay
var orderCreateTimestamp
var orderData
var urlItemDetail
var qs

var reg = {
	PASSWORD: /.{4,}/
}
var errMsg = {
	PASSWORD_FORMAT: '密码错啦~',
	OTHER: '付款失败，请重试...'
}

var payType = {
	// 余额全额支付
	BALANCE: 'balance',
	// 支付宝网页支付
	ALIPAYWAP: 'alipaywap',
	// 混合支付
	MIX: 'mix'
}

var actionLeave = new ActionSheet([{
	text: '表走！你真的不要我了吗～',
	label: true
},{
	text: '狠心抛弃'
	// 这个 onClick 是放在 nav.onbeforeaction 的处理函数中了
	, onClick: function(){
		actionLeave.hide()
	}
},{
	text: '决定留下',
	onClick: function(){
		actionLeave.hide()
	}
}])

var alertModal = new Modal().setTitle('订单已超时').addButtons([{
	text: '知道了'
	// 这个 onClick 是放在 CountDown.onTimeout 的处理函数中了
	// , onClick: function(e){}
}])

var OrderPay = inherit({
	name: 'OrderPay',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_ORDER_PAY, du.CustomScope.PAGE)

			orderPay = this

			qs = url.parseSearch()
			params = route.getPathParam(route.R.ORDER_PAY)

			itemId = params.item_id
			orderId = params.order_id

			orderCreateTimestamp = storage.get(storage.ORDER_CREATED_TS)
			orderData = storage.get(storage.ORDER_CREATED)

			urlItemDetail = route.getRoute(route.R.ITEM_DETAIL, {item_id: itemId})

			// 这个页面不要存在历史记录中
			history.ignoreCurrentPage()

			if(!orderData || orderData.id != orderId){
				toast.once('hide', function(){
					navUtil.back(urlItemDetail)
				})
				toast.show('订单不存在')
				return
			}

			nav.btnCenter.setText('订单支付')
			nav.btnLeft.setText('取消').actionBack(urlItemDetail)
			nav.btnLeft.addListener('onbeforeaction', onBtnLeftBeforeAction)

			this.orderId = orderId
			this.orderData = orderData
			this.orderCreateTimestamp = orderCreateTimestamp

			this.isSummaryOpen = false
			// 把创建订单的步骤提取到上一个页面了
			this.onOrderCreated()
		},
		onHide: function(){
			this.__base()
			nav.btnLeft.removeListener('onbeforeaction', onBtnLeftBeforeAction)
		},
		deleteOrder: function(cb, errCb){
			var me = this
			toast.show('正在取消订单...',{
				notAutoHide: true
			})
			ajax.ajax({
				url: ajax.API_ORDER_DELETE,
				type: 'DELETE',
				data: {
					order_id: me.orderData.id
				},
				success: function(data){
					toast.hide()
					cb(data)
				},
				error: function(xhr, errorType, error, code, message){
					toast.show(message || '订单删除失败，请重试...')
					errCb && errCb(xhr, errorType, error, code, message)
				}
			})
		},
		bindEvent: function(){
			var me = this
			me.__base()
			me.nodeBtnDetail.on('click', me.onBtnDetailClick)
			me.nodeFormPay.on('submit', me.onFormSubmit)
			me.payment.bindEvent()
		},
		unbindEvent: function(){
			var me = this
			me.__base()
			me.nodeBtnDetail.off('click', me.onBtnDetailClick)
			me.nodeFormPay.off('submit', me.onFormSubmit)
			me.payment.unbindEvent()
		},
		onDestroy: function(){
			this.__base()
			this.countdown.stop()
		},
		onOrderCreated: function(){
			var me = this

			me.orderLifeTotalSeconds = me.orderData.expire_date - me.orderData.start_date
			me.orderLifeTotalMinutes = me.orderLifeTotalSeconds / 60
			me.orderLifeTotalMilliSeconds = me.orderLifeTotalSeconds * 1000

			var html = tplFn({
				order: me.orderData,
				route: route,
				orderLifeTotalMinutes: me.orderLifeTotalMinutes,
				isCountdown: me.orderData.type === 3
			})

			me.node = $(html)

			me.nodeBtnDetail = $('.btn-detail', me.node)
			me.nodeSummary = $('.summary', me.node)
			me.nodeFormPay = $('#order-pay-form', me.node)

			me.onCountdownTimeover = $.proxy(me._onCountdownTimeover, me)
			me.onBtnDetailClick = $.proxy(me._onBtnDetailClick, me)
			me.onFormSubmit = $.proxy(me._onFormSubmit, me)

			me.payment = new Payment({
				nodeWrap: me.node,
				orderData: me.orderData
			})
			me.countdown = new CountDown({
				node: $('.time-tip span', me.node),
				start: me.orderCreateTimestamp,
				// 毫秒
				total: me.orderLifeTotalMilliSeconds,
				onCountdownTimeover: me.onCountdownTimeover
			})

			me.onDomReady()
		},
		_onCountdownTimeover: function(){
			var me = this
			alertModal.once('click', function(e){
				// 当点击【知道了】按钮
				if(e.index == 0){
					e.preventDefault()

					// 无论删除成功还是失败，都要把蒙层隐藏掉
					alertModal.hide()

					me.deleteOrder(function(){
						navUtil.back(urlItemDetail)
					}, function(){
						// 即使删除订单失败，也需要后退出去
						navUtil.back(urlItemDetail)
					})
				}
			})
			alertModal.show()
			du.trackEvent(du.EventCategory.ORDER, du.EventAction.ORDER_CANCEL, du.EventLabel.ORDER_CANCEL_TIMEOUT)
		},
		_onBtnDetailClick: function(e){
			var me = this
			if(me.isSummaryOpen){
				me.nodeSummary.removeClass('open')
			}
			else{
				me.nodeSummary.addClass('open')
			}
			me.isSummaryOpen = !me.isSummaryOpen
		},
		_onFormSubmit: function(e){
			e.preventDefault()

			var me = this
			var payment = me.payment

			// 微信把支付宝给屏蔽了
			if(detect.micromessenger && payment.payAlipayWeb > 0){
				var title = '支付宝被微信屏蔽啦...<br>换个支付方式或浏览器吧~~'
				var modal = new Modal().setTitle(title).addButtons([{
					text: '√ 新技能get'
				}])
				modal.once('click', function (e) {
					modal.destroy()
					modal = null
				})
				modal.show()
			}
			else{
				var total = me.orderData.price
				var _payType = payment.payBalance == total ? payType.BALANCE
							: payment.payAlipayWeb == total ? payType.ALIPAYWAP
						: payType.MIX

				// 支付金额不能传 “0”，直接不传
				ajax.postJSON(ajax.API_PAYMENT, {
					order_id: me.orderData.id,
					balance: payment.payBalance || '',
					alipaywap: payment.payAlipayWeb || '',
					alipay: '',
					wechat: '',
					//password: password,
					total: total,

					// openid 和 operid 是wifi万能钥匙需要的
					openid: qs.openid,
					operid: qs.operid
				}, function(data){
					// 余额全额支付
					if(_payType == payType.BALANCE){
						var urlOrderDetail = route.getRoute(route.R.ORDER_DETAIL, {
							// 待领用
							type: route.ORDER_TYPE_REDEEM,
							order_id: me.orderId
						})
						navUtil.replace(urlOrderDetail)
					}
					// 支付宝网页支付 或 混合支付
					else if(_payType == payType.ALIPAYWAP || _payType == payType.MIX){
						navUtil.location(data.data.alipaywap)
					}
				}, function(xhr, errType, err, code, message){
					toast.show(message || errMsg.OTHER)
				})
			}
		}
	},
	statics: {
		NAME: route.N.ORDER_PAY
	}
})

function onBtnLeftBeforeAction(e){
	e.async()
	actionLeave.once('click', function(evt){
		var trackEventLabel
		// 点击了【残忍抛弃】按钮
		if(evt.buttonIndex == 1){
			trackEventLabel = du.EventLabel.ORDER_CANCEL_YES

			orderPay.deleteOrder(function(){
				e.next()
			}, function(xhr, errType, err, code, message){
				// 即使删除订单失败，也需要后退出去
				e.next()
			})
		}
		else if(evt.buttonIndex == 2){
			trackEventLabel = du.EventLabel.ORDER_CANCEL_NO_BUTTON
		}
		else if(evt.mask){
			trackEventLabel = du.EventLabel.ORDER_CANCEL_NO_MASK
		}
		du.trackEvent(du.EventCategory.ORDER, du.EventAction.ORDER_CANCEL, trackEventLabel)
	})
	actionLeave.show()
}