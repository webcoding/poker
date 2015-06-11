var inherit = require('inherit')
var Emitter = require('emitter')

var Status = {
	NOT_START: 1,     // 未开始
	STARTED: 2,       // 已开始
	//END: 3
	COUNTDOWN_END: 3, // 倒计时结束
	BUY_END: 4,       // 购买结束
	REDEEM_END: 5     // 兑换结束
}

var Event = {
	STATUS_CHANGE               : 0,
	STATUS_CHANGE_STARTED       : Status.STARTED,
	STATUS_CHANGE_COUNTDOWN_END : Status.COUNTDOWN_END,
	STATUS_CHANGE_BUY_END       : Status.BUY_END,
	STATUS_CHANGE_REDEEM_END    : Status.REDEEM_END
}

var Countdown = inherit({
	name: 'Countdown',
	proto: {
		/**
		 *
		 * @param params: {
		 *      data          => json,
		 *      sc_diff_milli => server & client 的时间差
		 * }
		 */
		__constructor: function(params){
			var me = this
			$.extend(me, params, {
				// 1秒钟刷新一次价格
				interval: 1000
			})

			var data = me.data

			me._currentPrice = data.start_price

			me.countdownStart = new Date(data.countdown_start_time * 1000)
			me.countdownEnd = new Date(data.countdown_end_time * 1000)
			me.buyEnd = new Date(data.countdown_buy_end_time * 1000)
			me.redeemEnd = new Date(data.countdown_redeem_end_time * 1000)
			me.updateStatus()

			var diffPrice = data.start_price - data.floor_price
			var diffSecond = data.countdown_end_time - data.countdown_start_time
			me.diffSecond = diffSecond
			me.priceDiffPerSecond = diffPrice / diffSecond

			if(me.status === Status.NOT_START){
				var serverNow = Date.now() + me.sc_diff_milli
				var interval = data.countdown_start_time * 1000 - serverNow
				me.timeoutId = setTimeout(function(){
					me.startCountdown()
				}, interval)
			}
			else if(me.status >= Status.STARTED && me.status < Status.REDEEM_END) {
				me.startCountdown()
			}
		},
		getServerNow: function(){
			var me = this
			return Date.now() + me.sc_diff_milli
		},
		updateStatus: function(){
			var me = this
			var serverNow = me.getServerNow()
			var prevStatus = me.status
			me.status =  serverNow < +me.countdownStart ? Status.NOT_START :
								serverNow < +me.countdownEnd   ? Status.STARTED :
								serverNow < me.buyEnd          ? Status.COUNTDOWN_END :
								serverNow < me.redeemEnd       ? Status.BUY_END:
										                         Status.REDEEM_END;

			if(prevStatus !== undefined && prevStatus !== me.status){
				var EventName = Event.STATUS_CHANGE//me.status
				var serverNowSec = serverNow / 1000
				me.emit(EventName, serverNowSec)
			}

			return me.status
		},
		startCountdown: function(){
			var me = this

			if(me._countdownStarted) return
			me._countdownStarted = true

			me.timeoutId = setTimeout(onTimeout, me.interval)

			function onTimeout(){
				me.updateStatus()

				var currPrice = me.currPrice()
				me.onTick && me.onTick(currPrice)

				if(me.status < Status.BUY_END){
					me.timeoutId = setTimeout(onTimeout, me.interval)
				}
			}
		},
		currPercent:function(){
			var me = this
			if(me.status === Status.NOT_START){
				return 0
			}
			else if (me.status === Status.STARTED){
				var startedMilliseconds = me.getServerNow() - me.countdownStart
				return startedMilliseconds / (me.diffSecond * 1000)
			}
			else if(me.status >= Status.COUNTDOWN_END){
				return 1
			}
		},
		currPrice: function(){
			var me = this
			if(me.status === Status.NOT_START){
				return me._currentPrice = me.data.start_price
			}
			else if (me.status === Status.STARTED){
				var startedSeconds = (me.getServerNow() - me.countdownStart) / 1000
				return me._currentPrice = me.data.start_price - startedSeconds * me.priceDiffPerSecond
			}
			else if(me.status >= Status.COUNTDOWN_END){
				return me._currentPrice = me.data.floor_price
			}
		},
		getCurrentPrice: function(){
			var me = this
			return me._currentPrice
		},
		clear: function(){
			var me = this
			clearTimeout(me.timeoutId)
			return me
		}
	},
	statics: {
		Status: Status
	}
})
Emitter.mixTo(Countdown)
$.extend(Countdown, Event)

module.exports = Countdown