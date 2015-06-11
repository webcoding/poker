var route = require('route')
var storage = require('storage')
var inherit = require('inherit')
var url = require('url')

var NotInHistory = [route.N.LOGIN, route.N.REGISTER, route.N.RESET_PASSWORD, route.N.A_SM_REGISTER]

var pageHome = route.getPageHome()
var getCurrHref = function(){
	return location.href.substr(location.origin.length)
}

var History = inherit({
	name: 'History',
	proto: {
		__constructor: function(options){
			var me = this
			me.history = storage.get(storage.NAV_HISTORY) || []

			this.addPage()
		},
		addPage: function(){
			var me = this
			// 每次更换页面之前，记录一下之前的页面
			// 因为 localStorage 是按照域名来的（包括不同的二级域名），所以，存储的时候可以去掉域名
			var currHref = getCurrHref()
			var lastPage = me.history[me.history.length - 1]
			var isRefresh = currHref === lastPage
			// 每一个页面都先存起来
			if(!isRefresh) me._push(currHref)
		},
		reset: function(){
			this.history = []
			this._save()
		},
		ignoreCurrentPage: function(){
			var lastPage = this.history[this.history.length - 1]
			var lastRuleName = route.getRuleNameByPath(url.parseUrl(lastPage).pathname)
			var currentRuleName = route.getRuleNameByPath(url.parseUrl(location.href).pathname)
			if(lastRuleName == currentRuleName){
				this.pop()
			}
		},
		getLastPageByPermission: function(pop, needPermission, options){
			options = $.extend({
				needDefaultPage: false,
				filterFunc: function(pageHref, i, history, pageHrefObj, ruleName){
					return route.isPermission(route.P[ruleName], needPermission)
				}
			}, options)
			return this.getLastPage(pop, options)
		},
		getLastPageByRouteName: function(pop, _ruleName, options){
			options = $.extend({
				filterFunc: function(pageHref, i, history, pageHrefObj, ruleName){
					return ruleName === _ruleName
				}
			}, options)
			return this.getLastPage(pop, options)
		},
		// 目前来看，每次取的时候，100%是需要排除当前页面的，
		// 所以，就不需要 ignoreCurrentPage 这个参数了，全部已排除当前页面来操作
		/**
		 *
		 * @param pop
		 * @param options { needDefaultPage, filterCb }
		 * @returns {find|*}
		 */
		getLastPage: function(pop, options){
			options = $.extend({
				needDefaultPage: true,
				filterFunc: function(pageHref, i, history){
					return true
				}
			}, options)

			var r = this._find(options.filterFunc)
			// 如果最终没有找到 lastPage，就全部 pop 出来，没有错
			if(pop) this.pop(r.index)
			return r.find || (options.needDefaultPage ? pageHome : undefined)
		},
		_find: function(fn){
			var find, index, currHref = getCurrHref()
			this._each(function(pageHref, i, history){
				index = i
				if(currHref == pageHref) return
				var pageHrefObj = url.parseUrl(pageHref)
				var pathname = pageHrefObj.pathname
				var ruleName = route.getRuleNameByPath(pathname)
				if(fn(pageHref, i, history, pageHrefObj, ruleName)) {
					find = pageHref
					return false
				}
			})
			return {
				index: index,
				find: find
			}
		},
		_each: function(fn){
			for(var i = this.history.length - 1; i>=0; i--){
				if(fn(this.history[i], i, this.history) === false) break
			}
		},
		_save: function(){
			var me = this
			storage.set(storage.NAV_HISTORY, me.history)
		},
		// 入栈
		_push: function(href){
			var urlObj = url.parseUrl(href)
			var ruleName = route.getRuleNameByPath(urlObj.pathname)
			if(NotInHistory.indexOf(ruleName) == -1) {
				this.history.push(href)
				this._save()
			}
		},
		// 出栈
		pop: function(index){
			var len = this.history.length
			if(!len || index >= len) return
			// 默认pop最后一个
			if(index === undefined) index = len - 1

			var urls = this.history.splice(index)
			this._save()
			return urls.length === 1 ? urls[0] : urls
		}
	}
})
var history = new History

module.exports = history