// 活动统计

var url = require('url')
var ajax = require('ajax')

var inherit = require('inherit')

var Hash_TongJi = inherit({
	name: 'Hash_TongJi',
	proto: {
		__constructor: function(options){
			var me = this
			me.hash = url.parseHash()
		},
		saoma: function(shop_id, qrtype, action){
			var me = this
			if(me.hash.action == 'saoma'){
				delete me.hash.action
				location.hash = url.stringifyHash(me.hash)

				// 不必在意是否成功
				ajax.getJSON(ajax.API_TONGJI_SAOMA_COUNT, {
					shop_id: shop_id,
					qrtype: qrtype,
					action: action
				})
			}
			return me
		}
	}
})

module.exports = Hash_TongJi