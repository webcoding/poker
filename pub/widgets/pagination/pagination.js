var route = require('route')
var inherit = require('inherit')
var history = require('modules/nav/history')
var Action = require('modules/action/action')
var url = require('url')
var tplFn = require('./pagination.html')

var selector = '.iqg-pagination'

var Pagination = inherit({
	name: 'Pagination',
	proto: {
		/**
		 *
		 * @param options { hasMore, routeName, routeParamsObj[, page] }
		 * @private
		 */
		__constructor: function(options){
			var me = this

			$.extend(me, options)

			me.routeRule = route.R[me.routeName]

			var opts = {
				needDefaultPage: false
			}
			// 也可以使用自定义的过滤函数
			if(options.filterFunc) opts.filterFunc = options.filterFunc

			var prevHref = history.getLastPageByRouteName(false, me.routeName, opts)

			// 正常情况，用户在同一个 webView 中连续点击进入第几页
			if(prevHref){
				var prevUrlObj = url.parseUrl(prevHref)
				var prevPathname = prevUrlObj.pathname

				// 如果上一页不是当前路由，则，已经到达第一页
				if(!route.isRoute(me.routeRule, prevPathname)){
					prevHref = null
				}
			}
			// 没有上一页，比如，点击分享连接、比如返回了首页等
			// 还有可能就是 history 记录搞错了...
			//else{
			if(!prevHref){
				var currHref = location.href
				var currUrlObj = url.parseUrl(currHref, true)
				var currPathname = currUrlObj.pathname
				var currQs = currUrlObj.search

				// 比如，点击别人分享的页面，进入一个评论列表第2页，就没有 prevHref，但确实是当前路由
				// 比如，首页列表第2页
				if(route.isRoute(me.routeRule, currPathname)){
					var params
					var last_id = currQs.last_id
					if(last_id === undefined){
						params = route.getPathParam(me.routeRule, currPathname)
						last_id = params.last_id
					}
					// 如果当前页面有 last_id，说明当前页面肯定不是这个列表的第一页
					if(last_id){
						// 不管当前是第几页，直接返回第一页（因为也无法知道上一页）
						var obj = $.extend({}, me.routeParamsObj)
						delete obj.last_id
						prevHref = route.getRoute(me.routeRule, obj)
					}
					// 否则，就已经是这个列表的第一页
					else{
						prevHref = null
					}
				}
				// 既没有上一页的记录，当前页又不是传入的路由
				// 首页列表第一页可能会有这种情况，因为首页有两个路径："/" 和 "/item/list/bargain" --- 把 首页的路由统一了，这种情况不存在了
//				else{
//					prevHref = null
//				}
			}
			me.nextHref = me.hasMore ? route.getRoute(me.routeRule, me.routeParamsObj) : null

			me.html = tplFn({
				nextHref: me.nextHref,
				prevHref: prevHref
			})

			me.prevHref = prevHref
		},
		setNodeByParentNode: function(node){
			var me = this
			node = $(selector, node)

			me.node = node
			me.nodePrev = $('.prev', me.node)

			if(me.prevHref){
				Action.add({
					node: me.nodePrev,
					actionType: 'click'
				})
			}

			me.node.on('click', '.active', $.proxy(me.onActiveBtnClick, me))

			return me
		},
		onActiveBtnClick: function(e){
			var me = this
			me.viewController && me.viewController.scrollTo(0)//.getNodeContainer().scrollTop(0)
		}
	},
	statics: {

	}
})

module.exports = Pagination