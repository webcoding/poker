// 每一个页面 View 所必须集成

var inherit = require('inherit')
var userUtil = require('modules/user/util')
var du = require('baiduTongji')
var detect = require('modules/common/detect')
var nav = require('nav')
var toast = require('toast').getToast()
var loading = require('loading')
var move = require('venders/move/move')
//var IScroll = require--('venders/iscroll/iscroll')

var tplViewControllerFn = require('./_viewcontroller.html')
var manager = require('./PageViewControllerManager').getInstance()
//var PageStatus = require--('./_PageStatus')
var wechat = require('modules/wechat/wechat')
var app = require('modules/common/app')

var nodeBody = app.body//$('body')
var nodeWrap = app.main//$('#main')

var SCROLL_TOP_TYPE = require('./_TypeScrollTop')

var defaultShareInfo = {
	title : '『爱抢购』一个价格你做主的APP',
	desc  : '全球首创砍价App，自己砍价不过瘾，呼朋唤友一起砍。 身边万家品牌商户随便砍，真的可以砍到底！ 1块钱就能吃快餐,喝咖啡,看电影,做SPA,日用商品也搞定。 好玩还能挣金币，吃喝玩乐都搞定！',
	link  : 'http://m.iqianggou.com',
	imgUrl: 'http://m.iqianggou.com/bundles/dwdweb/images/logo_f_80.jpg'
}

var pageSwitchDuration = 500

var __pageId = 1
function generatePageId(){ return __pageId++ }

var pages = {}

var PageViewController = inherit({
	name: 'PageViewController',
	proto: {
		__constructor: function(){
			this.__pageId = generatePageId()

			this.onCreate()
		},
		onCreate: function(){
			this._nodeContainer = $(tplViewControllerFn({
				routeName: this.__self.NAME
			}))
			this._domContainer = this._nodeContainer[0]
			nodeWrap.append(this._nodeContainer)
		},
		onShow: function(options){
			options = $.extend({
				doUpdateShareInfo: true
			}, options)

			//
			app.document.title = this.config.title + '-' + imod._config.appName

			//$.extend(this, options)
			//delete this.doUpdateShareInfo// 这个字段不要挂在到 this 上

			wechat.newPage({
				url: this.pageRouter.href.split('#')[0]
			})

			if(this.__self.scrollTopType === SCROLL_TOP_TYPE.ZERO){
				this._nodeContainer.scrollTop(0)
			}

			if(options.doUpdateShareInfo)
				this.updateShareInfo(defaultShareInfo.title, defaultShareInfo.desc, defaultShareInfo.imgUrl, defaultShareInfo.link)

			var customValue = userUtil.isLogin() ? du.CustomValue.LOGGED_YES : du.CustomValue.LOGGED_NO
			du.customVar(du.CustomIndex.LOGGED, du.CustomName.LOGGED, customValue, du.CustomScope.LOG)
			du.customVar(du.CustomIndex.HOST, du.CustomName.HOST, detect.host, du.CustomScope.HOST)
			du.customVar(du.CustomIndex.PLATFORM, du.CustomName.PLATFORM, detect.platform, du.CustomScope.PLATFORM)
			du.trackPage(this.pageRouter.href)
		},
		onShouldUpdate: function(){},
		onHide: function(){
			var me = this
			me.node && me.node.hide()
			toast.hide()
			loading.hide()
			nav.restore()
			me.abort()
			//me.onDestroy()
		},
		onDestroy: function(){
			var me = this
			me.unbindEvent()
			me._nodeContainer.remove()
			delete me.node
		},
		updateShareInfo: function(title, desc, imgUrl, link, success){
			if(title)   this.shareTitle   = title
			if(desc)    this.shareDesc    = desc
			if(imgUrl)  this.shareImgUrl  = imgUrl
			if(link)    this.shareLink    = link
			if(success) this.shareSuccess = success

			this._bindWechatShare()
		},
		_bindWechatShare: function(){
			var me = this

			var shareData = {
				title: me.shareTitle,
				desc: me.shareDesc,
				link: me.shareLink,
				imgUrl: me.shareImgUrl
			}
			if(me.shareSuccess) shareData.success = me.shareSuccess
			wechat.onMenuShare(shareData)
		},
		bindEvent: function(){

		},
		unbindEvent: function(){

		},
		abort: function(){
			var me = this
			me.xhr && me.xhr.abort()
		},
		addNode: function(node){
			this._nodeContainer.append(node)
			return this
		},
		setConfig: function (config) {
			this.config = config
			return this
		},
		empty: function(){
			this._nodeContainer.empty()
			return this
		},
		getNodeContainer: function(){
			return this._nodeContainer
		},
		bePageStatus: function(pageStatus){
			this.pageStatus = pageStatus
			this._nodeContainer.attr('class', pageStatus)
			return this
		},
		onAfterUpdate: function(){
			var me = this
			me.scrollTo()
			return me
		},
		/**
		 *
		 * @param readyTime 尽量不要使用，有时间处理的话，还是在 update 内管理
		 */
		onDomReady: function(readyTime){
			var me = this
			me.bindEvent()
			//var isFirstTime = readyTime === undefined || readyTime === 0
			//if(isFirstTime){
			//	nodeWrap.append(me.node)
			//}
			//else{
			//	//me.setScrollTop(SCROLL_TOP_TYPE.CURRENT_POSITION)
			//	nodeWrap.empty().append(me.node)
			//	//me.scrollTo()
			//}
			me.empty().addNode(me.node)

			// 调用 onDomReady 之前，必须有 node
			me.node.show()
			//me.iscroll = new IScroll(this._domContainer)

			me.onAfterUpdate()
		},
		/**
		 *
		 * @param scrollTop {Number || String}
		 * @returns {PageController}
		 */
		setScrollTop: function(scrollTop){
			var tmp
			if(isNaN(tmp = parseFloat(scrollTop))){
				var scrollTopType = typeof scrollTop === 'string' ? scrollTop : this.__self.scrollTopType
				scrollTop = scrollTopType === SCROLL_TOP_TYPE.ZERO ? 0 :
						(scrollTopType === SCROLL_TOP_TYPE.LAST_TIME || scrollTopType === SCROLL_TOP_TYPE.CURRENT_POSITION) ? nodeBody.scrollTop() :
								this.scrollTop
			}
			else scrollTop = tmp
			if(scrollTop !== this.scrollTop){
				this.scrollTop = scrollTop
			}
			return this
		},
		scrollTo: function(scrollTop){
			if(scrollTop === undefined){
				scrollTop = this.scrollTop || 0
			}
			nodeBody.scrollTop(scrollTop)
			this.setScrollTop(scrollTop)
			return this
		},
		setPageRouter: function(pageRouter){
			this.pageRouter = pageRouter
		},

		moveToPrepareToCome: function(callback){
			move(this._domContainer)
					.x(getWinWidth())
					.duration(0)
					.end(callback)
		},
		animateToPresent: function(callback){
			move(this._domContainer)
					.x(0)
					.duration(pageSwitchDuration)
					.end(callback)
		}
	},
	statics: {
		scrollTopType: SCROLL_TOP_TYPE.ZERO,
		getViewByRouteName: function(routeName){
			return pages[routeName]
		},
		//onBeforeInherit: function(SubClass){},
		onAfterInherit: function(SubClass){
			var routeName = SubClass.NAME
			if(!routeName) throw '[ERROR] Page View Class should have a NAME.'

			pages[routeName] = new SubClass
		}
	}
})

function getWinWidth(){
	return $(window).width()
}

module.exports = PageViewController