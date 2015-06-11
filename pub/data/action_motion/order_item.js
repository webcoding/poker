// order
// 接口返回的数据类型
var now = new Date()
function getTimeByHour(date, hour) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour)
}
var server_time = Math.round(now.getTime() / 1000)

module.exports = {
	"status": {
		"code": 10000,
		"message": "成功",
		"alert": "",
		"server_time": server_time
	},
	"data": {
		// 此订单是否是当前用户的
		"mine": true,
		"item":require('./get_item').data.item
	}
}