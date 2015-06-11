var inherit = require('inherit')
//var Swiper = require--('venders/swiper/swiper')
var Flipsnap = require('venders/flipsnap/myflip')
var tplFn = require('./picswiper.html')

var PicSwiper = inherit({
	name: 'PicSwiper',
	proto: {
		__constructor: function(options){
			var me = this

			$.extend(me, options)

			me.count = options.images.length

			this.isShown = true

			var html = tplFn({
				currentIndex: me.currentIndex,
				images: me.images
			})
			me.node = $(html).appendTo('body')

			me.nodeItems = $('.item', me.node)
			me.nodeWrap = $('.flipsnap', me.node)

			me.flipsnap = Flipsnap($('.flipsnap', me.node)[0])
			me.nodeFlipsnap = $(me.flipsnap.element)

			me.nodeFlipsnap.on('fspointmove', $.proxy(me.onFlipsnapMoved, me))
			me.node.on('click', $.proxy(me.onClick, me))

			me.update()
		},
		moveTo: function(index){
			var me = this
			me.flipsnap.moveToPoint(index)
			return me
		},
		update: function(){
			var me = this
			var winWidth = $(window).width()
			me.widthPerItem = winWidth
			var widthTotal = me.widthPerItem * me.count

			var widthChanged = false
			if(widthTotal != me.widthTotal){
				me.widthTotal = widthTotal
				widthChanged = true
			}

			me.nodeItems.width(me.widthPerItem)
			me.nodeWrap.width(me.widthTotal)

			if(widthChanged){
				me.flipsnap.refresh()
			}

			return me
		},
		show: function(){
			var me = this
			if(!me.isShown){
				me.node.show()
				me.isShown = true
			}
			return me
		},
		hide: function(){
			var me = this
			if(me.isShown){
				me.node.hide()
				me.isShown = false
			}
			return me
		},
		onFlipsnapMoved: function(e){
			var me = this
			$('span', me.node).html(me.flipsnap.currentPoint + 1)
		},
		onClick: function(e){
			var me = this
			me.hide()
		},
		onSwiperTap: function(swiper, evt){
			var me = this
			me.hide()
		}
	}
})

module.exports = PicSwiper