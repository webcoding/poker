var route = require('route')
var common = require('common')
var commonUtil = require('commonUtil')
var nav = require('nav')
var navUtil = require('navUtil')
var ajax = require('ajax')
var Toast = require('toast')
var tplFn = require('templates/item/detail.content.html')
var tplMainInfoFn = require('templates/item/detail.maininfo.html')
var storage = require('storage')
var inherit = require('inherit')
var _ = require('_')
var userUtil = require('modules/user/util')
var ajaxCache = require('modules/ajax/cache')
var loading = require('loading')
var Modal = require('widgets/overlay/modal')
var ActionSheet = require('widgets/overlay/actionsheet')
var url = require('url')
var nunjucksFilter = require('nunjucksFilter')
var PicSwiper = require('widgets/picswiper/picswiper')
var FixMainInfo = require('./_FixMainInfo')
var history = require('modules/nav/history')
var Type = require('pages/item/list/_itemType')
var Countdown = require('./_Countdown')
var bargainManager = require('./_bargainManager')
var du = require('baiduTongji')

var itemDetail
var params
var itemId
var itemType
var qs, isNeedHelpBargain
var itemCountdownPrice
var picswiper

var toast = Toast.getToast()
var confirmModal, helpActionsheet

var ItemDetail = inherit({
	name: 'ItemDetail',
	base: require('PageViewController'),
	proto: {
		/**
		 *
		 * @param options
		 * {
		 *  nodeWrap {Node}
		 *  onDomReady {()=>void}
		 * }
		 * @private
		 */
		onShow: function(){
			this.__base()

			du.customVar(du.CustomIndex.PAGE, du.CustomName.PAGE, du.CustomValue.PAGE_ITEM_DETAIL, du.CustomScope.PAGE)

			itemDetail = this

			params = route.getPathParam(route.R.ITEM_DETAIL)
			qs = url.parseSearch()
			itemId = params.item_id

			itemType = qs.type || route.ITEM_TYPE_BARGAIN
			isNeedHelpBargain = qs.help == '1'

			nav.btnCenter.setText('商品详情')
			nav.btnLeft.setText('返回')

			if(isNeedHelpBargain && !bargainManager.isBargained(itemId)){
				updateHelpActionsheet()
				helpActionsheet.show()
			}

			updateItemType(itemType)

			this.itemId = itemId
			this.itemType = itemType
		},
		onHide: function(){
			var me = this
			me.__base()

			if(picswiper){
				picswiper.hide()
				picswiper = null
			}
		},
		onShouldUpdate: function(){
			var me = this

			loading.show()
			//return
			me.xhr = ajax.getJSON(ajax.API_ITEM_DETAIL, {
				id: me.itemId
			}, success, error, {
				useCache: true,
				cacheType: ajaxCache.TYPE_STILL_LOAD,
				cacheKey: [ajaxCache.ITEM_DETAIL, me.itemId],
				complete: function(){
					loading.hide()
				}
			})

			function success(data, status, xhr, code, args){
				var itemData = data.data
				me.itemData = itemData
				me.sc_diff_milli = data.status.server_time * 1000 - Date.now()

				var correctItemType = me.itemData.type === 3 ? route.ITEM_TYPE_COUNTDOWN : route.ITEM_TYPE_BARGAIN

				if(me.itemType != correctItemType){
					me.itemType = correctItemType
					updateItemType(correctItemType)
				}

				me.isTypeCountdown = me.itemType === route.ITEM_TYPE_COUNTDOWN

				// 如果没有从列表页把价钱传过来（比如新 webview 直接打开的这个页面）
				// 就重新实例化一个 Countdown，然后计算当前价钱
				if(me.isTypeCountdown && !itemCountdownPrice){
					updateItemCountdownPrice(me.getCountdown().currPrice(), true)
				}

				me.updateView(null, args)
			}
			function error(xhr, errorType, error, code, message){
				if(errorType == 'abort') return
				toast.show(message || '网络请求失败了，请亲重试下吧~')
			}
			return this
		},
		updateView: function(itemData, args){
			var me = this
			if(itemData) me.itemData = itemData

			var serverNow = (Date.now() + me.sc_diff_milli) / 1000
			var tplData = {
				item: me.itemData
				, itemId: me.itemId
				, isTypeCountdown: me.isTypeCountdown
				, route: route
				, winWidth: $(window).width()
				, Type: Type
				, serverNow: serverNow
			}

			if(me.isTypeCountdown){
				tplData.current_price = itemCountdownPrice
			}

			if(args && args.execute_time === 0){
				var html = tplFn(tplData)
				me.node = $(html)
				me.nodeMainInfo = $('.main-info', me.node)

				me.shop = me.itemData.branches[0]

				me.onDomReady()
			}
			// 只更新价格、是否还可以抢购等信息即可
			else{
				var mainInfo = tplMainInfoFn(tplData)
				$('.main-info', me.node).html(mainInfo)
			}
			return me
		},
		getCountdown: function(){
			var me = this
			if(!me._countdown){
				me._countdown = new Countdown({
					data: me.itemData,
					sc_diff_milli: me.sc_diff_milli
				})
			}
			return me._countdown
		},
		createOrder: function(cb){
			var me = this
			var data = {
				item_id: me.itemId,
				// openid 和 operid 是wifi万能钥匙需要的
				openid: qs.openid,
				operid: qs.operid
			}
			if(me.itemType == route.ITEM_TYPE_COUNTDOWN){
				data.price = itemCountdownPrice
			}
			ajax.postJSON(ajax.API_ORDER_CREATE, data, cb, function(xhr, errType, err, code, message){
				toast.show(message || '下订单失败，请亲重试下吧～', {
					ms: 3000
				})
			})
		},
		bindEvent: function(){
			var me = this, itemData = me.itemData
			me.__base()

			var shareTitle = '最低￥1.00拿走'+itemData.name+','+itemData.branches[0].name
			var shareDesc = itemData.branches[0].address + ',' + itemData.branches[0].tel
			me.updateShareInfo(shareTitle, shareDesc, itemData.images[0], location.href)

			me.onBtnBuyClick = _.bind(me._onBtnBuyClick, me)
			me.onShopMoreClick = _.bind(me._onShopMoreClick, me)
			me.onImgClick = _.bind(me._onImgClick, me)
			// 因为上面 update.success 第二次只更新 mainInfo，且不会再次 bindEvent
			// 所以，这里要用委托方式绑定事件
			$(me.nodeMainInfo).on('click', '.btn-buy', me.onBtnBuyClick)
			$('.shop .btn-more a', me.node).on('click', me.onShopMoreClick)
			$('.imgs', me.node).on('click', 'li', me.onImgClick)

		},
		unbindEvent:function(){
			var me = this
			me.__base()
			$('.btn-buy', me.node).off('click', me.onBtnBuyClick)
			$('.shop .btn-more a', me.node).off('click', me.onShopMoreClick)
		},
		onDestroy: function(){
			var me = this
			me.__base()
			me.fixMainInfo && me.fixMainInfo.destroy()
			//delete me.picswiper
		},
		doBuy: function(){
			var me = this
			toast.show('正在下订单...', {
				notAutoHide: true
			})

			me.createOrder(function(data){
				storage.set(storage.ORDER_CREATED_TS, Date.now())
				storage.set(storage.ORDER_CREATED, data.data)

				// 去支付/购买页面
				var urlBuy = route.getRoute(route.R.ORDER_PAY, {
					order_id: data.data.id,
					item_id: me.itemId
				})
				toast.hide()
				navUtil.location(urlBuy)
			})
			return me
		},
		onDomReady: function(){
			this.__base()
			this.fixMainInfo = new FixMainInfo({
				nodeWrap: $('.item-detail-wrap', this.node)
			})
		},
		onCountdownTick: function(currPrice){
			var me = this
			//console.log(currPrice)
			currPrice = nunjucksFilter.rmb(nunjucksFilter.formatPrice(currPrice))
			$('.main-info strong', me.node).text(currPrice)
		},
		_onBtnBuyClick: function(e){
			var me = this
			if(userUtil.isLogin()){

				//
				if(me.itemType == route.ITEM_TYPE_COUNTDOWN && me.itemData.start_price == itemCountdownPrice){
					var countdown = me.getCountdown()
					// 特殊情况
					// 本来进来的时候降价尚未开始，但是点击抢购按钮的时候，已经开始降价了
					// 此时，自动降价到当前价钱
					if(countdown.status == Countdown.Status.STARTED){
						// 先自动降价
						updateItemCountdownPrice(countdown.currPrice(), true)
						// 再下订单
						me.doBuy()
					}
					//
					else{
						updateConfirmModal(commonUtil.formatTime(me.itemData.countdown_start_time, 'hh:mm'))
						confirmModal.once('click', function(e){
							confirmModal.hide()

							if(e.index == 0){
								me.doBuy()
							}
						}).show()
					}
				}
				else{
					me.doBuy()
				}
			}
			else{
				navUtil.location(route.getRoute(route.R.REGISTER))
			}
		},
		_onShopMoreClick: function(e){
			var me = this
			storage.set(storage.ITEM_SHOPS, {
				item_id: me.itemId,
				shops: me.itemData.branches
			})
		},
		_onImgClick: function(e){
			var me = this
			var li = $(e.currentTarget)
			var index = li.index()

			if(!picswiper){
				picswiper = new PicSwiper({
					currentIndex: index,
					images: me.itemData.images
				})
			}
			picswiper.moveTo(index).show()
		}
	},
	statics: {
		NAME: route.N.ITEM_DETAIL
	}
})

