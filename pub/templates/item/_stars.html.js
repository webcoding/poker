var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/_stars.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["c"], 
[], 
function (l_c, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("c", l_c);
var t_2 = "";t_2 += "\n<span class=\"stars\" data-rating=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((l_c),"rating", env.opts.autoescape), env.opts.autoescape);
t_2 += "\">\n    ";
frame = frame.push();
var t_5 = (lineno = 2, colno = 19, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", [0,5]));
if(t_5) {var t_4 = t_5.length;
for(var t_3=0; t_3 < t_5.length; t_3++) {
var t_6 = t_5[t_3];
frame.set("i", t_6);
frame.set("loop.index", t_3 + 1);
frame.set("loop.index0", t_3);
frame.set("loop.revindex", t_4 - t_3);
frame.set("loop.revindex0", t_4 - t_3 - 1);
frame.set("loop.first", t_3 === 0);
frame.set("loop.last", t_3 === t_4 - 1);
frame.set("loop.length", t_4);
t_2 += "\n    <i class=\"text-icon\n    ";
if(runtime.memberLookup((l_c),"rating", env.opts.autoescape) >= t_6 + 1) {
t_2 += "icon-star ";
;
}
else {
t_2 += "icon-star-gray ";
;
}
t_2 += "\n    \">\n        ";
var t_7;
t_7 = t_6 + 1 - runtime.memberLookup((l_c),"rating", env.opts.autoescape);
frame.set("diff", t_7, true);
if(!frame.parent) {
context.setVariable("diff", t_7);
context.addExport("diff");
}
t_2 += "\n        ";
if(runtime.contextOrFrameLookup(context, frame, "diff") > 0 && runtime.contextOrFrameLookup(context, frame, "diff") < 1) {
t_2 += "\n        ";
var t_8;
t_8 = (1 - runtime.contextOrFrameLookup(context, frame, "diff")) * 100;
frame.set("percent", t_8, true);
if(!frame.parent) {
context.setVariable("percent", t_8);
context.addExport("percent");
}
t_2 += "\n        <i class=\"text-icon icon-star-partial\" style=\"width: ";
t_2 += runtime.suppressValue(env.getFilter("round").call(context, runtime.contextOrFrameLookup(context, frame, "percent")), env.opts.autoescape);
t_2 += "%\"></i>\n        ";
;
}
t_2 += "\n    </i>\n    ";
;
}
}
frame = frame.pop();
t_2 += "\n</span>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("star");
context.setVariable("star", macro_t_1);
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
return function(ctx, cb) { return nunjucks.render("templates/item/_stars.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/_stars.html", ctx)
};