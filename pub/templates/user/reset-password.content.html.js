var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/user/reset-password.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-res-pass common-reg\">\n    <div class=\"reg-form form-wrap\">\n        <form autocomplete=\"on\" id=\"form-reset\">\n            <ul>\n                <li class=\"first\">\n                    <input name=\"mobile\" type=\"number\" required placeholder=\"请输入手机号\"/>\n                </li>\n                <li class=\"rel\">\n                    <input name=\"auth_code\" type=\"number\" required placeholder=\"请输入短信验证码\"/>\n                    <span class=\"get-verify-code\">获取验证码<b></b></span>\n                </li>\n                <li>\n                    <input name=\"new_password\" type=\"password\" required placeholder=\"请输入新密码（至少6位）\"/>\n                </li>\n            </ul>\n            <button class=\"submit\" type=\"submit\">确认使用新密码</button>\n        </form>\n    </div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/user/reset-password.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/user/reset-password.content.html", ctx)
};