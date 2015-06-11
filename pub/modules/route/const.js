// 订单类型 - 待领用
exports.ORDER_TYPE_REDEEM                   = 'redeem'
// 订单类型 - 待评价
exports.ORDER_TYPE_TO_COMMENT               = 'to_comment'
// 订单类型 - 已完成
exports.ORDER_TYPE_DONE                     = 'done'
//// done_h5 是合并 done 和 tocomment 状态
//exports.ORDER_TYPE_DONE_H5                  = 'done_h5'

// 商品类型 - 倒计时
exports.ITEM_TYPE_COUNTDOWN                 = 'countdown'
// 商品类型 - 往下拍
exports.ITEM_TYPE_BARGAIN                   = 'bargain'

// 赚金币
exports.DOWNLOAD_FROM_COIN                  = 'coin'
// 收藏
exports.DOWNLOAD_FROM_FAV                   = 'fav'
// 优惠点
exports.DOWNLOAD_FROM_PREFERENTIAL          = 'preferential'
// 下载提示条
exports.DOWNLOAD_FROM_BOTTOM_TIP            = 'bottom_tip'

// 静态链接  -->> 常见问题
exports.STATIC_URL_FAQ                      = 'http://api.v3.iqianggou.com/api/util/get_static_content?key=user_faq'//'http://www.iqianggou.com/mobile/faq.html'
// 静态链接  -->> 使用协议
exports.STATIC_URL_AGREEMENT                = 'http://www.iqianggou.com/mobile/agreement.html'

// 需要登陆
exports.PERMISSION_TYPE_LOGIN               = 1 // 001
// 不能登陆
exports.PERMISSION_TYPE_NOT_LOGIN           = 2 // 010
// 不介意是否登陆
exports.PERMISSION_TYPE_ANYWAY              = exports.PERMISSION_TYPE_NOT_LOGIN | exports.PERMISSION_TYPE_LOGIN  // 3 // 100