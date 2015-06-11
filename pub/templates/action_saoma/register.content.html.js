var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/action_saoma/register.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-action-sm-reg page-reg common-reg\">\n\t<header>\n\t\t<a class=\"down\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"DOWNLOAD", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\">爱抢购</a>\n\t\t<span class=\"title\"></span>\n\t\t<p class=\"scan-tip\">\n\t\t\t扫码就送\n\t\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t\t\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape) != 0) {
output += "、";
;
}
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t</p>\n\t</header>\n\t<div class=\"reg-form form-wrap\">\n\t\t<form autocomplete=\"on\" method=\"POST\" id=\"form-register\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"first\">\n\t\t\t\t\t<input name=\"mobile\" type=\"number\" maxlength=\"11\" required placeholder=\"请输入手机号\"/>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"rel\">\n\t\t\t\t\t<input name=\"auth_code\" type=\"number\" maxlength=\"6\" required placeholder=\"请输入短信验证码\"/>\n\t\t\t\t\t<span class=\"get-verify-code\">获取验证码<b></b></span>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<input name=\"password\" type=\"password\" required placeholder=\"请设置密码（至少6位）\"/>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<p class=\"tip clearfix\">\n\t\t\t\t<label for=\"user-protocol\">我接受<a href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"USER_PROTOCOL", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"url",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"STATIC_URL_AGREEMENT", env.opts.autoescape)), env.opts.autoescape);
output += "\">《爱抢购服务协议》</a></label>\n\t\t\t\t<input name=\"protocol\" id=\"user-protocol\" type=\"checkbox\" checked required/>\n\t\t\t</p>\n\t\t\t<button class=\"submit btn\" type=\"submit\">确认注册</button>\n\t\t\t";
output += "\n\t\t\t<a class=\"btn\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"LOGIN", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"redirect",runtime.contextOrFrameLookup(context, frame, "urlRedirect")), env.opts.autoescape);
output += "\">已领取过？马上查看</a>\n\t\t</form>\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "rules")) {
output += "\n\t\t<footer>\n\t\t\t<h2>活动规则</h2>\n\t\t\t<div class=\"content\">";
output += runtime.suppressValue(env.getFilter("nl2br").call(context, runtime.contextOrFrameLookup(context, frame, "rules")), env.opts.autoescape);
output += "</div>\n\t\t</footer>\n\t\t";
;
}
output += "\n\t</div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/action_saoma/register.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/action_saoma/register.content.html", ctx)
};