var url = require('url')
var inherit = require('inherit')
var tplFn = require('./original-web.html')
var loading = require('loading')

var query

var IFrameContent = inherit({
	name: 'IFrameContent',
	base: require('PageViewController'),
	proto: {
		onShow: function(){
			var me = this
			me.__base()

			query = url.parseSearch()

			me.node = $(tplFn({
				urlIFrame: query.url
			}))
			me.onIframeLoad = $.proxy(me._onIframeLoad, me)

			me.nodeIframe = $('iframe', me.node)
			me.domIframe = me.nodeIframe[0]

			loading.show()
			// 不能使用 iframe.onload，因为 iframe 会加载JS/CSS/IMAGE 等，onload事件非常晚
			me.intervalId = setInterval(function(){
				// 同域
				try{
					if(me.domIframe.contentDocument.readyState === 'complete'){
						onReady()
					}
				}
				// 跨域
				catch (e){
					onReady()
				}
			}, 50)

			function onReady(){
				// 之所以要延迟200毫秒，是因为，readyState 触发到页面出现，一般也需要一段时间
				setTimeout(function(){
					me.onIframeLoad()
				}, 300)
			}

			me.onDomReady()
		},
		_onIframeLoad: function(){
			var me = this
			loading.hide()
			clearInterval(me.intervalId)
		}
	},
	statics: {
		stopParentInheritEvent: true,
		onAfterInherit: function(SubClass){
			this.__base(SubClass)
		}
	}
})

module.exports = IFrameContent