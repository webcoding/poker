var inherit = require('inherit')
var inheritUtil = require('venders/inherit/util')
var _ = require('_')
var EventEmitter = require('emitter')
var tplFn = require('./modal.html')
//var Action = require--('modules/action/action')

var tplWrap = tplFn({
	needSection: 'wrap'
})

var Modal = inherit({
	name: 'Modal',
	proto: inheritUtil.delegatePropertyMethod({
		__constructor: function(){
			var me = this

			me.isHide = true

			me.node = $(tplWrap)
			me.nodeTitle = $('h2', me.node)
			me.nodeContent = $('.modal p', me.node)
			me.nodeButtonWrap = $('.buttons', me.node)

			$('body').append(me.node)

			me.nodeButtonWrap.on('click', '.button', _.bind(me.onButtonClick, me))
		},
		show: function(){
			var me = this
			if(me.isHide) {
				me.isHide = false
				me.node.show()
			}
			return this
		},
		hide: function(){
			var me = this
			if(!me.isHide) {
				me.isHide = true
				me.node.hide()
			}
			return this
		},
		setTitle: function(title){
			var me = this
			me.nodeTitle.html(title)
			return this
		},
		setContent: function(text){
			var me = this
			me.nodeContent.html(text)
			return this
		},
		removeButtons: function(){
			this.nodeButtonWrap.html()
			delete this.buttons

			return this
		},
		addButtons: function(buttons){
			var me = this

			me.buttons = buttons

			var html = tplFn({
				needSection: 'buttons',
				buttons: buttons
			})
			me.nodeButtonWrap.html(html)

			return this
		},
		destroy: function (e) {
			var me = this
			me.nodeButtonWrap.off('click')
			me.node.remove()
		},
		onButtonClick: function(e){
			var me = this

			e.node = $(e.currentTarget)
			e.index = e.node.data('index')

			var button = me.buttons[e.index]
			button.onClick && button.onClick.call(me, e)
			me.emit('click', e)

			if(!e.isDefaultPrevented()) me.hide()
		}
	},[
//		['node', ['hide', 'show'], true]
	])
})
EventEmitter.mixTo(Modal)

module.exports = Modal