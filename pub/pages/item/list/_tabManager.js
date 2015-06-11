var route = require('route')
var TabManager = require('widgets/nav/TabManager')


var tabManager = new TabManager(TabManager.Type.NAVIGATION_BUTTON)
tabManager.addTabs([{
	text: '往下拍',
	active: false,
	url: route.getRoute(route.R.ITEM_LIST_BARGAIN)
}, {
	text: '倒计时',
	active: false,
	url: route.getRoute(route.R.ITEM_LIST_COUNTDOWN)
}])

module.exports = tabManager