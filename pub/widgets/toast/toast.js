var inherit = require('inherit')
var Popup = require('../popup/popup')
var toastTpl = require('./toast.html')
var EventEmitter = require('emitter')

var toast
var Toast = inherit({
	name: 'Toast',
	base: Popup,
	proto: {
		__constructor: function(options){
			this.__base(options)

			this._title = ''
			this.html = toastTpl()
			this.node = $(this.html).hide().appendTo(document.body)
			this.nodeContent = $('.content', this.node)
		},
		title: function(title){
			if(title){
				this.nodeContent.html(this._title = title)
			}
			else return this._title
		},
		show: function(title, params){
			var me = this

			if(typeof title == 'string') this.title(title)
			else params = title
			params = params || {}

			if(params.bgSolid) me.bgSolid()
			me.node.show()

			if(!params.notAutoHide){
				setTimeout(function(){
					me.hide()
				}, params.ms || 2000)
			}

			return this
		},
		hide: function(){
			var me = this
			me.node.fadeOut()
			me.bgRestore()
			this.emit('hide')
			return this
		}
	}
})
EventEmitter.mixTo(Toast)

toast = new Toast

module.exports = {
	// 尽量不要 new 太多 toast，直接使用唯一的实例
	getToast: function(getNewOne){
		return getNewOne ? (new Toast) : toast
	}
}