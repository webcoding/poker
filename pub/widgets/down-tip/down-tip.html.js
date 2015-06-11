var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/down-tip/down-tip.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"\">\n\t<i class=\"close\">x</i>\n\t";
output += "\n\t<a class=\"btn-download\" data-type=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "tipType"), env.opts.autoescape);
output += "\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"DOWNLOAD", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"from",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"DOWNLOAD_FROM_BOTTOM_TIP", env.opts.autoescape),"type",runtime.contextOrFrameLookup(context, frame, "tipType")), env.opts.autoescape);
output += "\">\n\t\t<img src=\"logo_80.png\">\n\t\t<span>\n\t\t\t下载爱抢购App,\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "tipType") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Type")),"BUY_FASTER", env.opts.autoescape)) {
output += "\n\t\t\t抢购快十倍\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "tipType") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Type")),"MONEY_EVERY_DAY", env.opts.autoescape)) {
output += "\n\t\t\t天天有钱送\n\t\t";
;
}
;
}
output += "\n\t\t</span>\n\t\t<b>立即体验</b>\n\t</a>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/down-tip/down-tip.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/down-tip/down-tip.html", ctx)
};