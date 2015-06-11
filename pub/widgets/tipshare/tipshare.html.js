var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/tipshare/tipshare.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"tipshare\">\n\t<img src=\"share-arrow.png\" alt=\"\" class=\"arrow\"/>\n\t<p class=\"content\"></p>\n\t<div class=\"mask\"></div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/tipshare/tipshare.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/tipshare/tipshare.html", ctx)
};