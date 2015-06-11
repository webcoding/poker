var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/popover/big.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"popover-big\">\n    <i class=\"arrow\"><b></b></i>\n\t<div class=\"content-wrap\">\n\t    <div class=\"content\">\n\n\t    </div>\n\t</div>\n\t<span class=\"btn-close\">关闭</span>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/popover/big.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/popover/big.html", ctx)
};