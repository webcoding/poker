var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/detail.maininfo.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"type", env.opts.autoescape) != runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Type")),"CAMPAIGN_GIFT", env.opts.autoescape)) {
output += "\n\t";
output += "\n\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"left", env.opts.autoescape) <= 0) {
output += "\n\t\t<span class=\"btn-over\">抢完了</span>\n\t";
output += "\n\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "isTypeCountdown")) {
output += "\n\t\t";
output += "\n\t\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"countdown_buy_end_time", env.opts.autoescape) > runtime.contextOrFrameLookup(context, frame, "serverNow")) {
output += "\n\t\t\t<a class=\"btn-buy\" href=\"javascript:;\">立即购买</a>\n\t\t";
output += "\n\t\t";
;
}
else {
output += "\n\t\t\t<span class=\"btn-over\">已结束</span>\n\t\t";
;
}
output += "\n\t";
output += "\n\t";
;
}
else {
output += "\n\t\t<a class=\"btn-buy\" href=\"javascript:;\">立即购买</a>\n\t";
;
}
;
}
output += "\n";
;
}
output += "\n<p><strong>";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, (runtime.contextOrFrameLookup(context, frame, "current_price") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"current_price", env.opts.autoescape)))), env.opts.autoescape);
output += "</strong><del>";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"market_price", env.opts.autoescape))), env.opts.autoescape);
output += "</del></p>\n<h2>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"name", env.opts.autoescape), env.opts.autoescape);
output += "</h2>";
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
return function(ctx, cb) { return nunjucks.render("templates/item/detail.maininfo.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/detail.maininfo.html", ctx)
};