var route = require('route')
var common = require('common')
var inherit = require('inherit')
var nav = require('nav')

var OtherIssue = inherit({
	name: 'OtherIssue',
	base: require('pages/c-item/original-web'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('常见问题')
			nav.btnLeft.setText('返回').actionBack()
		}
	},
	statics: {
		stopParentInheritEvent: false,
		NAME: route.N.ISSUE
	}
})