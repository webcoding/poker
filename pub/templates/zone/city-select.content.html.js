var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/zone/city-select.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container city-wrap\">\n    <h2></h2>\n\t";
output += "\n    <ul class=\"cities clearfix\">\n    </ul>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/zone/city-select.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/zone/city-select.content.html", ctx)
};