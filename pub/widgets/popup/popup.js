var inherit = require('inherit')
var inehritUtil = require('venders/inherit/util')

var Popup = inherit({
	name: 'Popup',
	proto: inehritUtil.delegatePropertyMethod({
		__constructor: function(){
			this._isBgSolid = false
		},
		bgSolid: function(){
			if(this._isBgSolid) return
			this._isBgSolid = true
			this.nodeContent.addClass('solid-bg')
		},
		bgRestore: function(){
			if(!this._isBgSolid) return
			this._isBgSolid = false
			this.nodeContent.removeClass('solid-bg')
		}
	}, [['node', ['show', 'hide'], true]])
})

module.exports = Popup