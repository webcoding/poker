var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["pages/c-item/original-web.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container original-web\">\n\t<iframe class=\"iframe\" src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "urlIFrame"), env.opts.autoescape);
output += "\"></iframe>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("pages/c-item/original-web.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("pages/c-item/original-web.html", ctx)
};