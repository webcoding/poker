/**
 * SPM 数据统计，修改每一个 a 标签的 href 链接
 */

var url = require('modules/url/url')

var ipm = getPageIpm()

function getPageIpm(){
	var metaIPM = $('meta[name=ipm]')
	var ipm = metaIPM.attr('content')
	return ipm
}

function addIpm(wrapNode, parentIpmNode){
	var n = parentIpmNode || wrapNode.parents('[data-ipm]')
	var seg = n[0] ? n.data('ipm') : ''
	$.each($('a', wrapNode), function(i, a){

	})
}

exports.addIpm = addIpm