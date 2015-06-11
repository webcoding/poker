var route = require('route')
var common = require('common')
var nav = require('nav')
var tplFn = require('templates/exception/error.content.html')
var inherit = require('inherit')

var PageError = inherit({
	name:'PageError',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('错误页')
			nav.btnLeft.setText('返回').actionBack()

			this.node = $(tplFn())
			this.onDomReady()
		}
	},
	statics: {
		NAME: route.N.ERROR
	}
})