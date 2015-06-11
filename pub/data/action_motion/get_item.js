var util = require('../common/util')

var now = new Date()
module.exports = {
	"status": {
		"code": 10000,
		"message": "成功",
		"alert": "",
		"server_time": Math.round(now.getTime() / 1000)
	},
	"data": {
		"pool_id": 18,
		"item": {
			"id": 503223,
			"type": 1,
			"name": util.randomItems(["苗家酸笋鸡(粉/面 限堂吃)", "招牌梨汁", "特色椒盐排条", "香花蒸蛋"]),
			"description": "苗家酸笋鸡是百春原南味粉面的特色产品，采用苗家秘制做法，荤素结合，酸酸爽爽，风味独到，简单好吃咯！",
			"more_info": "http://staging.iqianggou.lab/api/util/get_static_content?key=item_detail&id=503223",
			"brand": "百春原南味粉面",
			"images": [
				"http://iqg-dev.qiniudn.com/855847b9a29e3ae711988a99b5b04cb3!180x180",
				"http://iqg-dev.qiniudn.com/933dc719d30f5a6a2187da17c2803b91!180x180"
			],
			"start_price": 16,
			"floor_price": 1,
			"market_price": 21,
			"unlock_price": 16,
			"current_price": 16,
			"left": 1,
			"is_new": false,
			"tips": "1，领用时间:11:30-20:00，每人每7天之内限购一份，每桌限领一份\r\n2，购买成功后，您需在7日之内至指定门店领取抢购的商品，过期作废\r\n",
			"freeze_period": 7,
			"need_book": 0,
			"allow_take_out": 0,
			"weight": 0,
			"redeem_period": 7,
			"refund_type": 1,
			"bargain": false,
			"bargain_range": 0.2,
			"like": 0,
			"branches": [
				{
					"name": "百春原南味粉面(百联西郊店)",
					"logo": "http://iqg-dev.qiniudn.com/933dc719d30f5a6a2187da17c2803b91",
					"logo_small": "http://iqg-dev.qiniudn.com/",
					"description": "百春原，是一家经营南味粉面、南味小吃、热菜、蒸菜、烤物、甜品、饮品的时尚休闲简快餐餐厅。\r\n百春原，源于儿时对粉面美食的一种热腾腾的眷恋，那些记忆所承载的关于气味、观感、口感的多样性体验凝聚着南方日常饮食的点滴智慧。\r\n百春原，正是为了唤醒这样美好饮食生活的记忆而存在，为现代餐饮生活注入更多情感表达。透过时尚的“面男”“粉女”形象，传达简食主义诉求，好吃简单咯！",
					"redeem_type": [
						1
					],
					"address": "上海市长宁区仙霞西路88号百联西郊购物中心南区2F",
					"tel": "02132033677",
					"lat": 31.208965,
					"lng": 121.370413,
					"redeem_time": "11:30~20:00"
				}
			]
		}
	}
}