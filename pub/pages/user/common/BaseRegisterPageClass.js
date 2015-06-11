var inherit = require('inherit')
var ajax = require('ajax')
var storage = require('storage')
var navUtil = require('navUtil')
var BtnGetCode = require('./BtnGetCode')
var _url = require('url')
var Event = require('venders/emitter/Event')

var reg = {
	MOBILE_FORMAT: /^\d{11}$/,
	// 验证码，6位 或 4位
	CODE_FORMAT: /^(\d{6}|\d{4})$/,
	PASSWORD_FORMAT: /^.{6,}$/
}
var sucMsg = {
	AUTH_CODE: '验证码已发送到您的手机，请注意查收~'
}
var errMsg = {
	MOBILE_DIFF: '此手机号跟获取验证码的手机号不一致',
	MOBILE_FORMAT: '手机号格式错啦，再重试下吧~',
	// 验证码无效
	CODE_INVALID: '验证码不正确，重试下吧~',
	PASSWORD_INVALID: '密码不太合适，换一个再试试吧~',
	OTHER: '出错了...请重新试一下吧~'
}

var BaseRegisterPageClass = inherit({
	name: 'Register',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			this.node = $(this.html)

			this.nodeForm = $('#'+this.formId, this.node)
			this.nodeMobile = $('[name=mobile]', this.nodeForm)
			this.nodeCode = $('[name=auth_code]', this.nodeForm)
			this.nodePass = $('[name='+this.passwordName+']', this.nodeForm)
			this.nodeGetCode = $('.get-verify-code', this.nodeForm)
			this.nodeButton = $('.submit', this.node)

			this.btnGetCode = new BtnGetCode(this.nodeGetCode)

			// 进入页面，先检查，是否可以发送验证码
			if(this.countDownTimeStamp){
				var now = +new Date()
				var diffSecond = 60 - Math.round((now - this.countDownTimeStamp)/1000)
				this.btnGetCode.startCountDown(diffSecond)
			}

			this.onBtnGetCodeClick = $.proxy(this._onBtnGetCodeClick, this)
			this.onFormSubmit = $.proxy(this._onFormSubmit, this)

			this.onDomReady()
		},
		bindEvent: function(){
			this.__base()
			this.btnGetCode.node.on('click', this.onBtnGetCodeClick)
			this.nodeForm.on('submit', this.onFormSubmit)
		},
		unbindEvent: function(){
			this.__base()
			this.btnGetCode.node.off('click', this.onBtnGetCodeClick)
			this.nodeForm.off('submit', this.onFormSubmit)
		},
		disableButton: function(){
			var me = this
			me.nodeButton.attr('disabled', true).addClass('disabled')
			return me
		},
		enableButton: function(){
			var me = this
			me.nodeButton.removeAttr('disabled', true).removeClass('disabled')
			return me
		},
		_onBtnGetCodeClick: function(e){
			var me = this
			if(me.btnGetCode.isDisabled) return

			var mobile = me.nodeMobile.val()
			if(!mobile.match(reg.MOBILE_FORMAT)){
				me.toast.show(errMsg.MOBILE_FORMAT)
			}
			else{
				me.btnGetCode.startCountDown()

				ajax.ajax({
					type: 'POST',
					url: ajax.API_USER_AUTH_CODE,
					data: {
						mobile: mobile,
						type: me.authCodeType,
						method: me.btnGetCode.isVoiceBtn ? 'call' : 'sms'
					},
					success: function(data, status, xhr){
						me.toast.show(sucMsg.AUTH_CODE)
						storage.set(me.NAME_TIMESTAMP, +new Date)
					},
					error: function(xhr, errorType, error, code, message){
						var e = new Event()

						me.btnGetCode.stopCountDown()

						if(me.onGetCodeError) me.onGetCodeError(e, code, message)
						if(!e.defaultPrevented){
							me.toast.show(message || errMsg.OTHER)
						}
					}
				})
			}
		},
		_onFormSubmit: function(e, registerSuccess){
			var me = this
			e.preventDefault()

			var mobile = me.nodeMobile.val()
			var code = me.nodeCode.val()
			var newPass = me.nodePass.val()

			if(!mobile.match(reg.MOBILE_FORMAT)){
				me.toast.show(errMsg.MOBILE_FORMAT)
			}
			// 密码格式
			else if(!newPass.match(reg.PASSWORD_FORMAT)){
				me.toast.show(errMsg.PASSWORD_INVALID)
			}
			// 验证码格式不正确
			else if(!code.match(reg.CODE_FORMAT)){
				me.toast.show(errMsg.CODE_INVALID)
			}
			else{
				var qs = _url.parseSearch()
				var regData = {
					mobile: mobile,
					auth_code: code,
					event_id: qs.event_id,
					subevent_id: qs.subevent_id
				}
				regData[me.passwordName] = newPass
				if(qs.channel) regData.channel = qs.channel
				if(me.shareCode) regData.share_code = me.shareCode
				if(me.otherRegisterData) $.extend(regData, me.otherRegisterData)

				me.disableButton()
				me.xhr = ajax.ajax({
					type: 'POST',
					url: me.API_FORM_SUBMIT,
					data: regData,
					success: function(data, status, xhr){
						// 重置密码成功之后，这些字段都重置
						storage.remove(me.NAME_TIMESTAMP)
						//
						me.toast.show(me.MSG_FORM_SUCCESS, {
							ms:5000
						})

						// 注册之后，自动登陆了
						var usefulUserInfo = data.data
						storage.set(storage.USER_INFO, usefulUserInfo)

						if(registerSuccess){
							var evt = new Event()
							registerSuccess(evt)
						}

						if(me.qs.redirect){
							navUtil.replace(me.qs.redirect)
						}
						else{
							navUtil.back()
						}
					},
					error: function(xhr, errorType, error, code, message){
						me.toast.show(message || errMsg.OTHER)
					},
					complete: function(){
						me.enableButton()
					}
				})
			}
		}
	},
	statics: {
		stopParentInheritEvent: true,
		onAfterInherit: function(SubClass){
			this.__base(SubClass)
		}
	}
})

module.exports = BaseRegisterPageClass