var storage = require('storage')
var du = require('baiduTongji')
var detect = require('modules/common/detect')
var bridge = require('dwdBridge')
var url = require('url')


var geo = navigator.geolocation

var position = storage.get(storage.USER_LOCATION) || {}

function getCurrPos (success, error, options){
	options = $.extend({
		// 最多100秒
		timeout: 100000,
		enableHighAcuracy: true
	}, options)
	var complete = options.complete

	function geoSuccess(pos){
		du.trackEvent(du.EventCategory.GEO, du.EventAction.GEO_SUC, 'geo_suc_' + detect.host + '_' + detect.platform + '_' + location.pathname)

		pos = convert_pos(pos)
		position = pos

		// 无论什么时候定位了，都需要更新用户位置信息
		storage.set(storage.USER_LOCATION, pos)
		success && success(pos)
		return complete && complete(true)
	}

	function geoError(geoErr){
		du.trackEvent(du.EventCategory.GEO, du.EventAction.GEO_ERR, 'geo_err_' + detect.host + '_' + detect.platform + '_' + location.pathname)

		try{
			error && error(geoErr)
			return complete && complete(false)
		}
		catch(e){
			return console.log(e)
		}
	}

	//test()
	var qs
	if(detect.iqg && geoSuccess){
		bridge.ready(function(){
			setTimeout(function () {
				var appGeo = bridge.geolocationAddr
				var _pos = {
					timestamp: Date.now(),
					coords: {
						latitude: appGeo.lat,
						longitude: appGeo.lng
					}
				}
				geoSuccess(_pos)
			}, 0)
		})
	}
	// wifi万能钥匙的 URL：http://m.iqianggou.com/?host=wifi&openid=2bc3d70a051d11e5afd76c92bf0ccc49&operid=14328058551175520166&lng=121.602548&lat=31.193418
	else if(detect.wifiKey && (qs = url.parseSearch()) && qs.lng && qs.lat){
		setTimeout(function () {
			var _pos = {
				timestamp: Date.now(),
				coords: {
					latitude: qs.lat,
					longitude: qs.lng
				}
			}
			geoSuccess(_pos)
		}, 0)
	}
	else{
		return geo.getCurrentPosition(geoSuccess, geoError, options)
	}

	//function test(){
	//	// 全国城市经纬度列表：
	//	// http://wenku.baidu.com/link?url=rJYcWMkTN2qVfF97QkOJqIy9LIwiE-KtF3Jz6OZqd2AbtVpYQ6kPaOLqktBGD0-ws6btki8Junh3Xp8FSAaf-lPhCpuMbE5lgu4z74p2RYq
	//	var city = {
	//		change_sha: {
	//			lng: 113.00000,
	//			lat: 28.21667
	//		},
	//		heze: {
	//			lng: 115.26,
	//			lat: 35.14
	//		}
	//	}
	//
	//	setTimeout(function(){
	//		geoSuccess({
	//			timestamp: new Date().getTime(),
	//			coords:{
	//				accuracy: null,
	//				// 纬度
	//				latitude: city.heze.lat,
	//				// 经度
	//				longitude: city.heze.lng,
	//				altitude: null,
	//				altitudeAcuracy: null,
	//				heading: null,
	//				speed: null
	//			}
	//		})
	//	}, 50)
	//}
}

// 经度
function getLng(){
	return position.coords && position.coords.longitude || false
}

// 纬度
function getLat(){
	return position.coords && position.coords.latitude || false
}

// 先定位一次
getCurrPos()

exports.getLng = getLng
exports.getLat = getLat
exports.getCurrPos = getCurrPos

// pos 对象不可被序列化，真烦人
function convert_pos(pos){
	var _coords = pos.coords
	var _pos = {
		timestamp: pos.timestamp,
		coords: {
			accuracy: _coords.accuracy,
			latitude: _coords.latitude,
			longitude: _coords.longitude,
			altitude: _coords.altitude,
			altitudeAcuracy: _coords.altitudeAcuracy,
			heading: _coords.heading,
			speed: _coords.speed
		}
	}
	return _pos
}