var inherit = require('inherit')
var _ = require('_')

var FixMainInfo = inherit({
	name: 'FixMainInfo',
	proto: {
		/**
		 *
		 * @param options
		 * {
		 *  nodeWrap {Node}
		 * }
		 * @private
		 */
		__constructor: function(options){
			this.nodeWrap = options.nodeWrap
			this.throttleWait = 50
			this.isFixed = false
			this.nodeImagesDefaultMarginBottom = 0

			this.nodeImages = $('.imgs', this.nodeWrap)
			this.nodeMainInfo = $('.main-info-wrap', this.nodeWrap)
			this.imgsHeight = this.nodeImages.height()
			this.mainInfoHeight = this.nodeMainInfo.height()

			this.onWindowScroll = $.proxy(_.throttle(this._onWindowScroll, this.throttleWait), this)
			this.bindEvent()
		},
		unbindEvent: function(){
			window.removeEventListener('scroll', this.onWindowScroll)
		},
		bindEvent: function(){
			window.addEventListener('scroll', this.onWindowScroll)
		},
		fix: function(fix){
			if(fix == this.isFixed) return
			if(fix){
				this.nodeWrap.addClass('fix-main-info')
				this.nodeImages.css('margin-bottom', this.mainInfoHeight + 'px')
			}
			else{
				this.nodeWrap.removeClass('fix-main-info')
				this.nodeImages.css('margin-bottom', this.nodeImagesDefaultMarginBottom + 'px')
			}
			this.isFixed = fix
		},
		destroy: function(){
			var me = this

			this.unbindEvent()
			var names = ['nodeWrap', 'nodeImages', 'nodeMainInfo', 'onWindowScroll']
			names.forEach(function(name){
				me[name].remove && me[name].remove()
				delete me[name]
			})
		},
		_onWindowScroll: function(){
			var scroll = document.body.scrollTop
			this.fix(scroll >= this.imgsHeight)
		}
	}
})

module.exports = FixMainInfo