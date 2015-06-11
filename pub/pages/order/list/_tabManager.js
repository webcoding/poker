var route = require('route')
var TabManager = require('widgets/nav/TabManager')


var tabManager = new TabManager(TabManager.Type.NAVIGATION_BUTTON)
tabManager.addTabs([{
	text: '待评论',
	active: false,
	url: route.getRoute(route.R.ORDER_LIST, {type: route.ORDER_TYPE_TO_COMMENT})
}, {
	text: '已完成',
	active: false,
	url: route.getRoute(route.R.ORDER_LIST, {type: route.ORDER_TYPE_DONE})
}])

module.exports = tabManager