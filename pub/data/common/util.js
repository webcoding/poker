exports.randomItems = function(arr){
	return arr[exports.random(0, arr.length, 'floor')]
}

exports.random = function(from, to, fn){
	var rst = Math.random() * (to - from) + from
	if(fn) return Math[fn](rst)
	return rst
}