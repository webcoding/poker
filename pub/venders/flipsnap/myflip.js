var Flipsnap = require('./flipsnap')
var _ = require('_')

var flips = []

$(window).on('resize', _.throttle(function(){
	var winWidth = $(window).width()
	_.each(flips, function(flip){
		flip.onWinResize(winWidth)
	})
}, 40))

function MyFlip(el, options){
	options = $.extend({
		width100: true
	}, options)
	var flip = Flipsnap(el, options)
	flips.push(flip)

	flip.options = options
	flip.node = $(flip.element)
	flip.nodeItems = $('.item', flip.node)
	flip.count = flip.nodeItems.length

	flip.onWinResize = onWinResize

	return flip
}

function onWinResize(winWidth){
	winWidth = winWidth || $(window).width()

	var flip = this
	// 需要 100% 宽度的
	if(flip.options.width100){
		flip.node.width(winWidth * flip.count)
		flip.nodeItems.width(winWidth)
		flip.refresh()
	}
}

module.exports = MyFlip