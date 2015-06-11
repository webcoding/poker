var storageCore = require('./core')

$.extend(exports, storageCore)

exports.HIDE_DOWNLOAD_TIP = 'HIDE_DOWNLOAD_TIP'

// 上次获取通知时的时间戳
exports.TS_NOTIFACATION   = 'TS_NOTIFACATION'
// 前一个页
exports.NAV_HISTORY       = 'NAV_HISTORY'
// 用户信息 --- 只要存在，就说明用户已经登陆了，反之亦然 -- 登陆、注册、重置密码、注销、调用myprofile、remote模式检查是否登陆（就是调用myprofile）都会设置该属性
exports.USER_INFO         = 'USER_INFO'
// 用户的地理位置信息 navigator.geolocation.getCurrentPosition
exports.USER_LOCATION     = 'USER_LOCATION'
// 已开通的城市列表
exports.CITY_LIST         = 'CITY_LIST'
// 定位的用户当前城市
exports.CURR_CITY         = 'CURR_CITY'
/**
 * 正在使用的地址（可能和定位的城市不相同）
 * @type {string}
 *
 * 数据结构：
 * {lat, lng, address}
 */
exports.USING_ADDR        = 'USING_ADDR'
// 发送（重置密码的）验证码的时间戳
exports.TS_RESET_CODE     = 'TS_RESET_CODE'
// 发送（注册的）验证码的时间戳
exports.TS_REGISTER       = 'TS_REGISTER'
// 城市下的可用分类
exports.CATEGORY          = 'CATEGORY'
// 目前正在使用的分类
exports.USING_CATEGORY    = 'USING_CATEGORY'
// 城市的热门商圈
//exports.ZONE_CBD          = 'ZONE_CBD'

// 商品评论
exports.ITEM_COMMENT      = 'ITEM_COMMENT'
// 商品门店
exports.ITEM_SHOPS        = 'ITEM_SHOPS'


// 倒计时商品的价格
// 之所以存到 storage，而不直接使用内存变量
// 便于在网页刷新之后，依然使用当时的价格
exports.ITEM_COUNTDOWN_PRICE             = 'ITEM_COUNTDOWN_PRICE'

exports.ITEMS_HAD_BARGAIN                = 'ITEMS_HAD_BARGAIN'


// 新创建的订单
exports.ORDER_CREATED                    = 'ORDER_CREATED'
// 新创建的订单的创建时间
exports.ORDER_CREATED_TS                 = 'ORDER_CREATED_TS'

// server 和 client 的时间差
exports.SERVER_CLIENT_TIME_DIFF          = 'SERVER_CLIENT_TIME_DIFF'