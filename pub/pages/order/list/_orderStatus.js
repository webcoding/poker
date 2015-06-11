/*
 // 评论状态
 CONST STATUS_COMMENTED_ALL_STATUS = -1; //所有评论状态
 CONST STATUS_NOT_COMMENTED = 0;         // 未评论
 CONST STATUS_COMMENTED = 1;             // 已评论

 // 订单状态 处理这个状态的时候要留意想要更改订单列表API的处理
 CONST STATUS_WAITING_PAYMENT = 1;               // 未支付
 CONST STATUS_PAID = 2;                          // 已支付
 CONST STATUS_EXPIRED = 3;                       // 已过期
 CONST STATUS_REDEEMED = 4;                      // 已使用
 CONST STATUS_CANCELLED = 5;                     // 已取消
 CONST STATUS_REFUNDED = 6;                      // 已退款
 CONST STATUS_INSUFFICENT_BALANCE_FAILED= 7;     // 余额不足，支付失败
 CONST STATUS_WAITING_CONFIRM = 8;               // 等待到账
 CONST STATUS_RECYCLED = 9;                      // 超时支付被系统回收
 CONST STATUS_UNKNOW = 10;                       // 客户端没有获取同步通知，服务端也没获得异步通知
 CONST STATUS_REFUND_REQUESTED = 11;             // 申请退款中
 CONST STATUS_REFUNDED_FAILED  = 12;             // 退款失败

 // 退款
 CONST REFUND_STATUS_NO_REQUEST = 0;                // 未申请退款
 CONST REFUND_STATUS_REQUEST_OK = 1;                // 申请退款成功
 CONST REFUND_STATUS_WAITING_ALIPAY_CONFIRM = 2;    // 等待支付宝退款确认
 CONST REFUND_STATUS_WAITING_WECHAT_CONFIRM = 3;    // 等待微信退款确认
 CONST REFUND_STATUS_SUCCESS = 4;                   // 退款成功
 CONST REFUND_STATUS_FAILED = 5;                    // 退款失败

 CONST REFUND_WAY_BALANCE = 1;
 CONST REFUND_WAY_ALIPAY = 2;
 CONST REFUND_WAY_BALANCE_AND_ALIPAY = 3;
 CONST REFUND_WAY_WECHAT = 4;
 CONST REFUND_WAY_BALANCE_AND_WECHAT = 5;
*/

var Status = {
	// 评论状态
	COMMENT_ALL_STATUS: -1,     //所有评论状态
	COMMENT_NOT_COMMENTED: 0,   // 未评论
	COMMENT_COMMENTED: 1,       // 已评论

	// 订单状态
	WAITING_PAYMENT: 1,               // 未支付
	PAID: 2,                          // 已支付
	EXPIRED: 3,                       // 已过期
	REDEEMED: 4,                      // 已使用
	CANCELLED: 5,                     // 已取消
	REFUNDED: 6,                      // 已退款
	INSUFFICENT_BALANCE_FAILED: 7,    // 余额不足，支付失败
	WAITING_CONFIRM: 8,               // 等待到账
	RECYCLED: 9,                      // 超时支付被系统回收
	UNKNOWN: 10,                      // 客户端没有获取同步通知，服务端也没获得异步通知
	REFUND_REQUESTED: 11,             // 申请退款中
	REFUNDED_FAILED: 12,              // 退款失败

	// 退款状态
	REFUND_NO_REQUEST: 0,                // 未申请退款
	REFUND_REQUEST_OK: 1,                // 申请退款成功
	REFUND_WAITING_ALIPAY_CONFIRM: 2,    // 等待支付宝退款确认
	REFUND_WAITING_WECHAT_CONFIRM: 3,    // 等待微信退款确认
	REFUND_SUCCESS: 4,                   // 退款成功
	REFUND_FAILED: 5,                    // 退款失败

	// 退款方式
	REFUND_WAY_BALANCE: 1,
	REFUND_WAY_ALIPAY: 2,
	REFUND_WAY_BALANCE_AND_ALIPAY: 3,
	REFUND_WAY_WECHAT: 4,
	REFUND_WAY_BALANCE_AND_WECHAT: 5
}
module.exports = Status
