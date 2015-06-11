/**
 * AJAX 需要统一处理
 */

var geo = require('modules/geo/geo')
var route = require('route')
var navUtil = require('navUtil')
var ajaxCache = require('./cache')
var storage = require('storage')

var myAjax = exports
var Type = myAjax.Type = {}

var api_prefix;

var api_host = {
//	local: 'http://127.0.0.1:8081',
//	local: 'http://api.com',
	local: 'http://api.peichao.iqianggou.com',
	// 开发环境
	dev: 'http://dev.iqianggou.lab',
	// 预发环境
	staging: 'http://staging.iqianggou.lab',
	// 线上环境
	//prod: 'http://api.v3.iqianggou.com',
	prod: 'http://m.iqianggou.com',
	zhangchao: 'http://10.0.0.118:8000'
}
var testApiHost, originApiHost, defaultApiHost = api_host.prod, hostname = location.hostname

//testApiHost = api_host.local
//testApiHost = api_host.staging
//testApiHost = api_host.prod
//testApiHost = api_host.zhangchao

originApiHost = hostname.match(/\.iqianggou\.com$/) ? api_host.prod : hostname.match(/\.iqianggou\.lab$/) ? api_host.staging : ''
api_prefix = testApiHost || originApiHost || defaultApiHost

var api_baidu_prefix
//api_baidu_prefix = '/api_baidu'
api_baidu_prefix = 'http://api.map.baidu.com'

var api_weixin_api_prefix = 'https://api.weixin.qq.com'
var api_local_prefix = ''

