var inherit = require('inherit')

var BtnGetCode = inherit({
	name: 'BtnGetCode',
	proto: {
		__constructor: function(node){
			this.node = node
			this.nodeCount = $('b', node)
			this.maxCount = 60
			this.isVoiceBtn = this.node.data('voice')
		},
		// 开始倒计时
		startCountDown: function(count){
			var me = this

			if(count > me.maxCount || count <= 0) return

			me._disable()

			me._setCount(count || me.maxCount)
			function onTimeout(){
				me._setCount(me.count - 1)
				if(me.count > 0) setTimeout(onTimeout, 1000)
				else me.stopCountDown()
			}
			setTimeout(onTimeout, 1000)
		},
		stopCountDown: function(){
			this._setCount(null)
			this._enable()
		},
		_setCount: function(count){
			if(count === null){
				this.count = undefined
				this.nodeCount.text('')
			}
			else if(count.toString().match(/^\d{1,}$/)){
				this.count = count
				this.nodeCount.text('('+count+')')
			}
			return this
		},
		_disable: function(){
			this.isDisabled = true
			this.node.addClass('disable')
			return this
		},
		_enable: function(){
			this.isDisabled = false
			this.node.removeClass('disable')
		}
	}
})

module.exports = BtnGetCode