exports = module.exports = function(env){
	for(var filterName in exports){

		if(exports.hasOwnProperty(filterName)) env.addFilter(filterName, exports[filterName])
	}
	env.addFilter('length', length)
	return env
}

exports.is = is
exports.json_encode = json_encode
exports.raw = raw
exports.number = number
exports.pad = pad
exports.decimal = decimal
exports.nl2br = nl2br
exports.formatTime = formatTime
exports.formatPrice = formatPrice
exports.formatDistance = formatDistance
exports.randomArray = randomArray
exports.randomRange = randomRange
exports.rmb = rmb
exports.getRoute = getRoute
exports.round = round
// length 是制度属性，只能特殊处理
//exports.length = length
exports.geoLink = geoLink
exports.split = split
exports.encodeURIComponent = _encodeURIComponent


function is(a, b){
	return a === b
}

/**
 * twig: http://twig.sensiolabs.org/doc/filters/json_encode.html
 * @param o
 * @returns {*}
 */
function json_encode(o){
	return JSON.stringify(o)
}

/**
 * twig: http://twig.sensiolabs.org/doc/filters/raw.html
 * @param str
 * @returns {*}
 */
function raw(str){
	return str
}

function number(num){
	return parseFloat(num)
}

function formatTime(phpTimestamp, format){
	format = format || 'YYYY-MM-dd'
	var t = new Date(parseInt(phpTimestamp) * 1000)
	var formatted_time = format
		.replace(/YYYY/g, t.getFullYear())
		.replace(/YY/g, t.getFullYear().toString().substr(2))
		.replace(/MM/g, pad(t.getMonth() + 1))
		.replace(/M/g, t.getMonth() + 1)
		.replace(/dd/g, pad(t.getDate()))
		.replace(/d/g, t.getDate())
		.replace(/hh/g, pad(t.getHours()))
		.replace(/h/g, t.getHours())
		.replace(/mm/g, pad(t.getMinutes()))
		.replace(/m/g, t.getMinutes())
		.replace(/ss/g, pad(t.getSeconds()))
		.replace(/s/g, t.getSeconds())
	return formatted_time
}

/**
 *
 * @param num
 * @param len
 * @param _char
 * @param right
 * @param neat 长度整齐，过长的话就把右侧切掉
 * @returns {*}
 */
function pad(num, len, _char, right, neat){
	len = len || 2
	_char = _char || '0'
	num = num.toString()
	if(len <= num.length) {
		if(neat) return num.substr(0, len)
		else return num
	}
	var m = (new Array((len - num.length) + 1)).join(_char)
	return right ? (num + m) : (m + num)
}


/**
 * 取小数部分
 * @param num
 *
 * decimal(2.093) ==>> '093'
 * decimal(2) ==>> ''
 */
function decimal(num){
	var m = (num+'').match(/\.(\d+)$/)
	return m ? m[1] : ''
}

/**
 * twig: http://twig.sensiolabs.org/doc/filters/nl2br.html
 * @param str
 * @returns {*}
 */
function nl2br(str){
	var br = '<br>'
	return str.replace(/\r\n/g, br).replace(/\n/g, br).replace(/\\n/g, br)
}

function formatPrice(_price, needCount, fn){
	var price = parseFloat(_price)
	if(isNaN(price)) return _price
	var is0 = price < 1 && price >= 0
	if(is0) price += 1
	// 需要小数点后2位
	needCount = needCount || 2
	fn = fn || 'round'
	var numStr = Math[fn](price * Math.pow(10, needCount)).toString()
	var index = numStr.length - needCount
	var intPart = numStr.substr(0, index)
	if(is0) intPart = parseInt(intPart) - 1
	return intPart + '.' + numStr.substr(index)
}

function formatDistance(distance){
	var distance_str
	if(distance < 1000){
		distance_str = Math.floor(distance) +  '米'
	}
	else if(distance < 100000){
		// 小数点后一位
		distance_str = Math.floor(distance / 100) / 10 + '公里'
	}
	else{
		distance_str = '大于100公里'
	}
	return distance_str
}

function randomArray(arr){
	return arr[randomRange(0, arr.length)]
}

function randomRange(from, to){
	return Math.floor(Math.random() *  (to - from) + from)
}

//function rmb(money, _formatPrice, showEmpty){
//	if(money == 0 && !showEmpty) return ''
//	return '￥' + (_formatPrice ? formatPrice(money) : money)
//}
function rmb(money){
//	return '￥' + money
	return '<span>' + money + '</span>元'
}

/**
 *
 * @param rule
 * @param route
 * @param _qs ..qs 剩余的参数，分别是 key, val, key, val...
 * @returns {*}
 */
function getRoute(rule, route, _qs){
	var qs = {}
	for(var i = 2, len = arguments.length; i<len; i+=2){
		var key = arguments[i], val = arguments[i + 1]
		qs[key] = val
	}
	return route.getRoute(rule, qs)
}

/**
 * twig: http://twig.sensiolabs.org/doc/filters/round.html
 * @param num
 * @param precision
 * @param method
 */
function round(num, precision, method){
	num = parseFloat(num)
	precision = precision || 0
	method = method || 'round'
	var factor = Math.pow(10, precision)
	return Math[method](num * factor) / factor
}

function length(arr){
	if($.isArray(arr)) return arr.length
	else if($.isPlainObject(arr)) return Object.keys(arr).length
	else return arr ? arr.toString().length : 0
}

function geoLink(shop){
	return 'http://api.map.baidu.com/marker?location=' + shop.lat + ',' + shop.lng + '&title='+encodeURIComponent(shop.name)+'&content='+encodeURIComponent(shop.address)+'&output=html&src='+encodeURIComponent('多维度|爱抢购')
}

/**
 * twig: http://twig.sensiolabs.org/doc/filters/split.html
 * @param str
 * @param delimiter
 * @param limit
 */
function split(str, delimiter, limit){
	str = str+''
	if(limit === undefined) return str.split(delimiter)
	else if(delimiter === ''){
		var result = []
		for(var i = 0, len = str.length; i<len; i+=limit){
			result.push(str.substr(i, limit))
		}
		return result
	}
	else{
		var tmp = str.split(delimiter)
		var result = []
		for(var i = 0; i<limit-1; i++){
			result.push(tmp.shift())
		}
		result.push(tmp.join(delimiter))
		return result
	}
}
function _encodeURIComponent(url){
	return encodeURIComponent(url)
}