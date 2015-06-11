// 点击后，弹出popove可操作的navbar
var inherit = require('inherit')
var nav = require('./nav')
//var Hammer = require--('hammer')
var Popover = require('widgets/popover/big')


var PopNav = inherit({
	name: 'PopNav',
	proto: {
		__constructor: function(options){
			this.options = options
			this.nav = options.nav
			this.popover = new Popover
			this.popover.node.appendTo(document.body)
			this.listeners = {left:[],center:[],right:[]}
		},
		addListener: function(listeners){
			for(var key in listeners){
				this.listeners[key].push(listeners[key])
			}

			if(this.isListenerAdded) return
			this.isListenerAdded = true
			this.nav.btnLeft.addListener('ontap', $.proxy(this.onLeftClick, this))
			this.nav.btnRight.addListener('ontap', $.proxy(this.onRightClick, this))
			this.nav.btnCenter.addListener('ontap', $.proxy(this.onCenterClick, this))
		},
		enable: function(){
			this.disabled = false
		},
		disable: function(){
			this.disabled = true
		},
		onLeftClick: function(e){
			if(this.disabled) return
			excuteListeners(this.listeners.left, e)
		},
		onRightClick: function(e){
			if(this.disabled) return
			excuteListeners(this.listeners.right, e)
		},
		onCenterClick: function(e){
			if(this.disabled) return
			excuteListeners(this.listeners.center, e)
		}
	}
})

function excuteListeners(listeners, e, context){
	context = context || null
	listeners.forEach(function(listener){
		listener.call(context, e)
	})
}

var popNav = new PopNav({
	nav: nav
})

module.exports = popNav