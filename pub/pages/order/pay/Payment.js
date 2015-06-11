var inherit = require('inherit')
var commonUtil = require('commonUtil')

var Payment = inherit({
	name: 'Payment',
	proto: {
		__constructor: function(options){
			var me = this
			me.orderData = options.orderData
			me.nodeWrap = options.nodeWrap

			me.nodeInputBalance = $('[name=account-balance]', me.nodeWrap)
			me.nodeBalancePass = $('.password', me.nodeWrap)
			me.nodeBtnForgot = $('.link-forgot', me.nodeWrap)
			me.nodeBalanceMoney = $('.balance-wrap .money', me.nodeWrap)

			me.nodeInputAlipay = $('[name=alipay-web]', me.nodeWrap)
			me.nodeAlipayMoney = $('.alipay-wrap .money', me.nodeWrap)

			me.payBalance = 0
			me.payAlipayWeb = me.orderData.price

			//
			me.onInputBalanceChange = $.proxy(me._onInputBalanceChange, me)
		},
		bindEvent: function(){
			this.nodeInputBalance.on('change', this.onInputBalanceChange)
		},
		unbindEvent: function(){
			this.nodeInputBalance.off('change', this.onInputBalanceChange)
		},
//		password: function(){
//			var me = this
//			return $('input', me.nodeBalancePass).val()
//		},
		useBalance: function(useBalance){
			var me = this
			var orderData = me.orderData

			// TODO 余额为 0 的情况
			if(useBalance){
				// 余额足够
				if(orderData.account_balance >= orderData.price){
					me.payBalance = orderData.price
					me.payAlipayWeb = 0
				}
				// 余额不足
				else{
					me.payBalance = orderData.account_balance
					me.payAlipayWeb = orderData.price - orderData.account_balance
				}

				//me.nodeBalancePass.show()
			}
			else{
				me.payBalance = 0
				me.payAlipayWeb = me.orderData.price

				//me.nodeBalancePass.hide()
			}

			me.nodeBalanceMoney.html(commonUtil.rmb(commonUtil.formatPrice(me.payBalance)))
			me.nodeAlipayMoney.html(commonUtil.rmb(commonUtil.formatPrice(me.payAlipayWeb)))

			// 使用余额全额支付
			if(me.payBalance == orderData.price){
				me.nodeInputAlipay.attr('checked', null).attr('disabled', 'disabled')
			}
			else{
				me.nodeInputAlipay.attr('checked', '').attr('disabled', null)
			}
		},
		_onInputBalanceChange: function(e){
			var me = this
			me.useBalance(me.nodeInputBalance.attr('checked'))
		}
	}
})

module.exports = Payment