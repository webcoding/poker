var inherit = require('inherit')
var tplFn = require('./loading.html')

var loading
var Loading = inherit({
	name: 'Loading',
	proto: {
		__constructor: function(options){
			$.extend(this, options)
			this.node = $(tplFn({
				className: this.className
			}))
			this.isShow = true
		},
		show: function(){
			if(this.isShow) return
			this.isShow = true
			this.node.show()
			return this
		},
		hide: function(){
			if(!this.isShow) return
			this.isShow = false
			this.node.hide()
			return this
		}
	},
	statics: {
		getLoading: function(){
			return loading
		}
	}
})

var loading = new Loading({
	className: 'default-loading'
})

$(function(){
	$('body').append(loading.node)
})

module.exports = Loading