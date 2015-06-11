var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/other/notice.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["notifications", "className"], 
[], 
function (l_notifications, l_className, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("notifications", l_notifications);
frame.set("className", l_className);
var t_2 = "";t_2 += "\n\t<ul class=\"";
t_2 += runtime.suppressValue(l_className, env.opts.autoescape);
t_2 += "\">\n\t\t";
frame = frame.push();
var t_5 = l_notifications;
if(t_5) {var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("notification", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
t_2 += "\n\t\t<li>\n\t\t\t<h3>";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"title", env.opts.autoescape), env.opts.autoescape);
t_2 += "</h3>\n\t\t\t<span>";
t_2 += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((t_6),"time", env.opts.autoescape)), env.opts.autoescape);
t_2 += "</span>\n\t\t\t<p>";
t_2 += runtime.suppressValue(runtime.memberLookup((t_6),"content", env.opts.autoescape), env.opts.autoescape);
t_2 += "</p>\n\t\t</li>\n\t\t";
;
}
}
frame = frame.pop();
t_2 += "\n\t</ul>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("notifi");
context.setVariable("notifi", macro_t_1);
output += "\n\n<div class=\"page-container notifications\">\n\t<div class=\"content-wrap\">\n\t";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"system", env.opts.autoescape)) == 0 && env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"user", env.opts.autoescape)) == 0) {
output += "\n\n\t<p class=\"empty\">没有任何通知哦</p>\n\n\t";
;
}
else {
output += "\n\n\t";
output += runtime.suppressValue((lineno = 20, colno = 8, runtime.callWrap(macro_t_1, "notifi", [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"system", env.opts.autoescape),"system"])), env.opts.autoescape);
output += "\n\t";
output += runtime.suppressValue((lineno = 21, colno = 8, runtime.callWrap(macro_t_1, "notifi", [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"user", env.opts.autoescape),"users"])), env.opts.autoescape);
output += "\n\n\t";
;
}
output += "\n\t</div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/other/notice.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/other/notice.content.html", ctx)
};