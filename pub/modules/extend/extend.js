var slice = Array.prototype.slice

//exports.each = function (collection, iterator) {
//	return $.each(collection, function (i, item) {
//		return iterator(item, i)
//	})
//}

exports.trim = function(str){
	if(str.trim) return str.trim()
	else return str.match(/^\s*(.*?)\s*$/)[1]
}

//exports.bind = function(fn, ctx, args){
//	var args = arguments
//	if(fn.bind) {
//		return fn.bind.apply(fn, slice.call(args, 1))
//	}
//	else return function(){
//		return fn.apply(ctx, slice.call(args, 2).concat(slice.call(arguments, 0)))
//	}
//}