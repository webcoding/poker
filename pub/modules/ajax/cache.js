var caches = {}

// 对于像商品详情这种类型的，需要显示数量，否则，打开100个详情页，就保存了100个详情的数据，而详情的重复进入率也是比较低的
exports.MAX_IN_ONE                  = 10
exports.PRIVATE_KEY                 = '__KEYS'

exports.ITEM_LIST_BARGAIN           = 'ITEM_LIST_BARGAIN'
exports.ITEM_LIST_COUNTDOWN         = 'ITEM_LIST_COUNTDOWN'
exports.ITEM_DETAIL                 = 'ITEM_DETAIL'
exports.ITEM_COMMENT                = 'ITEM_COMMENT'
exports.ITEM_SHOP                   = 'ITEM_SHOP'

exports.ORDER_DETAIL                = 'ORDER_DETAIL'
exports.ORDER_LIST                  = 'ORDER_LIST'

exports.OTHER_NOTICE                = 'OTHER_NOTICE'

// 热门商圈
exports.ZONE_CBD                    = 'ZONE_CBD'

exports.USER_PROFILE                = 'USER_PROFILE'

// 扫码活动
exports.A_SM_ORDER_LIST             = 'A_SM_ORDER_LIST'
exports.A_SM_SHOP                   = 'A_SM_SHOP'



// 缓存类型：最终还是会ajax加载数据，仅仅是在加载完成之前使用缓存的数据
exports.TYPE_STILL_LOAD             = 'TYPE_STILL_LOAD'
// 缓存类型：只使用缓存，不再继续加载数据
exports.TYPE_ONLY_CACHE             = 'TYPE_ONLY_CACHE'


exports.STATUS_TYPE_CACHE           = 'STATUS_TYPE_CACHE'



exports.getItem = getItem

exports.setItem = setItem

exports.removeItem = removeItem

exports.setItemByCompare = setItemByCompare

exports.isSame = deepCompareSame

exports.incrementing = incrementing

// 因为是 cache 导致有些 onDomReady 的函数可能会被执行两次
// 所以，把这个函数挂在 这个对象上
//exports.executeOnce = executeOnce

// getItem(key)
// getItem(key, key1)
function getItem(cacheKey, itemKey){
	var item = caches[cacheKey]
	if(itemKey !== undefined) return item && item[itemKey]
	return item
}

// setItem(key, value)
// setItem(key, key2, value)
// setItem(key, undefined, value)
function setItem(cacheKey, itemKey, val){
	if(arguments.length === 2){
		val = itemKey
		itemKey = undefined
	}

	if(itemKey === undefined){
		return caches[cacheKey] = val
	}
	else{
		var cache = caches[cacheKey] = caches[cacheKey] || {}
		var keys = cache[exports.PRIVATE_KEY] = cache[exports.PRIVATE_KEY] || []
		// 第一次缓存
		if(cache[itemKey] === undefined){
			keys.push(itemKey)
		}
		cache[itemKey] = val
		if(keys.length > exports.MAX_IN_ONE){
			var key = keys.shift()
			delete cache[key]
		}
	}
}

function removeItem(cacheKey, itemKey){
	var item = caches[cacheKey]
	if(itemKey !== undefined && item) delete item[itemKey]
	else delete caches[cacheKey]
}

function setItemByCompare(cacheKey, itemKey, val){
	if(arguments.length === 2){
		val = itemKey
		itemKey = undefined
	}
	var prevVal = getItem(cacheKey, itemKey)
	if(deepCompareSame(prevVal, val)) return false
	setItem(cacheKey, itemKey, val)
	return true
}

function deepCompareSame(a, b){
	var type
	if($.isArray(a) || $.isPlainObject(a)){
		var isSame = true
		$.each(a, function(key, val){
			if(!deepCompareSame(val, b[key])){
				isSame = false
				return false
			}
		})
		return isSame
	}
	else if(['RegExp', 'Date'].indexOf(type = $.type(a)) >= 0){
		return a.toString() === b.toString()
	}
	else if(type === 'number' && isNaN(a)){
		return $.type(b) === 'number' && isNaN(b)
	}
	// 'String', 'Number', 'Boolean', 'Null', 'Undefined' 以及 其他
	else{
		return a === b
	}
}

// 类似 like 字段，每次浏览都会 +1
// 但是，实在不应该因为这种 like 的变化，引起整个 DOM 的重新渲染
// 所以先手动自增，然后再对比
function incrementing(cache, key){
	cache[key] += 1
	return cache
}