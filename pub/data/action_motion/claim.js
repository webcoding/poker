var now = new Date()
function getTimeByHour(date, hour) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour)
}
module.exports = {
	"status": {
		"code": 10000,
		"message": "成功",
		"alert": "",
		"server_time": Math.round(now.getTime() / 1000)
	},
	"data": {
		"id": 944905,
		"item_id": 503222,
		"name": "苗家酸笋鸡(粉/面 限堂吃)",
		"type": 6,
		"description": "苗家酸笋鸡是百春原南味粉面的特色产品，采用苗家秘制做法，荤素结合，酸酸爽爽，风味独到，简单好吃咯！",
		"more_info": "http://staging.iqianggou.lab/api/util/get_static_content?key=item_detail&id=503222",
		"images": [
			"http://iqg-dev.qiniudn.com/855847b9a29e3ae711988a99b5b04cb3!300x300",
			"http://iqg-dev.qiniudn.com/933dc719d30f5a6a2187da17c2803b91!300x300"
		],
		"market_price": 21,
		"tips": "1，领用时间:11:30-20:00，每人每天之内限购一份，每桌限领一份\r\n2，购买成功后，您需在7日之内至指定门店领取抢购的商品，过期作废\r\n",
		"need_book": 0,
		"allow_take_out": 0,
		"weight": 0,
		"redeem_period": 7,
		"refund_type": 1,
		"price": 0,
		"status": 2,
		"start_date": 1429865378,
		"expire_date": 1430470178,
		"is_commented": false,
		"branches": [
			{
				"id": 12127,
				"name": "百春原南味粉面(杨高中路店)",
				"logo": "933dc719d30f5a6a2187da17c2803b91",
				"description": "百春原，是一家经营南味粉面、南味小吃、热菜、蒸菜、烤物、甜品、饮品的时尚休闲简快餐餐厅。\r\n百春原，源于儿时对粉面美食的一种热腾腾的眷恋，那些记忆所承载的关于气味、观感、口感的多样性体验凝聚着南方日常饮食的点滴智慧。\r\n百春原，正是为了唤醒这样美好饮食生活的记忆而存在，为现代餐饮生活注入更多情感表达。透过时尚的“面男”“粉女”形象，传达简食主义诉求，好吃简单咯！",
				"redeem_type": 1,
				"redeem_code_source": 1,
				"address": "上海市浦东新区杨高中路2128号正大生活馆1F",
				"tel": "02151348577",
				"lng": 121.554351,
				"lat": 31.231035,
				"redeem_time": "11:30~20:00",
				"freeze_period": 7,
				"rating": 5,
				"enabled": true,
				"created_at": 1386752425,
				"updated_at": 1429865378,
				"on_lined_at": 1387094400
			}
		],
		"comments": [
			{
				"content": "酸辣爽汤，味道齐全，面条一般",
				"time": 1429009737,
				"user_id": 203324,
				"mobile": "139****8085",
				"user_name": "139****8085",
				"rating": 5,
				"item_name": "苗家酸笋鸡(粉/面 限堂吃)"
			}
		],
		"redeem_number": 524647,
		"payment_period": 604800,
		"comments_count": "166",
		"rating": "5.0",
		"comments_limit": "5"
	}
}