var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/toast/toast.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"popup toast\"><div class=\"content\"></div></div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/toast/toast.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/toast/toast.html", ctx)
};