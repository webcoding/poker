var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/order/_order_status.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["order", "Status", "Type"], 
[], 
function (l_order, l_Status, l_Type, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("order", l_order);
frame.set("Status", l_Status);
frame.set("Type", l_Type);
var t_2 = "";t_2 += "\n";
var t_3;
t_3 = runtime.memberLookup((l_order),"status", env.opts.autoescape);
frame.set("status", t_3, true);
if(!frame.parent) {
context.setVariable("status", t_3);
context.addExport("status");
}
t_2 += "\n";
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REFUNDED", env.opts.autoescape) || runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REFUND_REQUESTED", env.opts.autoescape) || runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REFUNDED_FAILED", env.opts.autoescape)) {
t_2 += "\n\t";
if(runtime.memberLookup((l_order),"refunded_at", env.opts.autoescape)) {
t_2 += "\n\t\t<p class=\"order-status-text refunded\">";
t_2 += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((l_order),"refunded_at", env.opts.autoescape),"YYYY-MM-dd"), env.opts.autoescape);
t_2 += " 退款</p>\n\t";
;
}
t_2 += "\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"WAITING_CONFIRM", env.opts.autoescape)) {
t_2 += "\n\t<p class=\"order-status-text waiting\">等待到账</p>\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"UNKNOWN", env.opts.autoescape)) {
t_2 += "\n\t<p class=\"order-status-text unknown\">等待确认</p>\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"PAID", env.opts.autoescape)) {
t_2 += "\n\t<p class=\"order-status-text paid\">";
t_2 += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((l_order),"expire_date", env.opts.autoescape),"YYYY-MM-dd hh:mm"), env.opts.autoescape);
t_2 += " 过期</p>\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"EXPIRED", env.opts.autoescape) || runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REDEEMED", env.opts.autoescape)) {
t_2 += "\n\t";
if(runtime.memberLookup((l_order),"redeem_time", env.opts.autoescape)) {
t_2 += "\n\t\t<p class=\"order-status-text used\">";
t_2 += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((l_order),"redeem_time", env.opts.autoescape),"YYYY-MM-dd hh:mm"), env.opts.autoescape);
t_2 += " 使用</p>\n\t";
;
}
else {
t_2 += "\n\t\t<p class=\"order-status-text used\">";
t_2 += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((l_order),"expire_date", env.opts.autoescape),"YYYY-MM-dd"), env.opts.autoescape);
t_2 += " 使用</p>\n\t";
;
}
t_2 += "\n";
;
}
;
}
;
}
;
}
;
}
t_2 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("orderStatusText");
context.setVariable("orderStatusText", macro_t_1);
output += "\n\n";
var macro_t_4 = runtime.makeMacro(
["order", "Status", "Type"], 
[], 
function (l_order, l_Status, l_Type, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("order", l_order);
frame.set("Status", l_Status);
frame.set("Type", l_Type);
var t_5 = "";t_5 += "\n";
var t_6;
t_6 = runtime.memberLookup((l_order),"status", env.opts.autoescape);
frame.set("status", t_6, true);
if(!frame.parent) {
context.setVariable("status", t_6);
context.addExport("status");
}
t_5 += "\n";
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REFUNDED", env.opts.autoescape) || runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REFUND_REQUESTED", env.opts.autoescape) || runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REFUNDED_FAILED", env.opts.autoescape)) {
t_5 += "\n<span class=\"order-status-btn refund\">已退款</span>\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"PAID", env.opts.autoescape)) {
t_5 += "\n\t";
t_5 += "\n\t";
t_5 += "\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"EXPIRED", env.opts.autoescape) || runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((l_Status),"REDEEMED", env.opts.autoescape)) {
t_5 += "\n\t";
if(runtime.memberLookup((l_order),"is_commented", env.opts.autoescape)) {
t_5 += "\n\t<span class=\"order-status-btn commented\">已评论</span>\n\t";
;
}
else {
t_5 += "\n\t";
t_5 += "\n\t";
t_5 += "\n\t";
;
}
t_5 += "\n";
;
}
;
}
;
}
t_5 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_5);
});
context.addExport("orderStatusBtn");
context.setVariable("orderStatusBtn", macro_t_4);
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
return function(ctx, cb) { return nunjucks.render("templates/order/_order_status.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/order/_order_status.html", ctx)
};