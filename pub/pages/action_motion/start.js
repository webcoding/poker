var route = require('route')
var common = require('common')
var nav = require('nav')
var navUtil = require('navUtil')
var ajax = require('ajax')
var ajaxCache = require('modules/ajax/cache')
var detect = require('modules/common/detect')
var support = require('modules/common/support')
var url = require('url')
var storage = require('storage')
var Toast = require('toast')
var tplFn = require('templates/action_motion/start.content.html')
//var tplPagesFn = require--('templates/action_motion/start.pages.html')
var inherit = require('inherit')
var UserList = require('./_UserList')
//var loading = require--('loading')
var downTip = require('widgets/down-tip/down-tip')
var bridge = require('dwdBridge')
var Shake = require('shake')
var Audio = require('widgets/audio/audio')
var ServerDate = require('modules/sDate/date')

var currCity, usingAddr

var toast = Toast.getToast()

//var fakeDataEnter = require--('data/action_motion/enter')
//var fakeDataClaim = require--('data/action_motion/claim')
//var fakeDataGetItem = require--('data/action_motion/get_item')

var Status = {
	ERROR: 'error',
	// 已领取
	CLAIMED: 'claimed',
	// 摇到商品，锁定状态
	LOCKED: 'locked',
	// 尚未开始
	NOT_START: 'before begin',
	// 时间结束
	TIME_OVER: 'after end',
	// 机会用完
	LIFE_OVER: 'life over',
	// 奖品池空了
	ITEM_OVER: 'item over',
	// 正常
	NORMAL: 'normal'
}

