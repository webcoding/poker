// item.type 和 order.type 都是这个：

var Type = {
	BARGAIN:       1, //往下拍，常规
	PRE_SALE:      2, //预售
	COUNTDOWN:     3, //倒计时
	CAMPAIGN_GIFT: 4, //市场活动奖励活动，用于生成订单，不需在客户端显示
	BRAND_LIMIT:   5, //品牌门店限制商品，同一品牌商品只能在一个门店购买
	NIGHT_MOTION:  6  //睡前摇
}

module.exports = Type