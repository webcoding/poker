var route = require('route')
var common = require('common')
var inherit = require('inherit')
var nav = require('nav')

var OtherProtocol = inherit({
	name: 'OtherProtocol',
	base: require('pages/c-item/original-web'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('用户使用协议')
			nav.btnLeft.setText('返回').actionBack()
		}
	},
	statics: {
		stopParentInheritEvent: false,
		NAME: route.N.USER_PROTOCOL
	}
})