// API 可以参考：http://www.idangero.us/framework7/docs/action-sheet.html#.VG7k_JOUdis

var inherit = require('inherit')
//var Hammer = require--('hammer')
var _ = require('_')
var EventEmitter = require('emitter')
var tplFn = require('./actionsheet.html')

//var tplWrap = tplFn({
//	needSection: 'wrap'
//})
//var tplGroup = tplFn({
//	needSection: 'group'
//})

var ActionSheet = inherit({
	name: 'ActionSheet',
	proto: {
		__constructor: function(buttons){
			var me = this

			if($.isArray(buttons)){
				if(!$.isArray(buttons[0])) buttons = [buttons]
			}
			else{
				buttons = [[buttons]]
			}

			me.buttons = buttons

			var html = tplFn({
				buttons: buttons
			})

			me.node = $(html)
			me.nodeContent = $('.content', me.node)
			me.nodeMask = $('.mask', me.node)
			me.nodeButtons = $('.item', me.node)

			$('body').append(me.node)

			me.nodeContent.on('click', _.bind(me.onContentClick, me))
			me.nodeMask.on('click', _.bind(me.onMaskClick, me))

//			// 元素的事件类型（click、tap）需要跟下面元素事件的类型一致
//			// 如果 actionsheet 是 tap，而下面是 click，就会导致，这里 tap，已经隐藏蒙层了，
//			// 而蒙层后面的元素接受的是 click 事件，300ms 后下面的元素会再次接受 click 事件，触发 handler 的操作
//			var htMask = new Hammer(me.nodeMask[0])
//			var htContent = new Hammer(me.nodeContent[0])
//			htMask.on('tap', _.bind(me.onMaskClick, me))
//			htContent.on('tap', _.bind(me.onContentClick, me))
		},
		show: function(){
			this.node.show()
			return this
		},
		hide: function(){
			this.node.hide()
			return this
		},
		onContentClick: function(e){
			var me = this
			var node = $(e.target)
			if(!node.hasClass('item')) node = node.parents('.item')

			var groupIndex = node.data('index0')
			var buttonIndex = node.data('index1')
			var button = this.buttons[groupIndex][buttonIndex]
			if(button && !button.label){
				e.node = node
				e.groupIndex = groupIndex
				e.buttonIndex = buttonIndex

				button.onClick && button.onClick.call(this, e)
				me.emit('click', e)
			}
		},
		onMaskClick: function(e){
			e.mask = true
			me.emit('click', e)

			this.hide()
		}
	}
})
EventEmitter.mixTo(ActionSheet)

//var actionsheet = new ActionSheet()
//
//module.exports = actionsheet
module.exports = ActionSheet