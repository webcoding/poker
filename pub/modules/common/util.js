var nunjucksFilter = require('nunjucksFilter')

// 一个极其简单的模板处理器
function tpl(str, ctx){
	return str.replace(/\{\{\s*([\w\d_]+)\s*\}\}/g, function(match, $1){
		return ctx[$1]
	})
}

function getFullpath(){
	return location.href.substr(location.origin.length)
}

function getPathname(){
	return location.pathname
}


function getMacro(tplFn, data, macroName, macroParams, isJSON){
	macroParams = macroParams || []
	tplFn(data)
	var result = data[macroName] && data[macroName].apply(null, macroParams).toString()
	return (result && isJSON) ? JSON.parse(result) : result
}

// 把 filter 的函数都放到 这里共用
$.extend(exports, nunjucksFilter)
exports.tpl = tpl
exports.getFullpath = getFullpath
exports.getPathname = getPathname
exports.getMacro = getMacro