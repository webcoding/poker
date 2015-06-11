var inherit = require('inherit')
var nunjucksFilter = require('nunjucksFilter')
var Countdown = require('pages/item/detail/_Countdown')
var tplFnDownTip = require('templates/item/_downtip.html')

var Count = inherit({
	name: 'Count',
	proto: {
		/**
		 *
		 * @param options {
		 *      data,
		 *      node,
		 *      sc_diff_milli
		 *  }
		 */
		__constructor: function(options){
			var me = this
			$.extend(me, options)

			me.dragStarted = false

			me.nodePrice = $('.price-start', me.node)
			me.nodeRealTime = $('.real-time', me.node)
			//me.nodeEnd = $('.end', me.node)
			//me.nodeEndTime = $('.end-time', me.node)
			me.nodeRange = $('.range', me.node)
			me.nodeDowntip = $('.down-tip', me.node)

			me.countdown = new Countdown({
				data: me.data,
				onTick: $.proxy(me.onTick, me),
				sc_diff_milli: me.sc_diff_milli
			})

			me.onTick()

			me.countdown.on(Countdown.STATUS_CHANGE, $.proxy(me.onStatusChange, me))

			me.nodeRange.on('input', $.proxy(me.onInput, me))
			me.nodeRange.on('change', $.proxy(me.onChange, me))
		},
		updatePrice: function(currPrice){
			var me = this
			var count = me.countdown.status == Countdown.Status.STARTED ? 4 : 2
			currPrice = currPrice || me.countdown.currPrice()
			me.nodePrice.html(nunjucksFilter.rmb(nunjucksFilter.formatPrice(currPrice, count)))
			return me
		},
		updateRange: function(currPercent){
			var me = this
			currPercent = currPercent || me.countdown.currPercent()
			me.nodeRange.val(currPercent)
			return me
		},
		updateRealTime: function(phpTime){
			var me = this
			if(phpTime){
				//phpTime = phpTime || me.data.countdown_end_time
				var time = nunjucksFilter.formatTime(phpTime, 'hh:mm')
				//me.nodeEndTime.text(time)
				me.nodeRealTime.text(time).show()
			}
			else{
				me.nodeRealTime.hide()
			}

			return me
		},
		onTick: function(currPrice){
			var me = this
			if(!me.dragStarted){
				me.updatePrice().updateRange()
			}
		},
		// 拖拽
		onInput: function(){
			var me = this
			var countdown = me.countdown
			var data = me.data

			me.dragStarted = true

			var start = +countdown.start
			var end = +countdown.end

			var percent = parseFloat(me.nodeRange.val())
			var phpTime = Math.round(((end - start) * percent + start) / 1000)
			var price = data.start_price - (data.start_price - data.floor_price) * percent

			me.updatePrice(price).updateRealTime(phpTime)
		},
		// 拖拽结束
		onChange: function(){
			var me = this

			me.dragStarted = false
			// 恢复原位
			me.updatePrice().updateRange().updateRealTime()
		},
		onStatusChange: function(serverNowSec){
			var me = this
			var text = tplFnDownTip({
				serverNowSec: serverNowSec,
				item: me.data
			})
			me.nodeDowntip.html(text)
		}
	}
})
var CountdownManager = inherit({
	name: 'CountdownManager',
	proto: {
		/**
		 *
		 * @param options { data, nodeWrap, sc_diff_milli }
		 * @private
		 */
		__constructor: function(options){
			var me = this

			$.extend(me, options)

			me.nodeItems = $('.item', me.nodeWrap)

			me.counts = []

			me.data.forEach(function(itemData, i){
				var count = new Count({
					data: itemData,
					node: me.nodeItems.eq(i),
					sc_diff_milli: me.sc_diff_milli
				})

				me.counts.push(count)
			})
		},
		clear: function(){
			var me = this
			me.counts.forEach(function(count){
				count.countdown.clear()
			})
			return this
		}
	}
})

module.exports = CountdownManager