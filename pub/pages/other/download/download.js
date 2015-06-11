var route = require('route')
var common = require('common')
var nav = require('nav')
var inherit = require('inherit')
var tplTipFn = require('templates/other/download.content.html')
var tplUrlSchema = require('./url-schema.html')
var url = require('url')
var detect = require('modules/common/detect')
var downTip = require('widgets/down-tip/down-tip')
var du = require('baiduTongji')

var pathParams, qs
var urlIPhoneDownload = common.urlIPhoneDownload,
	urlAndroidDownload = common.urlAndroidDownload,
	urlIFrame

var Download = inherit({
	name: 'Download',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			pathParams = route.getPathParam(route.R.DOWNLOAD)
			qs = url.parseSearch()

			nav.btnCenter.setText('下载')
			nav.btnLeft.setText('返回').actionBack()

			downTip.hide()

			var downloadFrom = pathParams.from
			// 具体取值，参见：modules/route/const 的 DOWNLOAD_FROM_xx
			urlIFrame = tplUrlSchema({
				isFav: downloadFrom == route.DOWNLOAD_FROM_FAV,
				isCoin: downloadFrom == route.DOWNLOAD_FROM_COIN,
				isPreferential: downloadFrom == route.DOWNLOAD_FROM_PREFERENTIAL,
				lng: qs.lng,
				lat: qs.lat,
				address: qs.address,
				itemId: qs.item_id
			})

			var html = tplTipFn({
				from: downloadFrom,
				route: route,
				os: $.os,
				urlIPhoneDownload: urlIPhoneDownload,
				urlAndroidDownload: urlAndroidDownload,
				urlIFrame: urlIFrame
			})
			this.node = $(html)
			this.nodeDownloadBtn = $('.download-btn', this.node)
			this.nodeWechatTip = $('.wechat-ios', this.node)
			this.onDomReady()
		},
		onHide: function(){
			this.__base()

			if(!downTip.isUserClosed) downTip.show()
		},
		bindEvent: function(){
			this.__base()
			this.nodeDownloadBtn.on('click', $.proxy(this.onDownloadBtnClick, this))
			this.nodeWechatTip.on('click', $.proxy(this.onTipClick, this))
		},
		unbindEvent: function(){
			this.__base()
			this.nodeDownloadBtn.off('click')
		},
		onDownloadBtnClick: function(e){
			if($.os.ios && detect.micromessenger){
				e.preventDefault()
				this.nodeWechatTip.show()
			}

			var label = pathParams.from
			var value = pathParams.from == route.DOWNLOAD_FROM_BOTTOM_TIP ? qs.type : null
			du.trackEvent(du.EventCategory.DOWNLOAD, du.EventAction.DOWNLOAD_BUTTON_CLICK, label + '_' + value)
		},
		onTipClick: function(){
			this.nodeWechatTip.hide()
		}
	},
	statics: {
		NAME: route.N.DOWNLOAD
	}
})