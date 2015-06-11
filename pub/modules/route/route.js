var routeUtil = require('./util')
var CONST = require('./const')
// 不介意是否登陆
var PERMISSION_TYPE_ANYWAY              = CONST.PERMISSION_TYPE_ANYWAY

////---------------------------------- route ------------------------------------------------///
exports.R          = {}
exports.C          = {}
// 进入此页面需要的权限
exports.P          = {}
// route 的 name
exports.N          = {}
// 页面需要导航到哪里，如果权限不足的话，默认是注册页面
exports.REDIRECT   = {}
// 第三方网站
exports.THIRD_SITE = {}

var Type = exports.Type = {
	REDIRECT: 'redirect'
}

/**
 * user
 */
// 登录页
exports.R.LOGIN                             = '/login'
exports.C.LOGIN                             = '/user/login'
exports.P.LOGIN                             = CONST.PERMISSION_TYPE_NOT_LOGIN

// 注册页
exports.R.REGISTER                          = '/register/:share_code?'
exports.C.REGISTER                          = '/user/register'
exports.P.REGISTER                          = CONST.PERMISSION_TYPE_NOT_LOGIN

// 重置密码页面
exports.R.RESET_PASSWORD                    = '/reset_password'
exports.C.RESET_PASSWORD                    = '/user/reset-password'
exports.P.RESET_PASSWORD                    = PERMISSION_TYPE_ANYWAY

// 登出
exports.R.LOGOUT                            = '/logout'
exports.C.LOGOUT                            = '/user/logout'
exports.P.LOGOUT                            = PERMISSION_TYPE_ANYWAY

// 登录状态检查页
exports.R.LOGIN_CHECK                       = '/login_check'
exports.C.LOGIN_CHECK                       = '/user/login-check'
exports.P.LOGIN_CHECK                       = PERMISSION_TYPE_ANYWAY

// 用户个人页面
exports.R.PROFILE                           = '/profile'
exports.C.PROFILE                           = '/user/profile'
exports.P.PROFILE                           = PERMISSION_TYPE_ANYWAY //CONST.PERMISSION_TYPE_LOGIN

/**
 * order
 */
// 我的订单
exports.R.ORDER_LIST                       = '/order/list/:type'
exports.C.ORDER_LIST                       = '/order/list'
exports.P.ORDER_LIST                       = CONST.PERMISSION_TYPE_LOGIN

// 订单详情
exports.R.ORDER_DETAIL                      = '/order/:order_id'
exports.C.ORDER_DETAIL                      = '/order/detail'
exports.P.ORDER_DETAIL                      = CONST.PERMISSION_TYPE_LOGIN

// 商品购买（订单支付）
exports.R.ORDER_PAY                         = '/order/:order_id/pay/:item_id'
exports.C.ORDER_PAY                         = '/order/pay'
exports.P.ORDER_PAY                         = CONST.PERMISSION_TYPE_LOGIN


/**
 * item
 */
// 商品列表页 - 往下拍
//exports.R.ITEM_LIST_BARGAIN               = /item/list/bargain/:last_id?'
//exports.R.ITEM_LIST_BARGAIN               = '/:last_id?'
exports.R.ITEM_LIST_BARGAIN                 = '/' // 不要使用 :last_id?，而是使用queryString：/?last_id=xx，因为这已经是根路径了，/:last_id? 会匹配所有路由的...
exports.C.ITEM_LIST_BARGAIN                 = '/item/list_bargain'
exports.P.ITEM_LIST_BARGAIN                 = PERMISSION_TYPE_ANYWAY

// 商品列表页 - 倒计时
exports.R.ITEM_LIST_COUNTDOWN               = '/item/list/countdown'
exports.C.ITEM_LIST_COUNTDOWN               = '/item/list_countdown'
exports.P.ITEM_LIST_COUNTDOWN               = PERMISSION_TYPE_ANYWAY

// 商品详情页
exports.R.ITEM_DETAIL                       = '/item/:item_id'
exports.C.ITEM_DETAIL                       = '/item/detail'
exports.P.ITEM_DETAIL                       = PERMISSION_TYPE_ANYWAY

