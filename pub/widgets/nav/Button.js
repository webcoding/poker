var inherit = require('inherit')
var inheritUtil = require('venders/inherit/util')
var Action = require('modules/action/action')
var Be = require('modules/mixClass/Be')
//var IconType = require('widgets/nav/_TypeIcon')
//var tpl = require--('./nav.html')


// 7 箭头宽度
// 5 箭头左边距
var arrowWidth = 7 + 5
// 距离边框的宽度
var gapBorder = 5

var Button = inherit({
	name: 'AppNavButton',
	proto: inheritUtil.delegatePropertyMethod({
		__constructor: function (options) {
			var me = this

			me.sync2Title = options.sync2Title
			me.proportion = options.proportion
			me.nodeWrap = me.nodeIcon = options.node
			var dom = options.node[0]
			if(dom.nodeName.toLowerCase() !== 'a'){
				me.nodeInner = $('.inner', options.node)
				me.node = $('a', options.node)
			}
			else{
				me.nodeInner = me.node = me.nodeWrap
			}


			this.defaultHref = me.nodeInner.attr('href')

			me.listeners = {
				onbeforeaction: [],
				ontap: []
			}

			me.action = Action.add({
				node: me.nodeWrap,
				actionType: 'click',
				listeners: me.listeners
			})
		},
		actionNavTo: function(url){
			var me = this
			me.nodeData('action', 'navUtil.location("'+url+'")')
			return me
		},
		actionReplaceWith: function(url){
			var me = this
			me.nodeData('action', 'navUtil.replace("'+url+'")')
			return me
		},
		actionBack: function(url){
			var me = this
			var urlParam = url ? '"'+url+'"' : ''
			me.nodeData('action', 'navUtil.back(' + urlParam + ')')
			return me
		},
		actionBackToLastPagePermissionNotLogin: function(){
			var me = this
			me.nodeData('action', 'navUtil.backToLastPagePermissionNotLogin()')
			return me
		},
		actionBackToLastPagePermissionLogin: function(){
			var me = this
			me.nodeData('action', 'navUtil.backToLastPagePermissionLogin()')
			return me
		},
		//beIcon: function(TYPE){
		//	var me = this
		//	me._type = TYPE
		//	me.textShow().nodeAddClass(me._type)
		//	return me
		//},
		beTabContainer: function(tabManager){
			var me = this
			me.tabManager = tabManager
			me.node.append(me.tabManager.node)
			me.textShow()
			return me
		},
		addListener: function(key, val){
			this.listeners[key].push(val)
			return this
		},
		removeListener: function(key, val){
			var listeners = this.listeners[key]
			var index = listeners.indexOf(val)
			if(index >= 0){
				listeners.splice(index, 1)
			}
			return this
		},
		setText: function(text){
			this.text = text
			this.node.text(text)
			this.textShow()
			if(this.sync2Title) this.setTitle(text)
			this.onText && this.onText(text)
			return this
		},
		setTitle: function(title){
			document.title = title + '-' + imod.getConfig('appName')
			return this
		},
		setHref: function(href){
			this.nodeInner.attr('href', href)
			return this
		},
		restoreHref: function(){
			this.nodeInner.attr('href', this.defaultHref)
			return this
		},
		restoreAction: function(){
			this.nodeData('action', '')
			return this
		},
		restoreText: function(){
			var me = this
			var text = ''
			me.text = text
			me.node.text(text)
			return me
		},
		restoreTabManager: function(){
			var me = this
			if(me.tabManager){
				me.tabManager.restore()
				me.tabManager.node.remove()
				delete me.tabManager
			}
			return me
		},
		restoreAll: function(){
			var me = this
			me.restoreHref().restoreAction().restoreText().textHide().hideArrow().restoreTabManager().restoreIcon()

			if(me._type){
				me.nodeRemoveClass(me._type)
			}

			return me
		},
		addArrow: function(){
			if(this.isArrowShown) return this
			this.isArrowShown = true;
			this.nodeWrap.addClass('nav-item-arrow')
			return this
		},
		hideArrow: function(){
			if(!this.isArrowShown) return this
			this.isArrowShown = false;
			this.nodeWrap.removeClass('nav-item-arrow')
			return this
		},
		textShow: function(){
			if(this.isTextShow) return this
			this.isTextShow = true
			//this.node.show()
			this.nodeWrap.addClass('show')
			return this
		},
		textHide: function(){
			if(!this.isTextShow) return this
			this.isTextShow = false
			this.nodeWrap.removeClass('show')
			return this
		}
	}, [
		[
			'nodeWrap',
			[
				/*'hide', 'show', */
				['nodeOn','on'],
				['nodeData', 'data'],
				['nodeAddClass', 'addClass'],
				['nodeRemoveClass', 'removeClass']
			]
			, true]
//		, ['node', ['text'], true]
		, ['hammertime', [['hammerOn', 'on']], true]
	]),
	statics: {
		//Type: ButtonType
	}
})
Be.mixTo(Button)

module.exports = Button