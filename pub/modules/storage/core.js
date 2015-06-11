var defaults = {
	USING_CATEGORY: {
		id: 0,
		name: '全部分类'
	}
}


// 缓存再内存内，避免IO
var cache = {}

exports.getDefault = function(key){
	return defaults[key]
}

/**
 *
 * @param key
 * @param howlong 多长时间(毫秒)之内的数据可用
 * @returns {*}
 */
exports.get = function(key, howlong){
	if(!key) throw "[ERROR] key("+key+") is not valid."
	var originVal = cache[key] || localStorage.getItem(key)
	var val = originVal
	var now = +new Date
	// 2天
	howlong = howlong || (86400000 * 2)
	if(val) {
		addCache(key, originVal)

		try{
			val = JSON.parse(val)
		}
		catch(e){
			throw "[ERROR] key("+key+") in localStorage is not a valid JSON format."
		}

		var ts = val.ts
		val = (now - ts > howlong) ? null : val.data
	}
	return val || defaults[key]
}
exports.set = function(key, val){
	if(!key) throw "[ERROR] key("+key+") is not valid."
	try{
		val = JSON.stringify({
			ts: +new Date,
			data: val
		})
	}
	catch(e){
		throw "[ERROR] value can not be serialized."
	}
	addCache(key, val)
	// TODO: mobile safari private模式（无痕浏览）无法 setItem
	try{
		localStorage.setItem(key, val)
		return val
	}
	catch(e){
		return false
	}
}
exports.remove = function(key){
	if(!key) throw "[ERROR] key("+key+") is not valid."

	exports.removeCache(key)
	return localStorage.removeItem(key)
}
function addCache(key, val){
	cache[key] = val
}
exports.removeCache = function removeCache(key){
	delete cache[key]
}
exports.removeAllCache = function removeAllCache(){
	cache = {}
}