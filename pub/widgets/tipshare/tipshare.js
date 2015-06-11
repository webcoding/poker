// 微信提示分享
var inherit = require('inherit')
var tplFn = require('./tipshare.html')

var TipShare = inherit({
	name:'TipShare',
	proto: {
		__constructor: function(options){
			this.node = $(tplFn())
			this.nodeContent = $('.content', this.node)

			$('body').append(this.node)

			this.node.on('click', $.proxy(this.onClick, this))
		},
		setText: function(text){
			this.nodeContent.html(text)
			return this
		},
		show: function(){
			this.node.show()
			return this
		},
		hide: function(){
			this.node.hide()
			return this
		},
		onClick: function(e){
			this.hide()
		}
	}
})

module.exports = new TipShare