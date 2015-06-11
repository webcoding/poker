var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/user/profile.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-profile\">\n\t";
output += "\n\n\t";
if(runtime.contextOrFrameLookup(context, frame, "profile")) {
output += "\n\t<div class=\"myprofile block clearfix\">\n\t\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"avatar", env.opts.autoescape)) {
output += "\n\t\t<img class=\"avatar\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"avatar", env.opts.autoescape), env.opts.autoescape);
output += "\" alt=\"\"/>\n\t\t";
;
}
output += "\n\t\t<div class=\"inner\">\n\t\t\t<p class=\"mobile\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"mobile", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t\t<p class=\"balance\">余额： <span class=\"balance-cnt\">";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "profile")),"balance", env.opts.autoescape))), env.opts.autoescape);
output += "</span></p>\n\t\t</div>\n\t</div>\n\n\t";
;
}
else {
output += "\n\n\t<div class=\"block\">\n\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"REGISTER", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\">注册/登录</a>\n\t</div>\n\n\t";
;
}
output += "\n\n\t<div class=\"block\">\n\t\t<h3 class=\"title\">订单</h3>\n\t\t<div class=\"inner\">\n\t\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ORDER_LIST", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"type",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"ORDER_TYPE_REDEEM", env.opts.autoescape)), env.opts.autoescape);
output += "\">待领用</a>\n\t\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ORDER_LIST", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"type",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"ORDER_TYPE_TO_COMMENT", env.opts.autoescape)), env.opts.autoescape);
output += "\">待评论</a>\n\t\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ORDER_LIST", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"type",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"ORDER_TYPE_DONE", env.opts.autoescape)), env.opts.autoescape);
output += "\">已完成</a>\n\t\t</div>\n\t</div>\n\n\t<div class=\"block\">\n\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"NOTICE_CENTER", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\" class=\"notice-center\">通知中心</a>\n\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"CITY_SELECT", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\" class=\"city-sel\">选择城市 <span>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "currCity"), env.opts.autoescape);
output += "</span></a>\n\t</div>\n\n\t<div class=\"block\">\n\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"CONTACT", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\">联系我们</a>\n\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ISSUE", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"url",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"STATIC_URL_FAQ", env.opts.autoescape)), env.opts.autoescape);
output += "\">常见问题</a>\n\t</div>\n\n\t";
if(runtime.contextOrFrameLookup(context, frame, "profile")) {
output += "\n\t<div class=\"block\">\n\t\t<a class=\"line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"LOGOUT", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\">退出登录</a>\n\t</div>\n\t";
;
}
output += "\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/user/profile.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/user/profile.content.html", ctx)
};