var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var inherit = require('inherit')
var nav = require('nav')
var ajax = require('ajax')
var storage = require('storage')
var Toast = require('toast')
var resetPasswordTpl = require('templates/user/reset-password.content.html')
var du = require('baiduTongji')

var timestamp_reset_auth_code

var toast = Toast.getToast()

var sucMsg = {
	RESET_PASS: '密码重置成功，可以退出重新登陆下试试~'
}

var ResetPassword = inherit({
	name: 'ResetPassword',
	base: require('../common/BaseRegisterPageClass'),
	proto: {
		onShow: function(){
			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_USER_RESET_PASS, du.CustomScope.PAGE)

			timestamp_reset_auth_code = storage.get(storage.TS_RESET_CODE)

			nav.btnCenter.setText('重置密码')
			nav.btnLeft.setText('返回').actionNavTo(route.getRoute(route.R.LOGIN))

			$.extend(this, {
				formId: 'form-reset',
				passwordName: 'new_password',
				authCodeType: 'reset',
				toast: toast,
				countDownTimeStamp: timestamp_reset_auth_code,
				NAME_TIMESTAMP: storage.TS_RESET_CODE,
				MSG_FORM_SUCCESS: sucMsg.RESET_PASS,
				API_FORM_SUBMIT: ajax.API_USER_RESET_PASSWORD,
				html: resetPasswordTpl()
			})

			this.__base()
		}
	},
	statics: {
		stopParentInheritEvent: false,
		NAME: route.N.RESET_PASSWORD
	}
})