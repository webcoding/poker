var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/loading2/loading.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"loading2\">\n\t<div class=\"mask\"></div>\n\t<div class=\"spinner\">\n\t\t<div class=\"spinner-container container1\">\n\t\t\t<div class=\"circle1\"></div>\n\t\t\t<div class=\"circle2\"></div>\n\t\t\t<div class=\"circle3\"></div>\n\t\t\t<div class=\"circle4\"></div>\n\t\t</div>\n\t\t<div class=\"spinner-container container2\">\n\t\t\t<div class=\"circle1\"></div>\n\t\t\t<div class=\"circle2\"></div>\n\t\t\t<div class=\"circle3\"></div>\n\t\t\t<div class=\"circle4\"></div>\n\t\t</div>\n\t\t<div class=\"spinner-container container3\">\n\t\t\t<div class=\"circle1\"></div>\n\t\t\t<div class=\"circle2\"></div>\n\t\t\t<div class=\"circle3\"></div>\n\t\t\t<div class=\"circle4\"></div>\n\t\t</div>\n\t</div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/loading2/loading.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/loading2/loading.html", ctx)
};