var generateApi = function(pathname, prefix){
	if(typeof prefix !== 'string') prefix = api_prefix
	return prefix + pathname
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
// 百度地图 开发者应用的 ak
exports.BAIDU_MAP_AK            = 'IO0jwL9xyfzn4722tZGacPjq'
//
//
/**
 * 百度地图根据经纬度拿到地点信息
 * see http://developer.baidu.com/map/index.php?title=webapi/guide/webservice-geocoding
 * @params ak String
 * @params location={{lat}},{{lng}}
 * @params output=json
 */
exports.API_BAIDU_MAP_GEOCODER  = generateApi('/geocoder/v2/', api_baidu_prefix)

///////////////////
// --------------------------------------
// addressbook
// --------------------------------------
///////////////////
// [GET] 获取当前用户的所有地址薄
exports.API_GET_ADDRESS_BOOK    = generateApi('/api/addressbook')
// [POST] 添加一个地址
exports.API_ADD_ADDRESS_BOOK    = generateApi('/api/addressbook')
//
exports.API_GET_ADDRESS_INFO    = generateApi('/api/address/info')

///////////////////
// --------------------------------------
// Coin
// --------------------------------------
///////////////////
// [GET] 获取金币信息
exports.API_GET_COIN    = generateApi('/api/coin')

///////////////////
// --------------------------------------
// item
// --------------------------------------
///////////////////
// 获取周边的商品列表 - 往下拍
exports.API_ITEM_LIST_BARGAIN   = generateApi('/api/item')
// 获取周边的商品列表 - 倒计时
exports.API_ITEM_LIST_COUNTDOWN = generateApi('/api/countdown/item')
// 获取商品详情
exports.API_ITEM_DETAIL         = generateApi('/api/item/{id}')

exports.API_ITEM_COMMENTS       = generateApi('/api/item/{item_id}/comments')

exports.API_ITEM_DO_BARGAIN     = generateApi('/api/item/{id}/bargain')

///////////////////
// --------------------------------------
// order
// --------------------------------------
///////////////////
// 我的订单 - 根据类型
exports.API_ORDER               = generateApi('/api/order/type/{type}')
/**
 *
 订单类型

 1：往下拍
 2：预售商品
 3：倒计时
 4：市场活动奖励活动，用于生成订单 -- 比如扫码
 5：品牌门店限制商品，同一品牌商品只能在一个门店购买
 */
exports.API_ORDER_BY_TYPE       = generateApi('/api/order/list/{type}')

// 类型：往下拍
Type.ORDER_BARGAIN              = 1
// 类型：预售
Type.ORDER_PRESELL              = 2
// 类型：倒计时
Type.ORDER_COUNTDOWN            = 3
// 类型：市场活动
Type.ORDER_ACTION               = 4

// 订单详情
exports.API_ORDER_DETAIL        = generateApi('/api/order/{order_id}')
// [POST] 创建一个订单
exports.API_ORDER_CREATE        = generateApi('/api/order')
// [DELETE] 删除一个订单
exports.API_ORDER_DELETE        = generateApi('/api/order/{order_id}')

// 根据订单ID取商品
exports.API_ORDER_ITEM          = generateApi('/api/order/item/{order_id}')

///////////////////
// --------------------------------------
// other
// --------------------------------------
///////////////////
// 获取所有通知
exports.API_NOTIFICATION        = generateApi('/api/notification')

///////////////////
// --------------------------------------
// payment
// --------------------------------------
///////////////////
// 订单支付请求
exports.API_PAYMENT             = generateApi('/api/payment')
// 检查订单状态，是否付款成功
exports.API_PAYMENT_STATUS      = generateApi('/api/payment/{order_id}/status')

///////////////////
// --------------------------------------
// user
// --------------------------------------
///////////////////
// 接口 - 用户登陆
exports.API_USER_LOGIN          = generateApi('/api/user/login')
// 获取（重置密码的）验证码
exports.API_USER_AUTH_CODE      = generateApi('/api/user/auth_code')
// 重置密码
exports.API_USER_RESET_PASSWORD = generateApi('/api/user/reset_password')
// 注册
exports.API_USER_REGISTER       = generateApi('/api/user/register')
// 注销当前用户
exports.API_USER_LOGOUT         = generateApi('/api/user/logout')

///////////////////
// --------------------------------------
// user info
// --------------------------------------
///////////////////
// 获取我的账户明细，只返回近30天的记录
exports.API_BALANCE_DETAIL         = generateApi('/api/user/balance_detail')
// 获取我的个人信息
exports.API_USER_PROFILE           = generateApi('/api/user/myprofile')

///////////////////
// --------------------------------------
// zone & cbd
// --------------------------------------
///////////////////
// 接口 - 返回城市列表
exports.API_ZONE                = generateApi('/api/zone')
// 返回指定城市的分类列表，只返回enabled的
exports.API_ZONE_CATEGORIES     = generateApi('/api/zone/{zone_id}/categories')
// 返回指定城市的商圈
exports.API_ZONE_CBD            = generateApi('/api/zone/{zone_id}/cbd')

///////////////////
// --------------------------------------
// error
// --------------------------------------
///////////////////
// 错误统计
exports.API_ERROR_MONITOR       = generateApi('')

///////////////////
// --------------------------------------
// 活动 - 桌贴 - 扫码
// --------------------------------------
///////////////////
// 商店商品和规则
exports.API_A_SM_SHOP           = generateApi('/api/actions/saoma/shop/{shop_id}')
// 我的订单
//exports.API_A_SM_ORDER          = generateApi('/api/actions/saoma/order')
// 统计扫码人次
exports.API_TONGJI_SAOMA_COUNT  = generateApi('/api/actions/saoma/log/{shop_id}/{qrtype}/{action}')

Type.TONGJI_SAOMA_SCAN_CODE     = 'scan_code'

///////////////////
// --------------------------------------
// 活动 - 睡前摇
// --------------------------------------
///////////////////
// 摇一摇进入页面的接口
exports.API_A_MOTION_ENTER        = generateApi('/api/shake/enter')
// 摇一摇获取商品
exports.API_A_MOTION_GET_ITEM     = generateApi('/api/shake/item')
// 领取奖品
exports.API_A_MOTION_CLAIM        = generateApi('/api/shake/take/{pool_id}')
// 放弃奖品
exports.API_A_MOTION_DISCARD      = generateApi('/api/shake/discard/{pool_id}')
// 根据 order_id 查询结果，返回的是 item 和 是否是当前用户的
exports.API_A_MOTION_RESULT       = generateApi('/api/shake/result/{order_id}')


///////////////////
// --------------------------------------
// 微信接口
// --------------------------------------
///////////////////
// 微信 JS SDK 获取数字签名
exports.API_WECHAT_SIGN         = generateApi('/api/wechat/jssign')
//exports.API_WECHAT_SIGN         = generateApi('/api/wechat/jssign', '')
// 微信登录 获取 userinfo
exports.API_GET_USERINFO = generateApi('/api/wechat/userinfo', api_local_prefix)
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


Type.CODE_SUCCESS            = 10000
Type.CODE_SUCCESS_EMPTY      = 10001
Type.CODE_SUCCESS_MAX        = 10099
Type.CODE_SUCCESS_MIN        = 10000


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


// 需要验证的接口，主要是为了保证有的接口必须只能在一个地方调度
var ApiShouldAuth = [
	exports.API_USER_PROFILE
]


$.ajaxSettings.crossDomain = true;
$.ajaxSettings.beforeSend = function(xhr) {
	// 这个是 zepto 的 BUG：
	// https://github.com/madrobby/zepto/issues/921
	// https://github.com/madrobby/zepto/pull/935
	try {
		xhr.withCredentials = true;
	}
	catch(e) {
		// -> INVALID_STATE_ERROR: DOM Exception 11
	}
}
/**
 *
 * @param params
 * {
 *
 * }
 * @returns {*}
 * @private
 */
function _ajax(params){
	params = $.extend({
		useZepto: false,
		dataType: 'json',
		capture401AutoRedirect: false,
		success: noop,
		error: noop,
		complete: noop,
		timeout: 20 * 1000
	}, params)

	var header = {}
	var lng = geo.getLng()
	var currentCity = storage.get(storage.CURR_CITY)
	if(lng){
		header.lng = lng
		header.lat = geo.getLat()
	}
	if(currentCity && currentCity.id){
		header.zoneid = currentCity.id
	}
	params.headers = $.extend(header, params.headers)

	/**
	 * ONLY_DEVELOPMENT_CODE_BEGIN
	 */
	ApiShouldAuth.forEach(function(api){
		if(params.url === api && params._auth !== api){
			throw '[ERROR] [AJAX] only authorized client can use this API(`'+api+'`).'
		}
	})
	/**
	 * ONLY_DEVELOPMENT_CODE_END
	 */

	if(params.useZepto){
		return $.ajax(params)
	}

	var useCache = params.useCache, cacheType = params.cacheType, cacheKey1, cacheKey2
	//if(typeof useCache === 'function') useCache = useCache()
	if(Array.isArray(params.cacheKey)){
		cacheKey1 = params.cacheKey[0]
		cacheKey2 = params.cacheKey[1]
	}
	else{
		cacheKey1 = params.cacheKey
	}

	params.url = params.url.replace(/\{([\w\d_]+)\}/g, function(match, $1){
		var val = params.data[$1]
		if(!val)
			throw '[ERROR] [AJAX] ajax param "'+$1+'" is not defined.'
		delete params.data[$1]
		return val
	})

	var _suc = params.success
	var _err = params.error
	var _com = params.complete
	var current_time_execute_success = 0

	params.success = suc
	params.error = err
	params.complete = com
	// 擦，忘了为什么了，好像是 withCredentials 在某些低版本 Android 浏览器上有问题
//	params.xhrFields = {
//		withCredentials: true
//	}

	var cache = ajaxCache.getItem(cacheKey1, cacheKey2)
	if(typeof useCache === 'function') useCache = cache ? useCache(cache) : false

	if(useCache && cache){
		suc(cache, ajaxCache.STATUS_TYPE_CACHE, null)
		com(null, ajaxCache.STATUS_TYPE_CACHE)
	}

	if(params.fakeData){
		return new FakeXHR(params)
	}
	//if(!cache || ((!useCache || cacheType === ajaxCache.TYPE_STILL_LOAD) && !params.fakeData)){
	else if(!cache || !useCache || cacheType === ajaxCache.TYPE_STILL_LOAD){
		return $.ajax(params)
	}
	else{
		return new FakeXHR(params)
	}


	function suc(data, status, xhr){
		if(typeof data === 'string')
			data = JSON.parse(data)

		var code = data.status.code
		// TODO 改为：10000 - 10099 都是正确的
		if(code <= Type.CODE_SUCCESS_MAX && code >= Type.CODE_SUCCESS_MIN){
			if(code === Type.CODE_SUCCESS_EMPTY && !data.data) data.data = []
			if(useCache && status !== ajaxCache.STATUS_TYPE_CACHE) ajaxCache.setItem(cacheKey1, cacheKey2, data)
			_suc && _suc(data, status, xhr, code, {
				execute_time: current_time_execute_success
			})
		}
		else{
			data.isStatusError = true
			err(null, null, data, code, data.status.message)
		}
	}

	function err(xhr, errorType, error, code, message){
		var status = xhr && xhr.status.toString()
		// 401不捕获(catch)的话，默认跳转到注册页
		if(status == 401 && !params.capture401AutoRedirect){
			// 既然是自动跳转的，就需要 remote 去服务器检查登陆状态
			navUtil.location(route.getRoute(route.R.REGISTER, {
				remote: true
			}))
			return
		}
		var statusFirstChar = status && status.charAt(0)
		// 40x 的错误，需要特殊处理
		if(statusFirstChar == 4){
			try{
				error = JSON.parse(xhr.responseText)
				code = error.status.code
				message = error.status.message
			}
			catch(e){}
		}
		_err && _err(xhr, errorType, error, code, message, {
			execute_time: current_time_execute_success
		})
	}

	function com(xhr, status){
		_com && _com(xhr, status, {
			execute_time: current_time_execute_success
		})
		// 先执行 success，然后 complete，所以，自增放在这里
		current_time_execute_success++
	}
}

function _short(type, url, data, succ, err, params){
	if(typeof data === 'function'){
		params = err
		err = succ
		succ = data
		data = null
	}
	if(typeof err !== 'function'){
		params = err
		err = null
	}
	return _ajax($.extend({
		url: url,
		type: type,
		data: data,
		success: succ,
		error: err
	}, params))
}

function getJSON(url, data, succ, err, params){
	return _short('GET', url, data, succ, err, params)
}

function post(url, data, succ, err, params){
	return _short('POST', url, data, succ, err, params)
}

function noop(){}

function FakeXHR(params){
	params = params || {}
	if(params.fakeData){
		setTimeout(function(){
			var status = 200
			var xhr = null
			params.success && params.success(params.fakeData, status, xhr)
			params.complete && params.complete(xhr, status)
		}, params.fakeTimeout || 500)
	}
}

['abort'].forEach(function(methodName){
	FakeXHR.prototype[methodName] = noop
})

exports.ajax = _ajax
exports.getJSON = getJSON
exports.postJSON = post
exports.FakeXHR = FakeXHR