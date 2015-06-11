var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/nav/Icon.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "href") || "javascript:;", env.opts.autoescape);
output += "\" class=\"btn-extra nav-item iconfont show ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "type"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "text"), env.opts.autoescape);
output += "</a>";
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
return function(ctx, cb) { return nunjucks.render("widgets/nav/Icon.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/nav/Icon.html", ctx)
};