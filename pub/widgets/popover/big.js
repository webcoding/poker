var inherit = require('inherit')
var inheritUtil = require('venders/inherit/util')
var _ = require('_')
//var Hammer = require--('hammer')
var tplFn = require('./big.html')

var PopoverBig = inherit({
	name: 'PopoverBig',
	proto: inheritUtil.delegatePropertyMethod({
		__constructor: function(options){
			this.node = $(tplFn())
			this.nodeArrow = $('.arrow', this.node)
			this.nodeArrowInner = $('.arrow b', this.node)
			this.nodeContent = $('.content', this.node)
			this.nodeBtnClose = $('.btn-close', this.node)

			this._onArrowClick = _.bind(this.onArrowClick, this)
			this._onBtnCloseClick = _.bind(this.onBtnCloseClick, this)

//			var hammerArrow = new Hammer(this.nodeArrow[0])
//			var hammerBtnClose = new Hammer(this.nodeBtnClose[0])
//			hammerArrow.on('tap', this._onArrowClick)
//			hammerBtnClose.on('tap', this._onBtnCloseClick)
			this.nodeArrow.on('click', this._onArrowClick)
			this.nodeBtnClose.on('click', this._onBtnCloseClick)

//			this.nodeArrow.on('click', _.bind(this.onArrowClick, this))
//			this.nodeBtnClose.on('click', _.bind(this.onBtnCloseClick, this))
		},
		moveArrow: function(pos){
			this.nodeArrowInner.removeClass('left center right').addClass(pos)
			return this
		},
		onArrowClick: function(e){
			this.node.hide()
		},
		onBtnCloseClick: function(e){
//			var srcEvent = e.srcEvent
//			srcEvent.stopPropagation()
//			srcEvent.stopImmediatePropagation()
//			// 真正有效的是 preventDefault，
//			// 否则，蒙板隐藏之后，后面的 a 标签会被触发 click 跳转了
//			srcEvent.preventDefault()

			this.node.hide()
		}
	},[
		['node', ['show', 'hide'], true]
	])
})

module.exports = PopoverBig