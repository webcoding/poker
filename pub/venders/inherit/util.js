var _ = require('_');

// 将对象属性的方法代理到对象自身
exports.delegatePropertyMethod = function (source, propertyName, methods, isOnPrototype) {
	if(Array.isArray(propertyName)){
		var listToDelegate = propertyName;
		_.each(listToDelegate, function (delegate) {
			exports.delegatePropertyMethod(source, delegate[0], delegate[1], delegate[2]);
		});
	}
	else{
		_.each(methods, function (method) {
			var isArray = $.isArray(method);

			// 顺序和参数的顺序相同
			var distMethod = isArray ? method[0] : method,
				srcMethod = isArray ? method[1] : method;
			source[distMethod] = function () {
				var cxt = isOnPrototype ? this : source, o = cxt[propertyName];
				var result = o[srcMethod].apply(o, arguments);
				return result === o ? cxt : result;
			}
		});
	}

	return source;
};