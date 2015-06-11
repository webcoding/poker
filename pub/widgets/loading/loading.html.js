var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/loading/loading.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"loading ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "className"), env.opts.autoescape);
output += "\">\n\t<div class=\"inner\">\n\t\t<div class=\"circle\"></div>\n\t</div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/loading/loading.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/loading/loading.html", ctx)
};