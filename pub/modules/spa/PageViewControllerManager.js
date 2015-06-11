var inherit = require('inherit')
//var move = require--('venders/move/move')
var PageStatus = require('./_PageStatus')

//window.move = move

var noAnimation = true
var ins
var PageViewControllerManager = inherit({
	name: 'PageViewControllerManager',
	proto: {
		__constructor: function(){
		},
		forwardToFrom: function(toRouteController, fromRouteController, prevStepFromRouteController){

			if(prevStepFromRouteController)
				prevStepFromRouteController.viewController.bePageStatus(PageStatus.NORMAL)

			// 先隐藏，再显示
			fromRouteController && fromRouteController.hide(toRouteController)

			if(noAnimation){
				toRouteController.show(fromRouteController, afterToRouteControllerPresent)
			}
			//else if(!fromRouteController || fromRouteController === toRouteController){
			//	toRouteController.show(afterToRouteControllerPresent)
			//}
			//else{
			//	toRouteController
			//			.viewController
			//			.bePageStatus(PageStatus.PRESENT_IS_COMING)
			//			.moveToPrepareToCome(function(){
			//				toRouteController.show(function(){
			//					toRouteController
			//							.viewController
			//							.animateToPresent(afterToRouteControllerPresent)
			//				})
			//	})
			//}

			function afterToRouteControllerPresent(){
				toRouteController.viewController.bePageStatus(PageStatus.PRESENT)
				if(fromRouteController){
					fromRouteController.viewController.bePageStatus(PageStatus.PREV_PRESENT)
				}
			}
		},
		backToFrom: function(toRouteController, fromRouteController){

		},
		changeToFrom: function(toRouteController, fromRouteController){

		}
	},
	statics: {
		getInstance: function(){
			return ins || (ins = new PageViewControllerManager)
		}
	}
})

module.exports = PageViewControllerManager