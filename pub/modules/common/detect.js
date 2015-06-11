var c = require('./_const')

var userAgent = navigator.userAgent.toLowerCase()
var detect = {}
var os = $.os
var browser = $.browser
// 手机端
//detect.isMobile = navigator.userAgent.toLowerCase().indexOf('mobile') >= 0

// 手持设备
detect.isHandheldDevice = os.phone || os.tablet

// 微信
var micromessengerUA = userAgent.indexOf('micromessenger') >= 0
if(micromessengerUA){
	detect.micromessenger = {}
}

// 多维度内部APP userAgent 规范：
// navigator.userAgent + DWD_IQG/3.2.2.x
// Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4 DWD_IQG/3.2.2
var iqgUA = userAgent.match(/\sdwd_iqg\/([\d\.]+)/)
if(iqgUA){
	detect.iqg = {
		version: iqgUA[1]
	}
}
if(iqgUA){
	detect.dwd = {}
}
// wifi万能钥匙
// Mozilla/5.0 (Linux; Android 4.4.4; MI 4W Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 wkbrowser 3.1.9 629
var wifiKey = userAgent.match(/\swkbrowser\s([\d\.]+)\s(\d+)/)
if(wifiKey){
	detect.wifiKey = {
		version: wifiKey[1],
		buildVersion: wifiKey[2]
	}
}
//  阿里系
//detect.isAli = userAgent.indexOf('ali') >= 0
//detect.isTaobao = exports.isAli && userAgent.indexOf('taobao') >= 0
//detect.isAlipay = exports.isAli && userAgent.indexOf('alipay') >= 0
//detect.isTmall = exports.isAli && userAgent.indexOf('tmall') >= 0

detect.host = detect.micromessenger ? c.HOST_WECHAT :
				detect.iqg ? c.HOST_DWD_IQG :
				detect.isWifiKey ? c.HOST_WIFIKEY :
				detect.isAlipay ? c.HOST_ALIPAY :
				browser.chrome ? c.HOST_CHROME :
				browser.firefox ? c.HOST_FIREFOX:
				browser.ie ? c.HOST_IE :
				browser.safari ? c.HOST_SAFARI :
				browser.webkit ? c.HOST_WEBKIT :
							c.HOST_BROWSER

detect.platform = os.android ? c.PLATFORM_ANDROID :
				os.iphone ? c.PLATFORM_IPHONE :
				os.ipad ? c.PLATFORM_IPAD :
				os.ipod ? c.PLATFORM_IPOD :
				os.wp ? c.PLATFORM_WP :
				os.kindle ? c.PLATFORM_KINDEL :
				os.firefoxos ? c.PLATFORM_FIREFOXOS :
					c.PLATFORM_OTHER

module.exports = detect