var storage = require('storage')
var inherit = require('inherit')
var tplFn = require('./down-tip.html')
var route = require('route')
var _const = require('./_const')
var url = require('url')
var detect = require('modules/common/detect')
var appDownloadUrl = require('modules/common/_appdownloadurl')

var Type = _const.Type

var qs = url.parseSearch()

var DownTip = inherit({
	name: 'DownTip',
	proto: {
		__constructor: function(node){
			this.node = node
			this._isHidden = true
			this._isDomMounted = false

			var hideDownloadTip = storage.get(storage.HIDE_DOWNLOAD_TIP)
			this.isUserClosed = hideDownloadTip
			var needShow = !this.isUserClosed && qs.d_tip !== 'no' && !detect.wifiKey
			if(needShow){
				this.show()
			}

			$('.close', this.node).on('click', $.proxy(this.onCloseClick, this))
			$('.btn-download', this.node).on('click', $.proxy(this.onDownloadClick, this))
		},
		hide: function(){
			if(this._isHidden) return this
			this._isHidden = true

			this.node.hide()
			return this
		},
		show: function(){
			if(!this._isHidden) return this
			this._isHidden = false

			this.mountDom()
			this.node.show()
			return this
		},
		mountDom: function(){
			if(this._isDomMounted) return this
			this._isDomMounted = true

			var html = tplFn({
				route: route,
				tipType: Math.random() > 0.5 ? Type.BUY_FASTER : Type.MONEY_EVERY_DAY,
				Type: Type,
				From: _const.From
			})
			this.node.append(html)
			return this
		},
		jumpApp: function(url){
			this.nodeIframe && this.nodeIframe.remove()
			this.nodeIframe = $('<iframe src="'+url+'" style="display:none"></iframe>').appendTo('body')
		},
		onDownloadClick: function(e){
			var me = this

			if(!detect.micromessenger){
				e.preventDefault()
				//e.stopPropagation()

				me.jumpApp('iqianggou://home')

				setTimeout(function(){
					me.jumpApp(appDownloadUrl.urlAppDownload)
				}, 50)
			}
		},
		onCloseClick: function(){
			storage.set(storage.HIDE_DOWNLOAD_TIP, true)
			this.node.hide()
		}
	}
})

var downTip = new DownTip($('.download-tip'))

module.exports = downTip