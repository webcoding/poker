var c = require('modules/common/_const')

var _hmt
//if(imod.isProduction()){
	_hmt = window._hmt
//}


var baiduTongji = {
	trackPage: function(url){
		_hmt && _hmt.push(['_trackPageview', getPathurl(url)])
	},
	trackEvent: function(category, action, label){
		_hmt && _hmt.push(['_trackEvent', category, action, label || '_'])
	},
	customVar: function(index, name, value, scope){
		_hmt && _hmt.push(['_setCustomVar', index, name, value, scope])
	},

	EventCategory: {
		DOWNLOAD: 'download',
		ORDER: 'order',
		GEO: 'geo',

		// 睡前摇分享
		MOTION_SHARE: 'motion_share'
	},
	EventAction: {
		DOWNLOAD_BUTTON_CLICK: 'download_btn_click',
		ORDER_CANCEL: 'ord_cancel',
		GEO_SUC: 'geo_suc',
		GEO_ERR: 'geo_err',

		MOTION_SHARE_APP: 'ms_app',
		MOTION_SHARE_WEIXIN: 'ms_wx'
	},
	EventLabel: {
		// 下订单的过程中，取消订单，并删除订单
		ORDER_CANCEL_YES: 'order_cancel_y',
		// 下订单的过程中，取消订单，但点击按钮又留下了
		ORDER_CANCEL_NO_BUTTON: 'order_cancel_n_btn',
		// 下订单的过程中，取消订单，但点击空白又留下了
		ORDER_CANCEL_NO_MASK: 'order_cancel_n_msk',
		ORDER_CANCEL_TIMEOUT: 'order_cancel_timeout'
	},

	CustomIndex: {
		PAGE:     1,
		LOGGED:   2,
		HOST:     3,
		PLATFORM: 4,
		CUSTOM:   5
	},
	CustomName: {
		PAGE:      'page',
		LOGGED:    'logged',
		HOST:      'host',
		PLATFORM:  'platform',
		CUSTOM:    'custom'
	},
	CustomValue: {
		PAGE_ITEM_LIST_BARGAIN:     'itm_lst_bgn',
		PAGE_ITEM_LIST_COUNTDOWN:   'itm_lst_cnt',
		PAGE_ITEM_DETAIL:           'itm_dtl',
		PAGE_ORDER_LIST_REDEEM:     'ord_lst_rdm',
		PAGE_ORDER_LIST_TO_COMMENT: 'ord_lst_cmt',
		PAGE_ORDER_LIST_DONE:       'ord_lst',
		PAGE_ORDER_DETAIL:          'ord_dtl',
		PAGE_ORDER_PAY:             'ord_pay',
		PAGE_GEO_CITY:              'geo_cty',
		PAGE_GEO_ADDR:              'geo_addr',
		PAGE_USER_LOGIN:            'usr_lgI',
		PAGE_USER_REGISTER:         'usr_reg',
		PAGE_USER_RESET_PASS:       'usr_rst_pwd',
		PAGE_USER_PROFILE:          'usr_prof',

		LOGGED_YES:          'lgd_y',
		LOGGED_NO:           'lgd_n',

		HOST_WECHAT:  c.HOST_WECHAT,
		HOST_DWD_IQG: c.HOST_DWD_IQG,
		// wifi万能钥匙
		HOST_WIFIKEY: c.HOST_WIFIKEY,
		HOST_ALIPAY:  c.HOST_ALIPAY,

		HOST_CHROME:  c.HOST_CHROME,
		HOST_FIREFOX: c.HOST_FIREFOX,
		HOST_IE:      c.HOST_IE,
		HOST_SAFARI:  c.HOST_SAFARI,
		HOST_WEBKIT:  c.HOST_WEBKIT,
		HOST_BROWSER: c.HOST_BROWSER,

		PLATFORM_ANDROID:   c.PLATFORM_ANDROID,
		PLATFORM_IPHONE:    c.PLATFORM_IPHONE,
		PLATFORM_IPAD:      c.PLATFORM_IPAD,
		PLATFORM_IPOD:      c.PLATFORM_IPOD,
		PLATFORM_WP:        c.PLATFORM_WP,
		PLATFORM_KINDEL:    c.PLATFORM_KINDEL,
		PLATFORM_FIREFOXOS: c.PLATFORM_FIREFOXOS,
		PLATFORM_OTHER:     c.PLATFORM_OTHER
	},
	CustomScope: {
		// 对于页面的统计，使用页面级别
		PAGE: 3,
		// 对于访问的用户是否登陆，使用访次级别
		LOG: 2,
		// 统计web的宿主，是webview还是浏览器，使用页面级别
		HOST: 3,
		// 统计访问平台，android/ios...，使用页面级别
		PLATFORM: 3
	}
}

module.exports = baiduTongji

function getPathurl(url){
	// http://m.iqianggou.com/profile  -> /profile
	// https://m.iqianggou.com/profile  -> /profile
	// //m.iqianggou.com/profile  -> /profile
	var m = url.match(/^(?:\w+s?:)?\/\/[\w\.]+(?::\d+)?(\/.*)$/)
	if(m) return m[1]
	return url
}
