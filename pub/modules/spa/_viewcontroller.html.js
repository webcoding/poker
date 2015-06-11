var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["modules/spa/_viewcontroller.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page\" data-route-name=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "routeName"), env.opts.autoescape);
output += "\"></div>";
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
return function(ctx, cb) { return nunjucks.render("modules/spa/_viewcontroller.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("modules/spa/_viewcontroller.html", ctx)
};