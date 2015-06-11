var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/nav/nav.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["tab"], 
[], 
function (l_tab, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("tab", l_tab);
var t_2 = "";t_2 += "\n<div class=\"tab app-nav-tab ";
if(runtime.memberLookup((l_tab),"active", env.opts.autoescape)) {
t_2 += "active";
;
}
t_2 += " ";
if(runtime.memberLookup((l_tab),"subMenu", env.opts.autoescape)) {
t_2 += "tab-dropdown";
;
}
t_2 += "\">\n\t<a data-nav-type=\"replace\" data-nav-href=\"\" href=\"\n\t";
if(runtime.memberLookup((l_tab),"url", env.opts.autoescape)) {
t_2 += "\n\t\t";
t_2 += runtime.suppressValue(runtime.memberLookup((l_tab),"url", env.opts.autoescape), env.opts.autoescape);
t_2 += "\n\t";
;
}
else {
t_2 += "\n\t\tjavascript:;\n\t";
;
}
t_2 += "\n\t\">";
t_2 += runtime.suppressValue(runtime.memberLookup((l_tab),"text", env.opts.autoescape), env.opts.autoescape);
t_2 += "</a>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("macro_tab");
context.setVariable("macro_tab", macro_t_1);
output += "\n\n";
var macro_t_3 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_4 = "";t_4 += "\n<div class=\"tabs app-nav-tab-wrapper clearfix\"></div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_4);
});
context.addExport("macro_tab_manager");
context.setVariable("macro_tab_manager", macro_t_3);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_6 = "";t_6 += "\n<i class=\"arrow-down\"></i>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_6);
});
context.addExport("macro_arrow");
context.setVariable("macro_arrow", macro_t_5);
output += "\n\n";
var macro_t_7 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_8 = "";t_8 += "\n<div id=\"app-nav\">\n\t<div class=\"wrap\">\n\t\t<div class=\"app-nav-main\">\n\t\t\t<div class=\"btn-left nav-item\" data-action=\"\">\n\t\t\t\t<a href=\"javascript:;\" class=\"inner\"></a>\n\t\t\t</div>\n\t\t\t<h1 class=\"title nav-item\" data-action=\"\">\n\t\t\t\t<a href=\"javascript:;\" class=\"inner single-line\"></a>\n\t\t\t</h1>\n\t\t\t<!--<div class=\"btn-right nav-item\" data-action=\"\">-->\n\t\t\t\t<!--<a href=\"javascript:;\" class=\"inner\"></a>-->\n\t\t\t<!--</div>-->\n\t\t\t<a href=\"javascript:;\" class=\"btn-right nav-item\" data-action=\"\"></a>\n\t\t</div>\n\t\t<div class=\"app-nav-tab-container\"></div>\n\t</div>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_8);
});
context.addExport("macro_main");
context.setVariable("macro_main", macro_t_7);
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
return function(ctx, cb) { return nunjucks.render("widgets/nav/nav.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/nav/nav.html", ctx)
};