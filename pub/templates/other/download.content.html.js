var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/other/download.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container down-wrap\">\n\t<div class=\"wechat-ios\">\n\t\t<div class=\"inner\">\n\t\t\t<h3>请用浏览器打开：</h3>\n\t\t\t<ol>\n\t\t\t\t<li>点击右上角的<i style=\"background-position: 0 -5.6rem\">...</i>或者<i style=\"background-position: 0 -7.2rem\">分享</i></li>\n\t\t\t\t<li>选择在 Safari 中打开<br>即可下载爱抢购客户端<i style=\"margin-top:-1.4rem; width: 3.05rem; height: 3.05rem;\">Safari</i></li>\n\t\t\t</ol>\n\t\t\t<i class=\"wxtips-top\">右上角</i>\n\t\t</div>\n\t</div>\n\t<p class=\"tip\">\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "from") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"DOWNLOAD_FROM_PREFERENTIAL", env.opts.autoescape)) {
output += "\n\t\t亲爱的用户，“优惠点” 功能暂时只对 App 用户开放，“优惠点” 可以实现商品砍价功能。\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "from") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"DOWNLOAD_FROM_FAV", env.opts.autoescape)) {
output += "\n\t\t亲爱的用户，“收藏” 功能暂时只对 App 用户开放，点击 “收藏” 之后当前位置会出现在收藏地址列表里。\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "from") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"DOWNLOAD_FROM_COIN", env.opts.autoescape)) {
output += "\n\t\t亲爱的用户，“赚金币” 功能暂时只对 App 用户开放，赚到金币之后可以兑换余额。\n\t\t";
;
}
else {
output += "\n\t\t亲爱的用户，下载爱抢购 App 之后可以享受到更强大的功能，比如“优惠点”，可以实现商品砍价功能。\n\t\t";
;
}
;
}
;
}
output += "\n\t</p>\n\t<div class=\"buttons clearfix\">\n\t\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "os")),"ios", env.opts.autoescape)) {
output += "\n\t\t<a class=\"download-btn\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "urlIPhoneDownload"), env.opts.autoescape);
output += "\">立即下载</a>\n\t\t";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "os")),"android", env.opts.autoescape)) {
output += "\n\t\t<a class=\"download-btn\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "urlAndroidDownload"), env.opts.autoescape);
output += "\">立即下载</a>\n\t\t";
;
}
;
}
output += "\n\t\t";
output += "\n\t</div>\n\t<iframe id=\"iframe-app\" src=\"";
output += runtime.suppressValue(env.getFilter("trim").call(context, runtime.contextOrFrameLookup(context, frame, "urlIFrame")), env.opts.autoescape);
output += "\" style=\"display:none\"></iframe>\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("templates/other/download.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/other/download.content.html", ctx)
};