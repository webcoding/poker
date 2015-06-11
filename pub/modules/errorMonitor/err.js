/**
 * JS错误统计
 *
 * http://www.w3ctech.com/topic/608
 */

var storage = require('storage')
var ajax = require('ajax')
//var detect = require--('modules/common/detect')
var isMobile = $.os.tablet || $.os.phone

var err = exports
var alertErrorInMobile = false


/**
 * 所有的错误类型都应该挂在 err 模块上
 *
 */
err.ERR_MONITOR = 'ERR_MONITOR'
// 错误类型：未捕获的错误
err.ERR_TYPE_UNCAUGHT = 'ERR_TYPE_UNCAUGHT'
// 错误类型：接口返回错误 - 格式
err.ERR_TYPE_API_RESPONSE_FORMAT = 'ERR_TYPE_API_RESPONSE_FORMAT'
// 地理定位失败
err.ERR_TYPE_GEO_FAIL = 'ERR_TYPE_GEO_FAIL'



var thresholdCount = 50

function postToServer(errors, cb){
	function suc(data){
		if(data.status == 200){
			cb && cb()
		}
		else{
			err('fail', data)
		}
	}
	function err(err){

	}
	ajax.post(ajax.API_ERROR_MONITOR, {
		errors: JSON.stringify(errors)
	}, suc, err)
}

function recordError(err){
	if(!imod.isProduction()){
		if(isMobile) alert('[ERROR] ' + JSON.stringify(err, null, 4))
		console.error(err)
	}
	else{
		var errors = storage.get(err.ERR_MONITOR) || []

		errors.push(err)

		if(errors.length >= thresholdCount){
			postToServer(errors, function(){
				storage.remove(err.ERR_MONITOR)
			})
		}
		else{
			storage.set(err.ERR_MONITOR, errors)
		}
	}
}

function onerror(msg,url,line,col,error){
	//没有URL不上报！上报也不知道错误
	if (msg != "Script error." && !url){
		return true
	}
	//采用异步的方式
	//我遇到过在window.onunload进行ajax的堵塞上报
	//由于客户端强制关闭webview导致这次堵塞上报有Network Error
	//我猜测这里window.onerror的执行流在关闭前是必然执行的
	//而离开文章之后的上报对于业务来说是可丢失的
	//所以我把这里的执行流放到异步事件去执行
	//脚本的异常数降低了10倍
//	function onTimeout(){
//		var data = {}
//		//不一定所有浏览器都支持col参数
//		col = col || (window.event && window.event.errorCharacter) || 0
//
//		data.url = url
//		data.line = line
//		data.col = col
//		data.time = +new Date
//		data.type = err.ERR_TYPE_UNCAUGHT
//		if (!!error && !!error.stack){
//			//如果浏览器有堆栈信息
//			//直接使用
//			data.msg = error.stack.toString()
//		}
//		else {
//			//尝试通过callee拿堆栈信息
//			var ext = []
//			var f = onTimeout.caller, c = 3
//			//这里只拿三层堆栈信息
//			while (f && (--c>0)) {
//				ext.push(f.toString())
//				if (f  === f.caller) {
//					break//如果有环
//				}
//				f = f.caller
//			}
//			ext = ext.join(",")
//			data.msg = ext.toString()
//		}
//		//把data上报到后台！
//		recordError(data)
//	}
	//setTimeout(onTimeout,0)

	var stack = error && error.stack && error.stack.toString() || 'null'
	col = col || (window.event && window.event['errorCharacter']) || 'null'
	recordError({
		url: url,
		line: line,
		col: col,
		time: new Date().getTime(),
		type: err.ERR_TYPE_UNCAUGHT,
		msg: msg,
		stack: stack
	})

	return true
}

// 生产环境需要记录错误
if(imod.isProduction() || (isMobile && alertErrorInMobile)){
	window.onerror = onerror
}

err.record = recordError