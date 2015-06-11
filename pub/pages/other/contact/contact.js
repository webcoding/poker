var route = require('route')
var common = require('common')
var nav = require('nav')
var inherit = require('inherit')
var tplFn = require('templates/other/contact.content.html')

var Contact = inherit({
	name: 'Contact',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('联系我们')
			nav.btnLeft.setText('返回').actionBack()

			this.node = $(tplFn({
				urlProtocol: route.getRoute(route.R.USER_PROTOCOL, {
					url: route.STATIC_URL_AGREEMENT
				})
			}))
			this.onDomReady()
		}
	},
	statics:{
		NAME: route.N.CONTACT
	}
})