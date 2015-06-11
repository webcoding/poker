var nunjucks = require("nunjucks");

    
        
        require("templates/user/_third_login.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/user/register.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-reg common-reg ";
if(runtime.contextOrFrameLookup(context, frame, "shareCode")) {
output += "is-invite";
;
}
output += "\">\n\t<div class=\"reg-form form-wrap\">\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "shareCode")) {
output += "\n\t\t<p class=\"invite-tip\">您受邀注册爱抢购。邀请码";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "shareCode"), env.opts.autoescape);
output += "。注册立获5元，完成首单您还将额外获得200枚金币。</p>\n\t\t";
;
}
output += "\n\t\t<form autocomplete=\"on\" method=\"POST\" id=\"form-register\">\n\t\t\t<ul>\n\t\t\t\t<li class=\"first\">\n\t\t\t\t\t<input name=\"mobile\" type=\"number\" required placeholder=\"请输入手机号\"/>\n\t\t\t\t</li>\n\t\t\t\t<li class=\"rel\">\n\t\t\t\t\t";
if(runtime.contextOrFrameLookup(context, frame, "useVoiceCode")) {
output += "\n\t\t\t\t\t<input name=\"auth_code\" type=\"number\" required placeholder=\"请输入语音验证码\"/>\n\t\t\t\t\t<span class=\"get-verify-code\" data-voice=\"true\">获取语音验证<b></b></span>\n\t\t\t\t\t";
;
}
else {
output += "\n\t\t\t\t\t<input name=\"auth_code\" type=\"number\" required placeholder=\"请输入短信验证码\"/>\n\t\t\t\t\t<span class=\"get-verify-code\">获取验证码<b></b></span>\n\t\t\t\t\t";
;
}
output += "\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<input name=\"password\" type=\"password\" required placeholder=\"请设置密码（至少6位）\"/>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t\t<p class=\"tip clearfix\">\n\t\t\t\t<label for=\"user-protocol\">我接受<a href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"USER_PROTOCOL", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"url",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"STATIC_URL_AGREEMENT", env.opts.autoescape)), env.opts.autoescape);
output += "\">用户协议</a></label>\n\t\t\t\t<input name=\"protocol\" id=\"user-protocol\" type=\"checkbox\" checked required/>\n\t\t\t</p>\n\t\t\t<button class=\"submit\" type=\"submit\">确认注册</button>\n\t\t</form>\n\t\t";
env.getTemplate("templates/user/_third_login.html", false, "templates/user/register.content.html", function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame.push(), function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n\t</div>\n\t";
output += "\n</div>";
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("templates/user/register.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/user/register.content.html", ctx)
};