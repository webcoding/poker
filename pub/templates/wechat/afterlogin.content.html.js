var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/wechat/afterlogin.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-weixin-afterlogin\">\n\t<p class=\"login\">正在登录中...</p>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/wechat/afterlogin.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/wechat/afterlogin.content.html", ctx)
};