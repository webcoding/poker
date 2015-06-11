var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var nav = require('nav')
var tabManager = require('./_tabManager')
var tplFn = require('templates/item/list_countdown.content.html')
var inherit = require('inherit')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')
var storage = require('storage')
var CountManager = require('./_CountManager')
var Pagination = require('widgets/pagination/pagination')
var loading = require('loading')
var url = require('url')
var history = require('modules/nav/history')
var listFns = require('./_list_fns')
var du = require('baiduTongji')
var PageViewController = require('PageViewController')
//var wechat = require--('modules/wechat/wechat')
var IconType = require('widgets/nav/_TypeIcon')
var SCROLL_TOP_TYPE = require('modules/spa/_TypeScrollTop')

var global = window

var usingAddr
var userLocation
var currCity

var qs, lastId


var ItemListCountdown = inherit({
	name: 'ItemListCountdown',
	base: PageViewController,
	proto: {
		onShow: function(){
			var me = this
			me.__base({
				doUpdateShareInfo: false
			})
			me.updateShareInfo(null, null, null, global.location.href)

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_ITEM_LIST_COUNTDOWN, du.CustomScope.PAGE)

			qs = url.parseSearch()
			lastId = qs.last_id

			usingAddr = storage.get(storage.USING_ADDR)
			userLocation = storage.get(storage.USER_LOCATION)
			currCity = storage.get(storage.CURR_CITY)

			tabManager.getTab(1).update({active: true})
			nav.btnCenter.beTabContainer(tabManager).setTitle('倒计时商品列表')
			nav.btnRight.beIcon(IconType.ICON_MEMBER).textShow().setHref(route.getRoute(route.R.PROFILE))
			nav.btnLeft.setText(currCity.name).actionNavTo(route.getRoute(route.R.CITY_SELECT))

			this.lastId = lastId
		},
		onShouldUpdate: function(){
			var me = this
			var coords = userLocation && userLocation.coords
			var location = coords ? {
				lat: coords.latitude,
				lng: coords.longitude
			} : usingAddr

			// 倒计时，只能获取用户定位周边商品，不能查看手动选择的位置的商品
			return listFns.update(
				me, currCity, location, null,
				loading, ajax, ajaxCache, Pagination,
				route, tplFn, route.N.ITEM_LIST_COUNTDOWN,
				ajax.API_ITEM_LIST_COUNTDOWN, successCb, null
			)

			function successCb(items, sc_diff_milli){
				me.countdownManager = new CountManager({
					data: items,
					nodeWrap: me.node,
					sc_diff_milli: sc_diff_milli
				})
			}
		},
		bindEvent: function(){
			var me = this
			me.__base()

			me.node.on('click', '.item', $.proxy(me.onItemClick, me))
		},
		unbindEvent: function(){
			var me = this
			me.__base()
			me.node.off()
		},
		onDestroy: function(){
			var me = this
			me.__base()
			me.xhr && me.xhr.abort()
			me.countdownManager && me.countdownManager.clear()
			delete me.countdownManager
		},

		onItemClick: function(e){
			var me = this
			var node = $(e.currentTarget)
			var index = node.data('index')
			var id = node.data('id')
			var count = me.countdownManager.counts[index]
			var currPrice = count.countdown.currPrice()

			storage.set(storage.ITEM_COUNTDOWN_PRICE, {id: id, price: currPrice})
		}
	},
	statics: {
		scrollTopType: SCROLL_TOP_TYPE.LAST_TIME,
		NAME: route.N.ITEM_LIST_COUNTDOWN
	}
})