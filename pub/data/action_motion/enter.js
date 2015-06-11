// 活动 -
// 接口返回的数据类型
//var fs = require--('fs-extra')
//var _path = require--('path')

var now = new Date()
function getTimeByHour(date, hour) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour)
}
var server_time = Math.round(now.getTime() / 1000)
var start_time = Math.round(getTimeByHour(now, 9).getTime() / 1000)
var end_time = Math.round(getTimeByHour(now, 24).getTime() / 1000)
//var staticData = fs.readJsonFileSync(_path.join(__dirname, './_static_data.json'))
//var left_times = staticData.left_times
var left_times = 2

var exports_error = {
	"status":{
		"code":60002,
		"message":"您已经有3个未领取的订单了，先去兑换吧~",
		"alert":"",
		"server_time":1430725375
	}
}

var exports_normal = {
	"status": {
		"code": 10000,
		"message": "成功",
		"alert": "",
		"server_time": server_time
	},
	"data": {
		// 如果有 taken_order 字段，说明已经成功领取过一个商品
		//taken_order: require('./claim').data,
		// 如果有 locked_item 字段，说明有摇到但是为领取的商品
		//locked_item: require('./get_item').data,
		// 今天还剩几次机会，0 - 3
		left_times: left_times,
		start_time: start_time,
		end_time: end_time,
		"list": [
			{
				"item_name": "香芋地瓜球(1份 限堂吃)",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "123****6694",
				"item_name": "西树泡芙",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"item_name": "金百万烤鸭",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "136****6694",
				"item_name": "香芋地瓜球(1份 限堂吃)",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "151****6694",
				"item_name": "金百万烤鸭",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "152****6694",
				"item_name": "香芋地瓜球(1份 限堂吃)",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "119****6694",
				"item_name": "西树泡芙",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "139****6694",
				"item_name": "香芋地瓜球(1份 限堂吃)",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "169****6694",
				"item_name": "金百万烤鸭",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "158****6694",
				"item_name": "香芋地瓜球(1份 限堂吃)",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}, {
				"mobile": "150****6623",
				"item_name": "西树泡芙",
				"user_name": "微信账号xxx",
				"created_at": 1429609877
			}
		],
		"switch": true
	}
}

//module.exports = exports_error
module.exports = exports_normal