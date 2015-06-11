var inherit = require('inherit')
var route = require('route')
var _ = require('_')
var viewControllerManager = require('./PageViewControllerManager').getInstance()
var pageCheck = require('modules/common/pageCheck')
//var history = require--('modules/nav/history')

var STATUS = {
	INIT: 1,
	MAIN_MODULE: 2,
	PAGE_DONE: 3
}

var routeControllers = {}

var fakeRouteController
var PageRouteController = inherit({
	name: 'PageRouteController',
	proto: {
		__constructor: function(options){
			$.extend(this, options)

			this.status = STATUS.INIT
			this.isHide = true
			this.available = true

			this.isShowCalled = false

			if(!this.routeName) this.routeName = route.getRuleNameByPath(this.pathname)

			routeControllers[this.routeName] = this
		},
		update: function(options){
			$.extend(this, options)
		},
		setMainModule: function(mainModuleID){
			this.mainModule = imod.parseModuleName(mainModuleID, true).name
			this.status = STATUS.MAIN_MODULE
			return this
		},
		setViewController: function(viewController){
			this.viewController = viewController
			viewController.setPageRouter(this)
			return this
		},
		isDone: function(){
			return this.status == STATUS.PAGE_DONE
		},
		done: function(){
			this.status = STATUS.PAGE_DONE

			return this
		},
		json: function(){
			var json = {}
			var me = this
			var jsonKeys = ['pathname','routeName']

			jsonKeys.forEach(function(key){
				json[key] = me[key]
			})
			return json
		},
		hide: function(toRouteController){
			var me = this
			if(me.isHide) return
			me.isHide = true

			if(me.viewController){
				me.viewController.onHide(toRouteController)
			}
		},
		show: function(fromRouteController, callback){
			var me = this
			if(!me.isHide) return
			me.isHide = false

			pageCheck(me.routeName, function(available){
				if(me.available = available){
					me.isShowCalled = true

					if(me.viewController){
						me.viewController.onShow(fromRouteController)
						// 网络请求更新本页面
						me.viewController.onShouldUpdate()

						callback && callback()
					}
				}
			})
		}
	},
	statics: {
		usingRouteController: null,
		STATUS: STATUS,
		use: function(routeController){
			var me = this
			//var routeName = routeController.routeName
			//// controller
			//if(pathname instanceof PageRouteController) routeName = pathname.routeName
			//// pathname
			//else routeName = route.getRuleNameByPath(pathname)

			var twoTimesBeforeUsingRouteController = me.prevUsingRouteController
			me.prevUsingRouteController = me.usingRouteController
			if(me.prevUsingRouteController && me.prevUsingRouteController.viewController)
				me.prevUsingRouteController.viewController.setScrollTop()

			me.usingRouteController = routeController//routeControllers[routeName]
			// 先把所有需要 hide 的给隐藏掉
			//_.each(routeControllers, function(routeController){
			//	if(routeController !== me.usingRouteController)
			//		routeController.hide({
			//			nextController: me.usingRouteController
			//		})
			//})

			//if(me.prevUsingRouteController){
			//	me.prevUsingRouteController.hide({
			//		nextController: me.usingRouteController
			//	})
			//}

			//// 如果两个页面使用同一个 PageController，则，先隐藏之前的页面，最后显示将要使用的 页面
			//if(me.usingRouteController === prevUsingRouteController){
			//	prevUsingRouteController.hide({
			//		nextController: me.usingRouteController
			//	})
			//}

			//// 然后执行 show
			//me.usingRouteController.show({
			//	prevController: me.prevUsingRouteController
			//})
			
			viewControllerManager.forwardToFrom(me.usingRouteController, me.prevUsingRouteController, twoTimesBeforeUsingRouteController)
		},
		/**
		 *
		 * @param moduleId || module
		 * @returns {*}
		 */
		getControllerByModule: function(moduleId){
			if(typeof moduleId !== 'string') moduleId = moduleId.id
			var routeController = _.find(routeControllers, function(routeController){ return routeController.mainModule == moduleId })
			return routeController || fakeRouteController
		},
		getControllerByOptions: function(options){
			var routeName = route.getRuleNameByPath(options.pathname)
			var routeController = routeControllers[routeName]

			if(routeController){
				if(options.href != routeController.href) routeController.update(options)
				return routeController
			}
			else{
				options.routeName = routeName
				return new PageRouteController(options)
			}
		}
	}
})
var FakeRouteController = inherit({
	name: 'FakeRouteController',
	base: PageRouteController,
	proto: {
		__constructor: function(){
			this.fake = true
			this.isStartPage = true
			this.listeners = {
				hide: [],
				show: [],
				fastshow: []
			}
		}
	}
})
fakeRouteController = new FakeRouteController

module.exports = PageRouteController