var ajax = require('ajax')
var geo = require('./geo')


// 可能的错误类型
var READALBE_ERROR = {
	BAIDU_API: 1001,
	XHR: 1002,
	GEOLOCATION: 1003
}
function ReadableError(code){
	this.code = code
	for(var key in READALBE_ERROR){
		this[key] = READALBE_ERROR[key]
	}
}

function Async (){
	this.isAborted = false
}
Async.prototype.abort = function(){
	this.isAborted = true
	this.xhr && this.xhr.abort()
}
Async.prototype.setXHR = function(xhr){
	this.xhr = xhr
}

function noop(){}

// 获取可读的当前位置
// 返回值必须实现了 abort 接口
function getCurrReadablePos(success, error, options){
	options = options || {}
	var optionsComplete = options.complete || noop
	options.complete = complete

	var async = new Async()
	var xhr

	geo.getCurrPos(function _success(pos){
		// 如果在定位完成之前就 abort 了，就无需执行下面的步骤了
		if(async.isAborted) return

		xhr = ajax.ajax({
			useZepto: true,
			dataType: 'jsonp',
			url: ajax.API_BAIDU_MAP_GEOCODER,
			data: {
				ak: ajax.BAIDU_MAP_AK,
				location: geo.getLat() + ',' + geo.getLng(),
				output: 'json'
			},
			success: function(data, status, xhr){
				// 成功
				if(data.status === 0){
					success(data, status, xhr)
				}
				else{
					var err = new ReadableError(READALBE_ERROR.BAIDU_API)
					error && error(xhr, err.BAIDU_API, err, err.code)
				}
			},
			error: function(xhr, errorType, error, code){
				var err = new ReadableError(READALBE_ERROR.XHR)
				error && error(xhr, err.XHR, err, err.code)
			},
			complete: complete
		})

		async.setXHR(xhr)

	}, function _error(_err){
		// 如果在定位完成之前就 abort 了，就无需执行下面的步骤了
		if(async.isAborted) return

		var err = new ReadableError(READALBE_ERROR.GEOLOCATION)
		error && error(null, err.GEOLOCATION, err, err.code)
	}, options)

	// 如果定位成功，会继续执行 ajax
	// 但是 options.complete 只能执行一次
	function complete(isSuccess, status, args){
		// 如果在定位完成之前就 abort 了，就无需执行下面的步骤了
		if(async.isAborted) return

		// geo 定位失败
		if(isSuccess === false) return optionsComplete(false)
		// geo 定位成功
		if(isSuccess === true) return

		// ajax's complete
		var xhr = isSuccess
		optionsComplete(xhr, status, args)
	}

	return async
}

exports.getCurrReadablePos = getCurrReadablePos