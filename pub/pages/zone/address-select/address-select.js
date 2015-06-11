var route = require('route')
var common = require('common')
var nav = require('nav')
var navUtil = require('navUtil')
var inherit = require('inherit')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')
var storage = require('storage')
var geoUtil = require('modules/geo/util')
var tplFn = require('templates/zone/address-select.macro.html')
var userUtil = require('modules/user/util')
var _ = require('_')
var du = require('baiduTongji')

var AddressSelect = inherit({
	name: 'AddressSelect',
	base: require('PageViewController'),
	proto: {
		onShow: function () {
			var me = this
			me.__base()

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_GEO_ADDR, du.CustomScope.PAGE)

			nav.btnCenter.setText('地点选择')
			nav.btnLeft.setText('返回').actionBack()

			me.currCity = storage.get(storage.CURR_CITY)
			me.usingAddr = storage.get(storage.USING_ADDR)

			var macroCompiledContext = {}
			tplFn(macroCompiledContext)
			var html = macroCompiledContext.macro_main(me.currCity.name, me.usingAddr.address).toString().trim()

			me.node = $(html)
			me.nodePosition = $('.position', me.node)
			me.onDomReady()
		},
		bindEvent: function(){
			var me = this
			me.__base()
			me.nodePosition.on('click', '.click-to-geo', $.proxy(me.onGeoClick, me))
			me.node.on('click', '.cbd-point', $.proxy(me.onPointClick, me))
		},
		unbindEvent: function(){
			var me = this
			me.__base()
			me.nodePosition.off()
		},
//		destroy: function(){},
		onShouldUpdate: function(){
			var me = this
			me.xhr = {
				currPos: me.updateCurrPos(),
				//cbd: me.updateCbd(),
				//addressbook: me.updateAddressbook(),
				addressinfo: me.updateAddressInfo()
			}
		},
		// 当前位置
		updateCurrPos: function(){
			var me = this
			var posHtml
			return geoUtil.getCurrReadablePos(function(geoData, status, xhr){
				var addressbook = me.addressbook
				var geoLocation = geoData.result.location
				var isFaved = addressbook && _.find(addressbook, function(addr){
					return addr.lng == geoLocation.lng && addr.lat == geoLocation.lng
				})

				var macroCompiledContext = {}
				tplFn(macroCompiledContext)
				var cbdLng = geoLocation.lng,
					cbdLat = geoLocation.lat,
					cbdName = geoData.result.formatted_address,
					shouldFav = !isFaved
				posHtml = macroCompiledContext.macro_located(cbdLng, cbdLat, cbdName, shouldFav, route).toString().trim()
			},function(xhr, errorType, error, code){
				var macroCompiledContext = {}
				tplFn(macroCompiledContext)
				posHtml = macroCompiledContext.macro_clicktogeo().toString().trim()
			}, {
				complete: function(){
					me._updatePosition(posHtml)
				}
			})
		},
		updateAddressInfo: function () {
			var me = this

			var addressInfo
			return ajax.getJSON(ajax.API_GET_ADDRESS_INFO, function (data) {
				addressInfo = data.data
			}, function () {
				addressInfo = {recommended_branches: [], cbd: [], address: []}
			}, {
				useCache: true,
				cacheType: ajaxCache.TYPE_ONLY_CACHE,
				cacheKey: [ajaxCache.ZONE_CBD, me.currCity.id],
				complete: function(xhr, status){
					var search = [], fav = []
					addressInfo.address && addressInfo.address.forEach(function (addr) {
						if(addr.is_favorite) fav.push(addr)
						else search.push(addr)
					})

					var macroCompiledContext = {}
					tplFn(macroCompiledContext)
					//var cbdHtml = macroCompiledContext.macro_body(addressInfo.cbd).toString().trim()
					//var recommendBranchHtml = macroCompiledContext.macro_cbd(addressInfo.recommended_branches).toString().trim()
					//var addressHtml = macroCompiledContext.macro_cbd(addressInfo.address).toString().trim()
					var searchBodyHtml = macroCompiledContext.macro_body(addressInfo.recommended_branches, addressInfo.cbd, fav, search).toString().trim()

					$('.search-body', me.node).html(searchBodyHtml)

					//$('.cbd', me.node).html(cbdHtml)
					//$('.branches', me.node).html(recommendBranchHtml)
					//
					//me._refreshAddressbook(addressInfo.address)
				}
			})
		},
		// 热门商圈
			/*
		updateCbd: function(){
			var me = this

			var cbd
			return ajax.getJSON(ajax.API_ZONE_CBD, {
				zone_id: me.currCity.id
			}, function(data){
				cbd = data.data
			}, function(){
				cbd = []
			}, {
				capture401AutoRedirect: true,
				useCache: true,
				cacheType: ajaxCache.TYPE_ONLY_CACHE,
				cacheKey: [ajaxCache.ZONE_CBD, me.currCity.id],
				complete: function(xhr, status){
					var macroCompiledContext = {}
					tplFn(macroCompiledContext)
					var html = macroCompiledContext.macro_cbd(cbd).toString().trim()

					$('.cbd', me.node).html(html)
				}
			})
		},
		// 个人收藏地址
		updateAddressbook: function(){
			var me = this
			var api = ajax.API_GET_ADDRESS_BOOK
			var success = function(data){
				me.addressbook = data.data
			}
			var error = function(){
				// code === 2000x 权限不足，需要登录
				me.addressbook = null
			}

			var complete = function(xhr, status){
				me._refreshAddressbook(me.addressbook || [])
			}

			if(userUtil.isLogin()){
				return ajax.getJSON(api, success, error, {
					capture401AutoRedirect: true,
					complete: complete
				})
			}
			else{
				return new ajax.FakeXHR({
					fakeData: {data: null},
					fakeTimeout: 0,
					success: success,
					complete: complete
				})
			}
		},
		*/
		_updatePosition: function(html){
			$('.position', this.node).html(html)
		},
		_refreshAddressbook: function(addressbook){
			var me = this
			var macroCompiledContext = {}
			tplFn(macroCompiledContext)

			var search = [], fav = []
			addressbook.forEach(function (addr) {
				if(addr.is_favorite) fav.push(addr)
				else search.push(addr)
			})
			var searchHtml = macroCompiledContext.macro_addressbook(search).toString().trim()
			var favHtml = macroCompiledContext.macro_addressbook(fav).toString().trim()

			$('.addressbook', me.node).html(favHtml)
			$('.search-history', me.node).html(searchHtml)
		},
		abort: function(){
			var me = this
			_.each(me.xhr, function(xhr){
				xhr.abort()
			})
		},
		onGeoClick: function(){
			var me = this

			var macroCompiledContext = {}
			tplFn(macroCompiledContext)
			var html = macroCompiledContext.macro_locating().toString().trim()

			me._updatePosition(html)

			me.xhr.currPos = me.updateCurrPos()
		},
		onPointClick: function(e){
			var node = $(e.currentTarget)
			var name = node.data('name')
			var lat = node.data('lat')
			var lng = node.data('lng')

			storage.set(storage.USING_ADDR, {
				address: name,
				lat: lat,
				lng: lng
			})

			navUtil.back()
		}
	},
	statics: {
		NAME: route.N.ADDR_SELECT
	}
})