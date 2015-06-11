var route = require('route')
var common = require('common')
var nav = require('nav')
var navUtil = require('navUtil')
var ajax = require('ajax')
var Toast = require('toast')
var detect = require('modules/common/detect')
var tplFn = require('templates/action_motion/share.content.html')
var inherit = require('inherit')
var tipshare = require('widgets/tipshare/tipshare')
var downTip = require('widgets/down-tip/down-tip')
var bridge = require('dwdBridge')
var wechat = require('modules/wechat/wechat')
var du = require('baiduTongji')

var params, orderId

var toast = Toast.getToast()

//var fakeDataItem = require--('data/action_motion/order_get_item')

var ActionNightMotionShare = inherit({
	name: 'ActionNightMotionShare',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			var me = this
			me.__base()

			nav.btnCenter.setTitle('睡前摇')
			downTip.hide()
			nav.hide()

			params = route.getPathParam(route.R.A_MOTION_SHARE)
			orderId = params.order_id

			me.canAppMotion = detect.iqg

			nav.hide()
		},
		onHide: function(){
			var me = this
			me.__base()

			nav.show()
		},
		onShouldUpdate: function(){
			var me = this

			me.xhr = ajax.getJSON(ajax.API_ORDER_ITEM, {
				order_id: orderId
			}, success, error, {
				//fakeData: fakeDataItem,
				complete: function(){
				}
			})

			function success(data, status, xhr, code, args){
				me.item = data.data.item

				var html = tplFn({
					item: me.item,
					mine: data.data.mine,
					route: route
				})
				me.node = $(html)
				me.nodeBtnClose = $('.close', me.node)
				me.nodeBtnShare = $('.btn-share', me.node)

				me.onDomReady()
			}

			function error(xhr, errorType, error, code, message){
				if(errorType !== 'abort'){
					toast.show(message || '网络错误，请重试')
				}
			}

			return me
		},
		onDomReady: function(){
			this.__base()

			bridge.hideNavigationBar()
		},
		bindEvent: function(){
			var me = this
			me.__base()

			me.nodeBtnClose.on('click', $.proxy(me.onBtnCloseClick, me))
			me.nodeBtnShare.on('click', $.proxy(me.onBtnShareClick, me))


			var shareObj = me.getShareObj()
			me.updateShareInfo(shareObj.title, null, shareObj.image, shareObj.url, function(){
				du.trackEvent(du.EventCategory.MOTION_SHARE, du.EventAction.MOTION_SHARE_WEIXIN)
			})
		},
		unbindEvent: function(){
			var me = this
			me.__base()
			me.nodeBtnClose && me.nodeBtnClose.off('click')
			me.nodeBtnShare && me.nodeBtnShare.off('click')
		},
		getShareObj: function(){
			var me = this
			var share = {}
			share.title = '爱抢购请客啦~今天我摇到了'+ me.item.name +'~真的免费！手快有手慢无哦！'
			share.body = '一大波奖品来袭，一般人我不告诉TA，记得来玩哦~'
			share.image = 'http://m.iqianggou.com/bundles/dwdweb/images/night_motion/shareimg.png'
			share.support = false
			share.url = location.href
			return share
		},
		onBtnCloseClick: function(e){
			var me = this
			if(me.canAppMotion){
				bridge.pop()
			}
			else{
				navUtil.back()
			}
		},
		// 分享
		onBtnShareClick: function (e) {
			var me = this

			var shareObj = me.getShareObj()

			// 爱抢购
			if(detect.iqg){
				bridge.share({
					type: 0,
					title: shareObj.title,
					body: shareObj.body,
					image: shareObj.image,
					support: shareObj.support,
					url: shareObj.url,
					complete: function (responseData) {
						//alert('complete.' + JSON.stringify(responseData))
					}
				})
			}
			else if(detect.micromessenger){
				tipshare.setText('点击右上角，就能分享活动<br>攒人品啦！~').show()
			}
			else{
				toast.show('您的客户端不支持分享，手动分享此页面吧～', {
					ms: 4000,
					bgSolid: true
				})
			}
			du.trackEvent(du.EventCategory.MOTION_SHARE, du.EventAction.MOTION_SHARE_APP)
		}
	},
	statics: {
		NAME: route.N.A_MOTION_SHARE
	}
})