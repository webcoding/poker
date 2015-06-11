var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/c-item/_item_tip.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["item"], 
[], 
function (l_item, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("item", l_item);
var t_2 = "";t_2 += "\n\t<h3>特别提示</h3>\n\t<div class=\"block-content\">\n\t\t<ul class=\"clearfix\">\n\t\t\t";
t_2 += "\n\t\t\t<li>";
if(runtime.memberLookup((l_item),"need_book", env.opts.autoescape) == 0) {
t_2 += "无";
;
}
t_2 += "需预约</li>\n\t\t\t<li>有效期";
t_2 += runtime.suppressValue(runtime.memberLookup((l_item),"redeem_period", env.opts.autoescape), env.opts.autoescape);
t_2 += "天</li>\n\t\t\t<li>";
if(runtime.memberLookup((l_item),"allow_take_out", env.opts.autoescape) == 0) {
t_2 += "限堂吃";
;
}
else {
if(runtime.memberLookup((l_item),"allow_take_out", env.opts.autoescape) == 1) {
;
}
else {
;
}
;
}
t_2 += "</li>\n\t\t</ul>\n\t\t<p class=\"tips\">";
t_2 += runtime.suppressValue(env.getFilter("nl2br").call(context, runtime.memberLookup((l_item),"tips", env.opts.autoescape)), env.opts.autoescape);
t_2 += "</p>\n\t</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("tip");
context.setVariable("tip", macro_t_1);
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
return function(ctx, cb) { return nunjucks.render("templates/c-item/_item_tip.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/c-item/_item_tip.html", ctx)
};