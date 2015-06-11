var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var nav = require('nav')
var ajax = require('ajax')
var Toast = require('toast')
var tplFn = require('templates/item/shops.content.html')
var storage = require('storage')
var inherit = require('inherit')
var ajaxCache = require('modules/ajax/cache')
var loading = require('loading')

var itemShops
var params, itemId

var toast = Toast.getToast()

var ItemShops = inherit({
	name: 'ItemShops',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			params = route.getPathParam(route.R.ITEM_SHOPS)
			itemId = params.item_id

			nav.btnCenter.setText('所有门店')
			nav.btnLeft.setText('返回').actionBack()

			this.itemId = itemId
		},
		onShouldUpdate: function(){
			var me = this

			var data = storage.get(storage.ITEM_SHOPS)
			if(data && data.item_id == me.itemId){
				this.onContent(data.shops)
			}
			else{
				loading.show()
				me.xhr = ajax.getJSON(ajax.API_ITEM_DETAIL, {
					id: me.itemId
				}, success, error, {
					useCache: true,
					cacheType: ajaxCache.TYPE_STILL_LOAD,
					cacheKey: [ajaxCache.ITEM_SHOP, me.itemId],
					complete: function(){
						loading.hide()
					}
				})
			}

			function success(data, status, xhr, code, args){
				var dataShops = data.data.branches
				storage.set(storage.ITEM_SHOPS, {
					item_id: me.itemId,
					shops: dataShops
				})
				me.onContent(dataShops, args.execute_time)
			}
			function error(){
				toast.show('网络请求失败了，请亲重试下吧~')
			}
		},
		onContent: function(data, executeTime){
			var me = this
			var html = tplFn({
				shops: data
			})
			me.node = $(html)
			me.onDomReady(executeTime)
		}
	},
	statics: {
		NAME: route.N.ITEM_SHOPS
	}
})