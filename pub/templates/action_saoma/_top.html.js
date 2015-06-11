var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/action_saoma/_top.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
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
return function(ctx, cb) { return nunjucks.render("templates/action_saoma/_top.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/action_saoma/_top.html", ctx)
};