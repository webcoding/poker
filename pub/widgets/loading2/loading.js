var tpl = require('./loading.html')
var inherit = require('inherit')
var inheritUtil = require('venders/inherit/util')

var Loading = inherit({
	name: 'Loading',
	proto: inheritUtil.delegatePropertyMethod({
		__constructor: function(options){
			this.node = $(tpl())
			this.nodeMask = $('.mask', this.node)
			this._isHide = true
			this._isMaskHide = true
		},
		hide: function(){
			if(!this._isHide){
				this.node.hide()
				this._isHide = true
			}
			this.hideMask()
			return this
		},
		show: function(showMask){
			if(this._isHide){
				this.node.show()
				this._isHide = false
			}

			if(showMask){
				this.showMask()
			}

			return this
		},
		hideMask: function(){
			if(!this._isMaskHide){
				this.nodeMask.hide()
				this._isMaskHide = true
			}

			return this
		},
		showMask: function(){
			if(this._isMaskHide){
				this.nodeMask.show()
				this._isMaskHide = false
			}
			return this
		}
	}, [
		['node', ['appendTo'], true]
	])
})

var loading = new Loading
loading.appendTo(document.body)

module.exports = loading