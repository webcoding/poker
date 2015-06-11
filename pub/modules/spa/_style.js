var inherit = require('inherit')

function processStyles(styles){
	if(typeof styles === 'string') styles = styles.split(',')
	return styles
}

function Group(options){
	$.extend(this, options)

	if(this.isStartPage && window.globalInfo && globalInfo.STYLE_LOADED){
		this.styles = processStyles(globalInfo.STYLE_LOADED)
	}
	else{
		imod.addResources(this.styles, 'css')
	}
}

var Style = inherit({
	name: 'Style',
	proto: {
		__constructor: function(options){
			this.loaded = {}
			this.groups = []
			this.init()
		},
		init: function(){
			var group = new Group({
				isStartPage: true
			})
			this.groups.push(this.markAsLoaded(group))
		},
		load: function(styles){
			var group = new Group({
				styles: this._uniq(styles)
			})
			this.groups.push(this.markAsLoaded(group))
		},
		markAsLoaded: function(group){
			var styles = group.styles

			var me = this
			styles.forEach(function(style){
				me.loaded[style] = true
			})
			return group
		},
		_uniq: function(styles){
			var loaded = this.loaded
			var _styles = []
			processStyles(styles).forEach(function(style){
				if(loaded[style] || !style) return
				_styles.push(style)
			})
			return _styles
		}
	}
})

var style = new Style

module.exports = style