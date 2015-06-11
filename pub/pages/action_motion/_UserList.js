var inherit = require('inherit')

var UserList = inherit({
	name: 'UserList',
	proto: {
		/**
		 * @param dom
		 */
		__constructor: function(options){
			var me = this
			if(options.dom){
				me.dom = options.dom
				me.domUl = me.dom.getElementsByTagName('ul').item(0)
				me.ulHeight = me.domUl.offsetHeight
				me.scrollTop = 0
				me.timeout = 20 // 100ms 走一次
				me.gap = 0.5 // 一次走 1px

				me.dom.scrollTop = 1
				me.canScroll = me.dom.scrollTop === 1
				me.dom.scrollTop = me.scrollTop

				if(me.canScroll){
					me.start()
				}
			}
		},
		start: function(){
			var me = this
			me._id = setTimeout(onTimeout, me.timeout)

			function onTimeout(){
				me.scrollTop = me.dom.scrollTop = me.scrollTop + me.gap

				// 已经滚动到底啦
				if(Math.floor(me.scrollTop) !== me.dom.scrollTop){
					me.domUlClone = me.domUl.cloneNode(true)
					me.dom.appendChild(me.domUlClone)
					// 重新滚动
					me.dom.scrollTop = me.scrollTop
				}
				// 正好滚动了一整个的高度
				else if(me.scrollTop >= me.ulHeight){
					me.scrollTop = me.dom.scrollTop = 0
					me.domUlClone.remove()
				}

				me._id = setTimeout(onTimeout, me.timeout)
			}
		},
		stop: function(){
			clearTimeout(this._id)
		},
		destroy: function(){
			this.stop()
		}
	}
})

module.exports = UserList