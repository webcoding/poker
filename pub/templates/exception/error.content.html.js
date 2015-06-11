var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/exception/error.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container page-error\">\n\t<h1>刚刚发生了什么？！</h1>\n\t<h2>我都hold不住了...</h2>\n\t<div>\n\t\t赶紧拨打电话告诉我：<a href=\"tel:4006717909\">400-671-7909</a>\n\t</div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/exception/error.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/exception/error.content.html", ctx)
};