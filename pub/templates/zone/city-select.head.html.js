var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/zone/city-select.head.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
if(runtime.contextOrFrameLookup(context, frame, "status") == "locating") {
output += "\n    定位中...\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == "success") {
output += "\n    定位城市：\n\t";
if(runtime.contextOrFrameLookup(context, frame, "isCityAvailable")) {
output += "\n\t\t<a href=\"javascript:;\" class=\"city\" data-action=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "action"), env.opts.autoescape);
output += "\" data-available=\"true\" data-city='";
output += runtime.suppressValue(env.getFilter("json_encode").call(context, runtime.contextOrFrameLookup(context, frame, "city")), env.opts.autoescape);
output += "'>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "city")),"name", env.opts.autoescape), env.opts.autoescape);
output += "</a>\n\t";
;
}
else {
output += "\n\t\t<span class=\"city city-not-available\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "cityName"), env.opts.autoescape);
output += "</span>（暂未开通）\n\t";
;
}
output += "\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == "fail") {
output += "\n    <span class=\"re-pos\">点击获取当前位置所在城市</span>\n";
;
}
;
}
;
}
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
return function(ctx, cb) { return nunjucks.render("templates/zone/city-select.head.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/zone/city-select.head.html", ctx)
};