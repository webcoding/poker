var route = require('route')
var common = require('common')
var nav = require('nav')
var navUtil = require('navUtil')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')
var storage = require('storage')
var Toast = require('toast')
var inherit = require('inherit')
var registerTpl = require('templates/action_saoma/register.content.html')
var Action = require('modules/action/action')
var url = require('url')
var downTip = require('widgets/down-tip/down-tip')
var HashTongJi = require('modules/icount/hash_tj')
var Modal = require('widgets/overlay/modal')
var loading = require('loading')

var timestamp_register
//var params
//var shareCode
var qs

var toast = Toast.getToast()

//var fakeData = require--('data/action_saoma/shop')

var sucMsg = {
	REG_SUCCESS: '注册成功'
}
var errMsg = {
	PROTOCOL: '阅读并同意用户协议后才能继续哦~'
}

var alertModal = new Modal().setTitle('本次活动仅限新用户参加哦~<br>老用户就请关注我们下一波的精彩活动吧~').addButtons([{
	text: '好的，我知道了'
}])

var Register = inherit({
	name: 'ActionSaomaRegister',
	base: require('pages/user/common/BaseRegisterPageClass'),
	proto: {
		onShow: function(options){
			var me = this
			var __base = me.__base

			timestamp_register = storage.get(storage.TS_REGISTER)

			qs = url.parseSearch()

			downTip.hide()

			nav.hide()

			this.qs = qs

			me._hash_tongji = new HashTongJi().saoma(qs.shop_id, qs.qrtype, ajax.Type.TONGJI_SAOMA_SCAN_CODE)

			loading.show()
			me.xhr = ajax.getJSON(ajax.API_A_SM_SHOP, {
				shop_id: qs.shop_id
			}, success, error, {
				//fakeData: fakeData,
				useCache: true,
				cacheType: ajaxCache.TYPE_ONLY_CACHE,
				cacheKey: ajaxCache.A_SM_SHOP,
				complete: function(){
					loading.hide()
				}
			})

			function success(data, status, xhr, code, args){
				var shopData = data.data

				var urlRedirect = route.getRoute(route.R.A_SM_ORDER_LIST, {
					'shop_id':qs.shop_id,
					'qrtype':qs.qrtype
				})
				$.extend(me, {
					formId: 'form-register',
					passwordName: 'password',
					authCodeType: 'register',
					//shareCode: shareCode,
					toast: toast,
					countDownTimeStamp: timestamp_register,
					NAME_TIMESTAMP: storage.TS_REGISTER,
					MSG_FORM_SUCCESS: sucMsg.REG_SUCCESS,
					API_FORM_SUBMIT: ajax.API_USER_REGISTER,
					otherRegisterData: {
						shop: qs.shop_id,
						// 二维码类型：1桌贴
						shop_qr_type: 1
					},
					html: registerTpl({
						route: route,
						items: shopData.items,
						rules: shopData.rules,
						urlRedirect: urlRedirect
					}),
					onGetCodeError: function(e){
						e.preventDefault()
						alertModal.show()
					}
				})

				__base.call(me)

				me.nodeProtocol = $('[name=protocol]', me.nodeForm)

				Action.add({
					node:$('.btn-log[data-action]', me.node),
					actionType: 'click'
				})
			}

			function error(xhr, errorType, error, code, message){
				if(errorType !== 'abort'){
					toast.show(message || '网络错误，请重试')
				}
			}
		},
		onHide: function(){
			this.__base()

			nav.show()
		},
		_onFormSubmit: function(e){
			var me = this
			var protocol = me.nodeProtocol.attr('checked')
			if(!protocol){
				e.preventDefault()
				me.toast.show(errMsg.PROTOCOL)
				return
			}
			this.__base(e, function registerSuccess(evt){
				if(qs.redirect){
					evt.preventDefault()
					navUtil.replace(qs.redirect)
				}
			})
		}
	},
	statics: {
		stopParentInheritEvent: false,
		NAME: route.N.A_SM_REGISTER
	}
})