// 商家所有门店列表页
exports.R.ITEM_SHOPS                        = '/item/:item_id/shops'
exports.C.ITEM_SHOPS                        = '/item/shops'
exports.P.ITEM_SHOPS                        = PERMISSION_TYPE_ANYWAY

// 商品的更多介绍
exports.R.ITEM_DESCRIPTION                  = '/item/:item_id/description'
exports.C.ITEM_DESCRIPTION                  = '/item/description'
exports.P.ITEM_DESCRIPTION                  = PERMISSION_TYPE_ANYWAY

// 商品优惠详情
exports.R.ITEM_PREFERENTIAL                 = '/item/:item_id/preferential'
exports.C.ITEM_PREFERENTIAL                 = '/item/preferential'
exports.P.ITEM_PREFERENTIAL                 = PERMISSION_TYPE_ANYWAY

// 评论列表页
exports.R.ITEM_COMMENTS                     = '/item/:item_id/comments/:last_id?'
exports.C.ITEM_COMMENTS                     = '/item/comments'
exports.P.ITEM_COMMENTS                     = PERMISSION_TYPE_ANYWAY


/**
 * zone & cbd
 */
// 城市选择
exports.R.CITY_SELECT                       = '/pos/city'
exports.C.CITY_SELECT                       = '/zone/city-select'
exports.P.CITY_SELECT                       = PERMISSION_TYPE_ANYWAY

// 位置选择
exports.R.ADDR_SELECT                       = '/pos/address'
exports.C.ADDR_SELECT                       = '/zone/address-select'
exports.P.ADDR_SELECT                       = CONST.PERMISSION_TYPE_LOGIN

/**
 * other
 */
// 联系我们
exports.R.CONTACT                           = '/contact'
exports.C.CONTACT                           = '/other/contact'
exports.P.CONTACT                           = PERMISSION_TYPE_ANYWAY

// 常见问题
exports.R.ISSUE                             = '/issue'
exports.C.ISSUE                             = '/other/issue'
exports.P.ISSUE                             = PERMISSION_TYPE_ANYWAY

// 用户协议页面
exports.R.USER_PROTOCOL                     = '/protocol'
exports.C.USER_PROTOCOL                     = '/other/protocol'
exports.P.USER_PROTOCOL                     = PERMISSION_TYPE_ANYWAY

// 通知中心
exports.R.NOTICE_CENTER                     = '/notice'
exports.C.NOTICE_CENTER                     = '/other/notice'
exports.P.NOTICE_CENTER                     = PERMISSION_TYPE_ANYWAY

// 下载页面
exports.R.DOWNLOAD                          = '/download/:from?'
exports.C.DOWNLOAD                          = '/other/download'
exports.P.DOWNLOAD                          = PERMISSION_TYPE_ANYWAY

// 清除所有存储
exports.R.CLEAR                             = '/clear'
exports.C.CLEAR                             = '/other/clear'
exports.P.CLEAR                             = PERMISSION_TYPE_ANYWAY

/**
 * exception
 */
exports.R.ERROR                             = '/error'
exports.C.ERROR                             = '/exception/error'
exports.P.ERROR                             = PERMISSION_TYPE_ANYWAY

/**
 * 微信 - 微信登陆
 */
// 微信登陆之后，需要跳转的页面
exports.R.AFTER_WECHAT_LOGIN                = '/wechat/afterlogin'
exports.C.AFTER_WECHAT_LOGIN                = '/wechat/afterlogin'
exports.P.AFTER_WECHAT_LOGIN                = PERMISSION_TYPE_ANYWAY

// 微信登录页面
var wechat_login_redirect = encodeURIComponent('http://m.iqianggou.com' + exports.R.AFTER_WECHAT_LOGIN + '?redirect=') + ':redirect'
exports.THIRD_SITE.WECHAT_LOGIN             = 'https://open.weixin.qq.com/connect/oauth2/authorize'+
									'?appid=wx1a04da7a5d85e882'+
									'&redirect_uri=' + wechat_login_redirect +
									'&response_type=code'+
									'&scope=snsapi_login'+
									'&state=STATE'+
									'#wechat_redirect'


