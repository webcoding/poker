var util = require('./util')

var proto = {
	hide: function(){
		if(this.isHide) return
		this.isHide = true
		this.node.hide()
		this.onHide && this.onHide()
		return this
	},
	show: function(){
		if(!this.isHide) return
		this.isHide = false
		this.node.show()
		this.onShow && this.onShow()
		return this
	},
	toggleVisible: function () {
		if(this.isHide) this.show()
		else this.hide()
	}
}

module.exports = util.mix(proto)