var inherit = require('inherit')
var navUtil = require('navUtil')
var _ = require('_')
var Event = require('venders/emitter/Event')

// action 的格式必须是：
// 1. navUtil.back()
// 2. object.property.method("123",45,[1,2])
var ACTION = {
	navUtil: navUtil,
	location: location
}

function getActionMethod(arrOfProperty){
	function anonymous(arrOfProperty, host){
		if(!host) return false
		if(arrOfProperty.length === 0) return host
		var property = arrOfProperty.shift()
		return anonymous(arrOfProperty, host[property])
	}
	var method = arrOfProperty.pop()
	var host = anonymous(arrOfProperty, ACTION)

	if(!host || !host[method]) return false
	return {
		method: method,
		host: host
	}
}

var _open = false
var Action = inherit({
	name: 'Action',
	proto: {
		/**
		 *
		 * @param options {
		 *  actionType,
		 *  node,
		 *  listeners
		 *  delegate
		 *  selector
		 * }
		 * @private
		 */
		__constructor: function(options){
			if(!_open) throw '[ERROR] use the static method `add` insteadof the constructor.'
			var me = this

			me.options = options
			options.actionType = options.actionType || 'click'
			options.selector = options.selector || '[data-action]'

			var node = me.node = options.node
			me.listeners = options.listeners || {}

			me._onTap = _.bind(me.onTap, me)
			if(options.actionType == 'click'){
				if(options.delegate)
					node.on('click', options.selector, me._onTap)
				else
					node.on('click', me._onTap)
			}
		},
		onTap: function(e){
			var me = this,
				options = me.options,
				node,
				actionType = options.actionType
			if(options.delegate){
				if(actionType == 'click'){
					node = $(e.currentTarget)
				}
			}
			else{
				node = me.node
			}
			if(!node) return

			e.currentTargetNode = node
			excuteListeners(me.listeners.ontap, e)

			var action, m, navHref, host, method, args
			if((action = node.data('action')) && (m = action.match(/^([^\(]+)\((.*)\)$/))){
				var arrOfProperty = m[1].split('.')
				var args = JSON.parse('['+m[2]+']')
				var ac = getActionMethod(arrOfProperty)
				if(ac){
					host = ac.host, method = ac.method
				}
			}
			else if((method = node.data('nav-type')) && (navHref = node.data('nav-href'))){
				e.preventDefault()
				host = navUtil
				args = navHref && [navHref]
			}
			if(host && host[method]){
				var evt = new Event({
					target: node,
					next: function(){
						if(!evt.defaultPrevented){
							host[method].apply(host, args)
						}
					},
					srcEvent: e.srcEvent
				})
				excuteListeners(me.listeners.onbeforeaction, evt)
				if(!evt.asyncUsed){
					evt.next()
				}
			}
		},
		destroy: function(){
			var me = this
			if(me.options.actionType == 'click')
				me.node.off()
			delete me._onTap
			delete me.hammertime
			delete me.node
		}
	},
	statics: {
		addFromParentsNode: function(options){
			var me = this
			var actions = []
			$('[data-action]', options.nodeWrap).each(function(i, dom){
				options.node = $(dom)
				var action = me.add(options)
				actions.push(action)
			})
		},
		add: function(options){
			var action = options.node.data('action')
			if(action !== undefined || options.delegate){
				_open = true
				var action = new Action(options)
				_open = false
				return action
			}
			else return false
		},
		destroy: function(actions){
			if(!Array.isArray(actions)) actions = [actions]
			_.each(actions, function(action, i){
				if(action instanceof Action){
					action.destroy()
					delete actions[i]
				}
			})
		}
	}
})

function excuteListeners(listeners, evt){
	if(typeof listeners == 'function') return listeners(evt)
	listeners && listeners.forEach(function(listener){
		listener(evt)
	})
}


module.exports = Action