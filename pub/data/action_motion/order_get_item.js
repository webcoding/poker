// order
// 接口返回的数据类型
var now = new Date()
function getTimeByHour(date, hour) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour)
}
var server_time = Math.round(now.getTime() / 1000)
var start_time = Math.round(getTimeByHour(now, 9).getTime() / 1000)
var end_time = Math.round(getTimeByHour(now, 24).getTime() / 1000)
var left_times = 2

module.exports = {
	"status": {
		"code": 10000,
		"message": "成功",
		"alert": "",
		"server_time": server_time
	},
	"data": {
		"mine": false,
		"item": {
			"id": 956536,
			"item_id": 514555,
			"name": "香滑蒸蛋(1份)",
			"type": 1,
			"description": "一个鸡蛋中含有大量的维生素和矿物质，最重要的是含有高生物价值的蛋白质。 鸡蛋能为我们整个生命过程提供维生素、矿物质和重要的微量元素。\r\n因此，鸡蛋应是饮食的重要成分，鸡蛋很容易烹饪、咀嚼和消化，而且价格很便宜。鸡蛋可以用多种多样的方式烹饪，它几乎适合于做成一切形式的食品，但采用蒸的方法也是最利于人体吸收的。",
			"more_info": "http://api.v3.iqianggou.com/api/util/get_static_content?key=item_detail&id=514555",
			"images": [
				"http://img-agc.iqianggou.com/a0388621e47e5de8f06313d462031354!300x300",
				"http://img-agc.iqianggou.com/b8746524d522a83afa5e3b8328bf6fe6!300x300"
			],
			"market_price": 5.5,
			"tips": "1，领用时间:12:00-20:00，每人每15天每店限领一份，每桌限领一份，仅限堂吃。\r\n2，购买成功后，您需在7日之内至指定门店领取抢购的商品，过期作废。\r\n3，不与店内其他优惠活动同享。",
			"need_book": 0,
			"allow_take_out": 0,
			"weight": 0,
			"redeem_period": 7,
			"refund_type": 1,
			"price": 1,
			"status": 5,
			"start_date": 1429364037,
			"expire_date": 1429364937,
			"is_commented": false,
			"branches": [
				{
					"id": 19666,
					"name": "真功夫(万体馆)",
					"logo": "",
					"description": "<p>1990年6月18日     “真功夫”的始祖店“168甜品屋”在东莞长安镇中心市场107国道旁正式开业，主营甜品、粥品和汤粉。<br />\n1994年4月     “168甜品屋”升级为“168”蒸品快餐店，主营蒸饭、蒸汤和甜品。<br />\n1995年3月     “168”第二家蒸品快餐店开业。<br />\n1995年11月     “168”第三家蒸品快餐店开业。<br />\n1997年     研发出“电脑程控蒸汽柜”，巧妙运用蒸汽实现烹饪过程的同压、同温、同时，此举攻克了全球的中餐“标准化”难题。<br />\n1997年     “168”改名为“双种子”，11月16日，第一家“双种子”蒸品餐厅在东莞虎门镇开业，这也是全球第一家实现“标准化”的中式快餐餐厅。<br />\n1997年     开始建立员工训练制度。<br />\n1999年     制定出中国餐饮业内第一套界定操作规程标准化的《营运手册》。<br />\n1999年     “双种子”进入广州、深圳，走出了东莞。</p>",
					"redeem_type": 2,
					"redeem_code_source": 1,
					"address": "上海市徐汇区天钥桥路666号上海体育场四号扶梯下",
					"tel": "02164265811",
					"lng": 121.442634,
					"lat": 31.181729,
					"redeem_time": "12:00-20:00",
					"freeze_period": 15,
					"rating": 5,
					"enabled": true,
					"created_at": 1423637704,
					"updated_at": 1429687844,
					"on_lined_at": 1421391368
				}
			],
			"comments": [
				{
					"content": "味道不错，里面还有虾仁，小小一份还是蛮合算的。",
					"time": 1429326403,
					"user_id": 337577,
					"mobile": "133****0185",
					"user_name": "133****0185",
					"rating": 5,
					"item_name": "香滑蒸蛋(1份)"
				}
			],
			"payment_period": -760071,
			"comments_count": "9",
			"rating": 5,
			"comments_limit": "5"
		}
	}
}