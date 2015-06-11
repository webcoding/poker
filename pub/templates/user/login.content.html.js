var nunjucks = require("nunjucks");

    
        
        require("templates/user/_third_login.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/user/login.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-log common-reg\">\n    <div class=\"log-form form-wrap\">\n        <form id=\"form-login\" autocomplete=\"on\" method=\"GET\">\n            <ul>\n                <li class=\"first\">\n                    <input type=\"number\" name=\"mobile\" required placeholder=\"请输入手机号\"/>\n                </li>\n                <li>\n                    <input type=\"password\" name=\"password\" required placeholder=\"请输入密码（至少6位）\"/>\n                </li>\n            </ul>\n            <p class=\"tip clearfix\">\n                <a class=\"forgot-password\" href=\"javascript:;\" data-action='navUtil.location(\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"RESET_PASSWORD", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\")'>忘记密码？</a>\n            </p>\n            <button class=\"submit\" type=\"submit\">确认登录</button>\n        </form>\n\t    ";
env.getTemplate("templates/user/_third_login.html", false, "templates/user/login.content.html", function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame.push(), function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n    </div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/user/login.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/user/login.content.html", ctx)
};