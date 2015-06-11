var inherit = require('inherit')
var commonUtil = require('commonUtil')

var CountDown = inherit({
	name: 'CountDown',
	proto: {
		__constructor: function(options){
			$.extend(this, options)
			this.onTimeout()
		},
		stop: function(){
			this.isStoped = true
			clearTimeout(this.timeoutId)
		},
		onTimeout: function(){
			var me = this
			if(me.isStoped) return

			var minute, second
			// 还剩 N 秒
			var left = parseInt((me.total - (Date.now() - me.start)) / 1000)
			if(left > 0){
				minute = Math.floor(left / 60)
				second = left % 60

				me.timeoutId = setTimeout($.proxy(me.onTimeout, me), 1000)
			}
			else{
				me.onCountdownTimeover()

				minute = second = 0
			}
			var str = commonUtil.tpl('{{minute}}分{{second}}秒', {
				minute: commonUtil.pad(minute),
				second: commonUtil.pad(second)
			})
			me.node.text(str)
		}
	}
})

module.exports = CountDown