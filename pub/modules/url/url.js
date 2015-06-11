var urlCore = require('./core')

// node 环境不要使用这个
if(typeof window !== 'undefined'){
	var dom = document.createElement('a')
}

var _parse = urlCore.parse
var _stringify = urlCore.stringify

function parseSearch(search){
	search = search || location.search
	if(search.indexOf('?') === 0) search = search.substr(1)
	return _parse(search)
}

function parseHash(hash){
	hash = hash || location.hash
	if(hash.indexOf('#') === 0) hash = hash.substr(1)
	return _parse(hash)
}

function parseUrl(url, _parseSearch, _parseHash){
	dom.href = url
	return {
		href: url,
		origin: dom.origin,
		host: dom.host,
		hostname: dom.hostname,
		port: dom.port,
		pathname: dom.pathname,
		search: _parseSearch ? parseSearch(dom.search) : dom.search,
		hash: _parseHash ? parseHash(dom.hash) : dom.hash
	}
}

function stringifySearch(searchO){
	return '?' + _stringify(searchO)
}

function stringifyHash(hashO){
	return '#' + _stringify(hashO)
}

function stringifyUrl(urlObj){
	return (urlObj.origin ? urlObj.origin : (urlObj.protocol + '//' + urlObj.host)) +
		// host 是包括端口了的，hostname 是没有端口的字段
//		(urlObj.port ? (':' + urlObj.port) : '') +
		urlObj.pathname +
		(urlObj.search && (typeof urlObj.search === 'string' ? urlObj.search : stringifySearch(urlObj.search))) +
		(urlObj.hash && (typeof urlObj.hash === 'string' ? urlObj.hash : stringifyHash(urlObj.hash)))
}

exports.parse = _parse
exports.parseUrl = parseUrl
exports.parseSearch = parseSearch
exports.parseHash = parseHash

exports.stringify = _stringify
exports.stringifyUrl = stringifyUrl
exports.stringifySearch = stringifySearch
exports.stringifyHash = stringifyHash