/**
 * 活动 - 桌贴 - 扫码
 */
exports.R.A_SM_REGISTER                     = '/actions/saoma/register'
exports.C.A_SM_REGISTER                     = '/action_saoma/register'
exports.P.A_SM_REGISTER                     = CONST.PERMISSION_TYPE_NOT_LOGIN//PERMISSION_TYPE_ANYWAY

/**
 * 活动 - 桌贴 - 扫码
 */
exports.R.A_SM_ORDER_LIST                   = '/actions/saoma/order_list'
exports.C.A_SM_ORDER_LIST                   = '/action_saoma/order_list'
exports.P.A_SM_ORDER_LIST                   = CONST.PERMISSION_TYPE_LOGIN

/**
 * 活动 - 睡前摇 － 开始页
 */
exports.R.A_MOTION_START                    = '/actions/motion/start'
exports.C.A_MOTION_START                    = '/action_motion/start'
exports.P.A_MOTION_START                    = CONST.PERMISSION_TYPE_LOGIN

/**
 * 活动 - 睡前摇 － 分享页
 */
exports.R.A_MOTION_SHARE                    = '/actions/motion/share/:order_id'
exports.C.A_MOTION_SHARE                    = '/action_motion/share'
exports.P.A_MOTION_SHARE                    = PERMISSION_TYPE_ANYWAY

////---------------------------------- route ------------------------------------------------///


routeUtil.extend(exports, CONST)
routeUtil.each(exports.R, function(v,name){exports.N[name] = name})


// 页面需要导航到哪里，如果权限不足的话
// event_id 和 subevent_id 是注册时尽可能有的参数，用作统计
var defaultRedirectParams = [Type.REDIRECT, 'event_id', 'subevent_id', 'host', 'lng', 'lat', 'openid', 'operid']

// 活动扫码的订单列表页，需要使用扫码活动的定制的注册页面
exports.REDIRECT.A_SM_ORDER_LIST = {
	routeName: exports.N.A_SM_REGISTER,
	params: ['shop_id', 'qrtype', Type.REDIRECT]
}
routeUtil.each(exports.N, function(name){
	// 默认是注册页面
	if(!exports.REDIRECT[name]){
		exports.REDIRECT[name] = {
			routeName: exports.N.REGISTER,
			params: defaultRedirectParams
		}
	}
})


// 不要出现：
// 1. 一个路由多个routeName
// 2. 多个路由，实为一个路由，比如：/ 和 /list/bargain 都是首页
//exports.SAME_PAGES = [
//	//[exports.N.INDEX, exports.N.ITEM_LIST, exports.N.ITEM_LIST_BARGAIN]
//	//[exports.N.INDEX, exports.N.ITEM_LIST_BARGAIN]
//]
// 设置一个 object，查找的时候就不必每次都必须循环
//exports.IN_SAME_PAGES = {}
//exports.SAME_PAGES.forEach(function(group, i){ group.forEach(function(routeName){ exports.IN_SAME_PAGES[routeName] = i }) })

exports.getPageHome = function(){
	//return exports.R.INDEX
	return exports.R.ITEM_LIST_BARGAIN
}
var pathname_rulename_cache = {}
exports.getRuleNameByPath = function(pathname){
	var ruleName = pathname_rulename_cache[pathname]
	if(!ruleName){
		routeUtil.each(exports.R, function(rule, name){
	//		if(pathname.match(routeUtil.getRuleRegExp(rule))) {
			if(routeUtil.isRoute(rule, pathname)){
				ruleName = name
				return false
			}
		})
		pathname_rulename_cache[pathname] = ruleName
	}
	return ruleName
}

//exports.findSamePage = function(routeName){
//	return exports.SAME_PAGES[exports.IN_SAME_PAGES[routeName]]
//}

//routeUtil.extend(exports, routeUtil)
exports.getRoute                            = routeUtil.getRoute
exports.getPathParam                        = routeUtil.getPathParam
exports.isRoute                             = routeUtil.isRoute
exports.isPermission                        = routeUtil.isPermission