var ActionNightMotionStart = inherit({
	name: 'ActionNightMotionStart',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			var me = this
			me.__base({
				doUpdateShareInfo: false
			})

			me.updateShareInfo(
					'你造吗~爱抢购今晚八点又要请客啦~',
					'一大波奖品来袭，一般人我不告诉TA，记得来玩哦~',
					'http://m.iqianggou.com/bundles/dwdweb/images/night_motion/shareimg.png',
					location.href
			)

			nav.btnCenter.setTitle('睡前摇')
			downTip.hide()
			nav.hide()

			usingAddr = storage.get(storage.USING_ADDR)
			currCity = storage.get(storage.CURR_CITY)

			me.canH5DeviceMotion = support.deviceMotion && detect.isHandheldDevice
			me.canAppMotion = detect.iqg
			me.canMotion = me.canAppMotion || me.canH5DeviceMotion

			//if(!me.canAppMotion){
				me.audio = new Audio({
					audioPath: 'audios/vibrate_01'
				})
				//window._audio = me.audio
			//}
			me._onMotion = $.proxy(me.onMotion, me)
		},
		onHide: function(){
			var me = this
			me.__base()

			nav.show()
		},
		onShouldUpdate: function(){
			var me = this
			var server_time
			var _data
			var error_msg

			me.xhr = ajax.getJSON(ajax.API_A_MOTION_ENTER, success, error, {
				//fakeData: fakeDataEnter,
				complete: complete
			})

			function success(data, status, xhr, code, args){
				var _status
				_data = data.data
				server_time = data.status.server_time
				me.serverDate = new ServerDate(server_time)

				if(_data.taken_order){
					_status = Status.CLAIMED
				}
				else if(_data.locked_item){
					_status = Status.LOCKED
				}
				else if(_data.start_time > server_time){
					_status = Status.NOT_START
				}
				else if(_data.end_time < server_time){
					_status = Status.TIME_OVER
				}
				else if(_data.left_times <= 0){
					_status = Status.LIFE_OVER
				}
				else{
					_status = Status.NORMAL
				}

				me.changeStatus(_status, _data, false)
			}

			function error(xhr, errorType, error, code, message){
				if(errorType !== 'abort'){
					//toast.show(message || '网络错误，请重试')
					var _status = Status.ERROR
					error_msg = message
					me.changeStatus(_status, {}, false)
				}
			}

			function complete(){
				// 已领取奖品，跳转到结果页
				if(me.status === Status.CLAIMED){
					return me.navToPageShare()
				}

				var html = tplFn($.extend({
					can_motion: me.canMotion,
					server_time: server_time,
					status: me.status,
					Status: Status,
					// 第一次正常进入时，不提示生命值文案
					show_life_text: me.status === Status.NORMAL ? false : true,
					error_msg: error_msg
				}, _data))

				me.node = $(html)
				me.nodeBtnClose = $('.close', me.node)

				me.onDomReady()

				// domReady 之后才能执行 pageReady
				me._pageReady()
			}

			return me
		},
		navToPageShare: function(){
			var me = this
			var qs = url.parseSearch()
			delete qs.remote

			// 除了remote 参数之外，所有的参数都传递到下一个页面
			var navParam = $.extend({
				order_id: me.orderId
			}, qs)

			navUtil.replace(route.getRoute(route.R.A_MOTION_SHARE, navParam))
		},
		onDomReady: function(){
			this.__base()

			bridge.hideNavigationBar({
				animation: true
			})
		},
		_pageReady: function(){
			this.userlist = new UserList({
				dom: $('.userlist .inner', this.node)[0]
			})
		},
		bindEvent: function () {
			var me = this
			me.__base()
			me.nodeBtnClaim = $('.btn-claim', me.node)
			me.nodeBox = $('.box', me.node)

			me.nodeBtnClaim.on('click', $.proxy(me.onBtnClaimClick, me))
			me.nodeBtnClose.on('click', $.proxy(me.onBtnCloseClick, me))

			// 添加摇一摇 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》
			me.bindMotion()
			// 添加摇一摇 》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》》
		},
		unbindEvent: function(){
			var me = this
			me.__base()

			me.nodeBtnClaim && me.nodeBtnClaim.off('click')
			me.nodeBtnClose && me.nodeBtnClose.off('click')

			me.unbindMotion()
		},
		bindMotion: function(){
			var me = this

			if(me.status == Status.NORMAL || (me.status == Status.LOCKED && me.leftTimes > 0)){
				if(me.canAppMotion){
					bridge.onMotion({complete: me._onMotion})
				}
				else if(me.canH5DeviceMotion){
					me.shakeEvent = new Shake({
						threshold: 15,
						timeout: 1000
					})
					me.shakeEvent.start()
					window.addEventListener('shake', me._onMotion, false);
				}
				// 同时点击图片也可以抽奖
				me.nodeBox.on('click', me._onMotion)
			}
		},
		unbindMotion: function(){
			var me = this

			if(me.canAppMotion){
				bridge.offMotion({complete: me._onMotion})
			}
			else if(me.shakeEvent){
				me.shakeEvent.stop()
				window.removeEventListener('shake', me._onMotion)
			}
			me.nodeBox && me.nodeBox.off('click')
		},
		onDestroy: function(){
			var me = this
			me.__base()
			me.userlist && me.userlist.destroy()
			if(me.audio){
				me.audio.destroy()
			}
		},
		setDatas: function(_data){
			var me = this

			if(_data.left_times) me.leftTimes = _data.left_times
			if(_data.start_time) me.startTime = _data.start_time
			if(_data.end_time) me.endTime = _data.end_time
			if(_data.locked_item) me.lockedItem = _data.locked_item
			if(_data.locked_item) me.poolId = _data.locked_item.pool_id
			if(_data.taken_order) me.order = _data.taken_order
			if(_data.taken_order) me.orderId = _data.taken_order.id
		},
		changeStatus: function(status, data, changePage){
			var me = this
			if(changePage === undefined) changePage = true
			me.status = status

			me.setDatas(data)
			if(changePage) {
				data.status = me.status
				data.Status = Status
				data.onlySubPage = true
				me._changePage(me.status, data)
			}
		},
		_changePage: function(pageName, data){
			var me = this

			me.unbindEvent()

			if(data.show_life_text === undefined) data.show_life_text = true
			var html = tplFn(data)

			$('.page-inner', me.node).html(html)
			me._pageReady()
			me.bindEvent()
		},
		// 领取奖品
		onBtnClaimClick: function(e){
			var me = this
			if(me._claiming) return

			//var pool_id = $('.item', me.node).data('pool-id')

			toast.show('领取中...', {
				notAutoHide: true
			})

			me._claiming = true
			me.xhr = ajax.postJSON(ajax.API_A_MOTION_CLAIM, {
				pool_id: me.poolId
			}, success, error, {
				//fakeData: fakeDataClaim,
				complete: function(){
					me._claiming = false
				}
			})

			function success(data, status, xhr, code, args){
				toast.hide()

				me.changeStatus(Status.CLAIMED, {
					taken_order: data.data
				}, false)

				me.navToPageShare()
			}
			function error(xhr, errorType, error, code, message){
				toast.show(message || '领取失败, 请重试')
			}
		},
		onBtnCloseClick: function(e){
			var me = this
			if(me.canAppMotion){
				bridge.pop()
			}
			else{
				navUtil.back()
			}
		},
		// 摇奖
		onMotion: function(responseData){
			var me = this
			if(me._isGettingItem) return

			var now = ServerDate.js2php(me.serverDate.now())
			// 已近结束了
			if(now >= me.endTime){
				me.changeStatus(Status.TIME_OVER, {})
				return
			}
			// 生命值用完了
			if(me.leftTimes <= 0){
				me.changeStatus(Status.LIFE_OVER, {})
				return
			}

			var canGetItem
			// click
			if(responseData.target){
				canGetItem = true
			}
			// motion
			else{
				if(responseData.status == 'success'){
					canGetItem = true
				}
			}
			if(canGetItem){
				me._isGettingItem = true
				toast.show('正在获取奖品...', {
					notAutoHide: true
				})
				bridge.vibrate({})
				me.audio && me.audio.play(2, 10)

				// TODO 城市和经纬度
				me.xhr = ajax.getJSON(ajax.API_A_MOTION_GET_ITEM, {
					zone_id: currCity.id,
					lng: usingAddr.lng,
					lat: usingAddr.lat
				}, success, error, {
					//fakeData: fakeDataGetItem,
					complete: complete
				})
			}

			function success(data, status, xhr, code, args){
				me.lockedItem = data.data
				toast.hide()

				var lockedItem = data.data
				// 奖品池已经抢完了
				if(code == ajax.Type.CODE_SUCCESS_EMPTY){
					me.changeStatus(Status.ITEM_OVER, {})
				}
				// 抢到一个
				else{
					me.changeStatus(Status.LOCKED, {
						locked_item: lockedItem,
						left_times: me.leftTimes - 1,
						start_time: me.startTime,
						end_time: me.endTime,
						can_motion: me.canMotion
					})
				}
			}

			// 比如已经结束啦／还没开始／有太多未去线下兑换的奖品 等等
			function error(xhr, errorType, error, code, message){
				toast.show(message)
			}

			function complete(){
				//me.leftTimes--
				me._isGettingItem = false
			}
		}
	},
	statics: {
		NAME: route.N.A_MOTION_START
	}
})