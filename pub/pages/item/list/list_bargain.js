var route = require('route')
var common = require('common')
//var nav = require('widgets/nav/pop-nav')
var nav = require('nav')
//var TabManager = require--('widgets/nav/TabManager')
var tabManager = require('./_tabManager')
var Toast = require('toast')
var tplFn = require('templates/item/list_bargain.content.html')
var storage = require('storage')
var history = require('modules/nav/history')
var inherit = require('inherit')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')
var loading = require('loading')
var url = require('url')
var Pagination = require('widgets/pagination/pagination')
var listFns = require('./_list_fns')
var du = require('baiduTongji')
var PageViewController = require('PageViewController')
var IconType = require('widgets/nav/_TypeIcon')
var SCROLL_TOP_TYPE = require('modules/spa/_TypeScrollTop')

// 只要有 storage.CURR_CITY，就必然会/需要有 storage.USING_ADDR
var usingAddr, usingCategory, currCity

var qs, lastId

var toast = Toast.getToast()

var ItemListBargain = inherit({
	name: 'ItemListBargain',
	base: PageViewController,
	proto: {
		onShow: function(){
			this.__base()

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_ITEM_LIST_BARGAIN, du.CustomScope.PAGE)

			qs = url.parseSearch()
			lastId = qs.last_id

			// 只要有 storage.CURR_CITY，就必然会/需要有 storage.USING_ADDR
			usingAddr = storage.get(storage.USING_ADDR)
			usingCategory = storage.get(storage.USING_CATEGORY)
			currCity = storage.get(storage.CURR_CITY)

			tabManager.getTab(0).update({active: true})
			nav.btnCenter.beTabContainer(tabManager).setTitle('往下拍商品列表')
			nav.btnRight.beIcon(IconType.ICON_MEMBER).textShow().setHref(route.getRoute(route.R.PROFILE))
			nav.btnLeft.setText(currCity.name).actionNavTo(route.getRoute(route.R.CITY_SELECT))

			// 此页是整个网站的根页面，所以，进入这个页面就清空所有历史
			// 也是为了避免 history 管理有错误缓存的地方
			if(!lastId){
				history.reset()
			}

			this.lastId = lastId
		},
		onShouldUpdate: function(){
			var me = this
			return listFns.update(
				me, currCity, usingAddr, usingCategory,
				loading, ajax, ajaxCache, Pagination,
				route, tplFn, route.N.ITEM_LIST_BARGAIN,
				ajax.API_ITEM_LIST_BARGAIN, null, null
			)
		},
		onAfterUpdate: function(){
			var me = this
			me.node.show()
			return me.__base()
		}
	},
	statics: {
		scrollTopType: SCROLL_TOP_TYPE.LAST_TIME,
		NAME: route.N.ITEM_LIST_BARGAIN
	}
})

module.exports = ItemListBargain