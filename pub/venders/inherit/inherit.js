/**
 * Inheritance plugin
 *
 * Copyright (c) 2010 Filatov Dmitry (dfilatov@yandex-team.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * @source: https://raw.github.com/dfilatov/jquery-plugins/master/src/jquery.inherit/jquery.inherit.js
 *          https://github.com/dfilatov/jquery-plugins/tree/master/src/jquery.inherit
 *
 * @modified   peic@ctrip.com
 * @modify     delete the compatible codes, only for the mordern mobile browsers
 *
 * @git        https://github.com/peichao01/inherit.js/blob/master/inherit.js
 *
 * @dependencies: none
 *
 * @version 1.3.6
 */
(function(global){
	var parentName = '__base', constructorName = '__constructor', ClassName = '__self',
		eachObj = function (list, iterator) { for (var key in list) if (list.hasOwnProperty(key)) iterator(key, list[key]) },
		isFunction = function(fn){return Object.prototype.toString.call(fn)==='[object Function]'},
		extend = function (target, source) { eachObj(source, function (name, value) { target[name] = value }); return target },
		emptyBase = function () { };
	function override(base, result, add){
		eachObj(add, function (name, prop){
			if (isFunction(prop) && prop.toString().indexOf('.'+parentName) > -1){
				var baseMethod = base[name] || function() {};
				result[name] = function() {
					var baseSaved = this[parentName];
					this[parentName] = baseMethod;
					var result = prop.apply(this, arguments);
					this[parentName] = baseSaved;
					return result;
				};
			} else {
				result[name] = prop;
			}
		});
	}
	/**
	* @param {Object}   proto     -- instance/prototype member of Class
	* @param {Function} [base]    -- BaseClass
	* @param {String}   [name]    -- ClassName
	* @param {Object}   [statics] -- static member of Class
	*/
	function inherit(options) {
		var base = options.base || emptyBase,
			proto = options.proto || {},
			result = (proto[constructorName] || (options.base && base.prototype[constructorName]))
					? new Function("return function " + (options.name || "") + "(){this." + constructorName + ".apply(this, arguments)}")()
					: function () { };

		if(base.onBeforeInherit && !result.stopParentInheritEvent) base.onBeforeInherit(result)

		if(!options.base) {
			result.prototype = proto;
			result.prototype[ClassName] = result.prototype.constructor = result;
			extend(result, options.statics);
			addMethods(result)
		}
		else{
			var basePtp = base.prototype, resultPtp = result.prototype = Object.create(basePtp);
			resultPtp[ClassName] = resultPtp.constructor = result;

			extend(result, base);//copy the static member from base to result
			override(basePtp, resultPtp, proto);//override prototype member
			options.statics && override(base, result, options.statics);//override static member

			result[parentName] = options.base || null
			addMethods(result)
		}

		if(base.onAfterInherit && !result.stopParentInheritEvent) base.onAfterInherit(result)

		return result;
	};

	function addMethods(result){
		result.IsSubClassOf = IsSubClassOf
		return result
	}

	function IsSubClassOf(ParentClass){
		var isSubClass, parentClass = this[parentName]
		while(parentClass){
			if(parentClass == ParentClass){
				isSubClass = true
				break
			}
			parentClass = parentClass[parentName]
		}
		return isSubClass
	}
	
	module.exports = inherit;
})(this);