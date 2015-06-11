var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var nav = require('nav')
var ajax = require('ajax')
var Toast = require('toast')
var tplFn = require('templates/item/comments.content.html')
var storage = require('storage')
var inherit = require('inherit')
var ajaxCache = require('modules/ajax/cache')
var loading = require('loading')
var Pagination = require('widgets/pagination/pagination')

var toast = Toast.getToast()
var params, itemId, lastId

var ItemComments = inherit({
	name: 'ItemComments',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			this.__base()

			nav.btnCenter.setText('评论')
			nav.btnLeft.setText('返回').actionBack()

			params = route.getPathParam(route.R.ITEM_COMMENTS)
			itemId = params.item_id
			lastId = params.last_id

			this.itemId = itemId
			this.lastId = lastId
		},
		onShouldUpdate: function(){
			var me = this

			loading.show()
			var data = {
				item_id: me.itemId
			}
			if(me.lastId){
				data.last_id = me.lastId
			}
			me.xhr = ajax.getJSON(ajax.API_ITEM_COMMENTS, data, success, error, {
				useCache: true,
				cacheType: ajaxCache.TYPE_STILL_LOAD,
				cacheKey: [ajaxCache.ITEM_COMMENT, me.itemId],
				complete: function(){
					loading.hide()
				}
			})

			function success(data, status, xhr, code, args){
				var dataComments = data.data
				var dataPagination = data.pagination

				me.pagination = new Pagination({
					hasMore: dataPagination.has_more,
					routeName: route.N.ITEM_COMMENTS,
					routeParamsObj: {
						last_id: dataPagination.last_id,
						item_id: me.itemId
					}
				})

				var html = tplFn({
					comments: dataComments,
					paginationHTML: me.pagination.html
				})
				me.node = $(html)

				me.pagination.setNodeByParentNode(me.node)

				me.onDomReady(args.execute_time)
			}

			function error(xhr, errorType, error, code, message){
				if(errorType !== 'abort'){
					toast.show(message || '网络请求失败了，请亲重试下吧~')
				}
			}
		}
	},
	statics: {
		NAME: route.N.ITEM_COMMENTS
	}
})