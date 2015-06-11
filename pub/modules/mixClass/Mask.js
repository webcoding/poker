var util = require('./util')

var proto = {
	// 这种方式虽然龊了点，但是代码很清晰，一看便知是怎么运行的
	mask_constructor: function (options) {
		this.nodeMask = $('.mask', this.node)
	},
	mask_bindEvent: function(){
		this.nodeMask.on('click', $.proxy(this.mask_onMaskClick, this))
	},
	mask_unbindEvent: function(){
		this.nodeMask.off('click')
	},
	mask_onMaskClick: function () {
		this.hide()
	}
}

module.exports = util.mix(proto)