var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var inherit = require('inherit')
var nav = require('nav')

var ItemPreferential = inherit({
	name: 'ItemPreferential',
	base: require('pages/c-item/original-web'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('优惠信息')
			nav.btnLeft.setText('返回').actionBack()
		}
	},
	statics: {
		stopParentInheritEvent: false,
		NAME: route.N.ITEM_PREFERENTIAL
	}
})