function updateConfirmModal(startTime){
	if(!confirmModal){
		confirmModal = new Modal().addButtons([{
			text: '任性抢购'
		},{
			text: '等会再来'
		}])
	}
	return confirmModal.setTitle('自动降价'+startTime+'才开始呢<br>您现在将以原价购买哦~')
}

function updateHelpActionsheet(){
	if(!helpActionsheet){
		helpActionsheet = new ActionSheet([{
			text: '帮我砍价',
			label: true,
			bold: true
		}, {
			text: '(☆_☆)这个东西真的很赞哟，帮我砍砍价，我就出手喽~',
			label: true
		}, {
			text: '嗯，帮忙砍价',
			onClick: function(e){

				toast.show('正在砍价...', {
					notAutoHide: true
				})

				ajax.postJSON(ajax.API_ITEM_DO_BARGAIN, {
					id: itemId
				}, function(data, status, xhr, code, args){
					bargainManager.bargain(itemId)

					itemDetail.updateView(data.data.item)

					toast.show(data.status.alert)
				}, function(xhr, errorType, error, code, message){
					// 已经砍过价了
					if(code == 14002){
						bargainManager.bargain(itemId)
					}
					toast.show(message || '帮砍价失败...')
				}, {
					complete: function(){
						helpActionsheet.hide()
					}
				})
			}
		}, {
			text: '太忙没空..',
			onClick: function(){
				helpActionsheet.hide()
			}
		}])
	}
	return helpActionsheet
}


function updateItemType(itemType){
	if(itemType === route.ITEM_TYPE_BARGAIN){
		nav.btnRight.setText('优惠点').actionNavTo(route.getRoute(route.R.DOWNLOAD, {
			from: route.DOWNLOAD_FROM_PREFERENTIAL,
			item_id: itemId
		}))
		nav.btnLeft.actionBack(history.getLastPageByRouteName(false, route.N.ITEM_LIST_BARGAIN))
	}
	else if(itemType === route.ITEM_TYPE_COUNTDOWN){
		var __ = storage.get(storage.ITEM_COUNTDOWN_PRICE)
		updateItemCountdownPrice((__ && __.id == itemId) ? __.price : null)

		nav.btnRight.textHide()
		nav.btnLeft.actionBack(route.getRoute(route.R.ITEM_LIST_COUNTDOWN))
	}
}

function updateItemCountdownPrice(price, doStore){
	if(price){
		itemCountdownPrice = price
		doStore && storage.set(storage.ITEM_COUNTDOWN_PRICE, {
			id: itemId,
			price: price
		})
	}
}