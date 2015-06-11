var cacheParse = {}
function _parse(str){
	if(cacheParse[str]) return cacheParse[str]
	else{
		var map = {}
		str && str.split('&').forEach(function(paire){
			var m = paire.split('=')
			map[decodeURIComponent(m[0])] = m[1] && decodeURIComponent(m[1])
		})
		return cacheParse[str] = map
	}
}
exports.parse = _parse

// 这个就不必缓存了，依赖消耗不大，二来并没有很好的匹配缓存的方案
function _stringify(o){
	var str = ''
	for(var key in o){
		if(o.hasOwnProperty(key)) {
			var val = o[key]
			if(val === undefined || val === null) val = ''
			str += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(val)
		}
	}
	return str.substr(1)
}
exports.stringify = _stringify