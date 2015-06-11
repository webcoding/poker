var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/action_saoma/order_list.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-action-sm-order\">\n\t<header>\n\t\t<a class=\"down\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"DOWNLOAD", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\">爱抢购</a>\n\t\t<span class=\"title\"></span>\n\t\t<p class=\"scan-tip\">以下奖品已经发送到您的爱抢购账号里啦~</p>\n\t</header>\n\t<div class=\"orders\">\n\t\t";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "orders"))) {
output += "\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "orders");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("order", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t\t<div class=\"order ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"first", env.opts.autoescape)) {
output += "first";
;
}
output += "\">\n\t\t\t<a class=\"clearfix\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ORDER_DETAIL", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"order_id",runtime.memberLookup((t_4),"id", env.opts.autoescape)), env.opts.autoescape);
output += "\">\n\t\t\t\t<img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"images", env.opts.autoescape)),0, env.opts.autoescape), env.opts.autoescape);
output += "\" class=\"img\"/>\n\t\t\t\t<div class=\"content\">\n\t\t\t\t\t<h3>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</h3>\n\t\t\t\t\t";
if(runtime.memberLookup((t_4),"start_date", env.opts.autoescape) > runtime.contextOrFrameLookup(context, frame, "server_time")) {
output += "\n\t\t\t\t\t\t<p class=\"code\">验证码：下载爱抢购APP，记得明天来看哦~</p>\n\t\t\t\t\t\t<p class=\"start\">开始时间：";
output += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((t_4),"start_date", env.opts.autoescape),"MM-dd hh:mm"), env.opts.autoescape);
output += "</p>\n\t\t\t\t\t";
;
}
else {
output += "\n\t\t\t\t\t\t<p class=\"code\">验证码：";
output += runtime.suppressValue(runtime.memberLookup((t_4),"redeem_number", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t\t\t\t";
;
}
output += "\n\t\t\t\t\t";
if(runtime.memberLookup((t_4),"status", env.opts.autoescape) == 2 || runtime.memberLookup((t_4),"status", env.opts.autoescape) == 3) {
output += "\n\t\t\t\t\t\t";
output += "\n\t\t\t\t\t\t<p class=\"expire\">过期时间：";
output += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((t_4),"expire_date", env.opts.autoescape),"MM-dd hh:mm"), env.opts.autoescape);
output += "</p>\n\t\t\t\t\t";
;
}
else {
if(runtime.memberLookup((t_4),"status", env.opts.autoescape) == 4) {
output += "\n\t\t\t\t\t\t";
output += "\n\t\t\t\t\t\t<p class=\"used\">使用时间：";
output += runtime.suppressValue(env.getFilter("formatTime").call(context, (runtime.memberLookup((t_4),"redeem_time", env.opts.autoescape) || runtime.memberLookup((t_4),"expire_date", env.opts.autoescape)),"MM-dd hh:mm"), env.opts.autoescape);
output += "</p>\n\t\t\t\t\t";
;
}
;
}
output += "\n\t\t\t\t\t<p class=\"shop\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_4),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"name", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>\n\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t";
;
}
else {
output += "\n\t\t<div class=\"empty\">这里没有属于你的订单...</div>\n\t\t";
;
}
output += "\n\t</div>\n\t<footer>\n\t\t<div class=\"ad-txt\">\n\t\t\t<p class=\"\">\n\t\t\t\t爱抢购是一个价格你做主的APP <br/>\n\t\t\t\t下载注册立得5元 <br/>\n\t\t\t\t5元可抵百元用!\n\t\t\t</p>\n\t\t</div>\n\t\t<p class=\"download clearfix\">\n\t\t\t<a class=\"ios\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "urlIPhoneDownload"), env.opts.autoescape);
output += "\">iPhone 版下载</a>\n\t\t\t<a class=\"android\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "urlAndroidDownload"), env.opts.autoescape);
output += "\">Android 版下载</a>\n\t\t</p>\n\t</footer>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/action_saoma/order_list.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/action_saoma/order_list.content.html", ctx)
};