var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/_downtip.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
if(runtime.contextOrFrameLookup(context, frame, "serverNowSec") < runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"countdown_start_time", env.opts.autoescape)) {
output += "\n\t";
output += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"countdown_start_time", env.opts.autoescape),"hh:mm"), env.opts.autoescape);
output += "开始降价\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "serverNowSec") < runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"countdown_end_time", env.opts.autoescape)) {
output += "\n\t降价中\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "serverNowSec") < runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"countdown_buy_end_time", env.opts.autoescape)) {
output += "\n\t到底价啦\n";
;
}
else {
output += "\n\t已结束\n";
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
return function(ctx, cb) { return nunjucks.render("templates/item/_downtip.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/_downtip.html", ctx)
};