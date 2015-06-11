var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/pagination/pagination.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"iqg-pagination clearfix\">\n\t";
if(runtime.contextOrFrameLookup(context, frame, "prevHref")) {
output += "\n\t<span class=\"prev active\" data-action='navUtil.back(\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "prevHref"), env.opts.autoescape);
output += "\")'>上一页</span>\n\t";
;
}
else {
output += "\n\t<span class=\"prev\">上一页</span>\n\t";
;
}
output += "\n\t";
if(runtime.contextOrFrameLookup(context, frame, "nextHref")) {
output += "\n\t<a class=\"next active\" href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "nextHref"), env.opts.autoescape);
output += "\">下一页</a>\n\t";
;
}
else {
output += "\n\t<span class=\"next\">下一页</span>\n\t";
;
}
output += "\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/pagination/pagination.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/pagination/pagination.html", ctx)
};