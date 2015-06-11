var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var inherit = require('inherit')
var nav = require('nav')

var ItemDescription = inherit({
	name: 'ItemDescription',
	base: require('pages/c-item/original-web'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('商品详细描述')
			nav.btnLeft.setText('返回').actionBack()
		}
	},
	statics: {
		stopParentInheritEvent: false,
		NAME: route.N.ITEM_DESCRIPTION
	}
})