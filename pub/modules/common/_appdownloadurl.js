
var detect = require('./detect')

if(detect.micromessenger){
	exports.urlIPhoneDownload = 'http://mp.weixin.qq.com/mp/redirect?url=https://itunes.apple.com/app/id567647683'
	exports.urlAndroidDownload = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.iqianggou.android'
}
else{
	exports.urlIPhoneDownload = 'https://itunes.apple.com/app/id567647683'
	exports.urlAndroidDownload = 'http://www.iqianggou.com/download.php?appType=android'
}
exports.urlAppDownload = $.os.ios ? exports.urlIPhoneDownload : exports.urlAndroidDownload