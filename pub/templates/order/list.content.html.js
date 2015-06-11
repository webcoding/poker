var nunjucks = require("nunjucks");

    
        
        require("templates/order/_order_status.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/order/list.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["orders", "type"], 
[], 
function (l_orders, l_type, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("orders", l_orders);
frame.set("type", l_type);
var t_2 = "";t_2 += "\n\t";
if(env.getFilter("length").call(context, l_orders)) {
t_2 += "\n\t";
var t_3;
t_3 = l_type == "countdown";
frame.set("isCountdown", t_3, true);
if(!frame.parent) {
context.setVariable("isCountdown", t_3);
context.addExport("isCountdown");
}
t_2 += "\n\t";
var t_4;
t_4 = l_type == "all";
frame.set("isAll", t_4, true);
if(!frame.parent) {
context.setVariable("isAll", t_4);
context.addExport("isAll");
}
t_2 += "\n\t";
if(!runtime.contextOrFrameLookup(context, frame, "isAll")) {
t_2 += "\n\t<p class=\"title\">\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "isCountdown")) {
t_2 += "\n\t\t倒计时\n\t\t";
;
}
else {
t_2 += "\n\t\t往下拍\n\t\t";
;
}
t_2 += "\n\t</p>\n\t";
;
}
t_2 += "\n\t<ul class=\"orders\n\t";
if(runtime.contextOrFrameLookup(context, frame, "isCountdown")) {
t_2 += "\n\tcountdown-orders\n\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "isAll")) {
t_2 += "\n\tall-orders\n\t";
;
}
else {
t_2 += "\n\tbargain-orders\n\t";
;
}
;
}
t_2 += "\n\t\">\n\t\t";
env.getTemplate("templates/order/_order_status.html", false, "templates/order/list.content.html", function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
frame.set("orderStatus", t_5);
t_2 += "\n\t\t";
frame = frame.push();
var t_10 = l_orders;
if(t_10) {var t_9 = t_10.length;
for(var t_8=0; t_8 < t_10.length; t_8++) {
var t_11 = t_10[t_8];
frame.set("order", t_11);
frame.set("loop.index", t_8 + 1);
frame.set("loop.index0", t_8);
frame.set("loop.revindex", t_9 - t_8);
frame.set("loop.revindex0", t_9 - t_8 - 1);
frame.set("loop.first", t_8 === 0);
frame.set("loop.last", t_8 === t_9 - 1);
frame.set("loop.length", t_9);
t_2 += "\n\t\t<li class=\"order\">\n\t\t\t<a href=\"";
t_2 += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ORDER_DETAIL", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"type",runtime.contextOrFrameLookup(context, frame, "orderType"),"order_id",runtime.memberLookup((t_11),"id", env.opts.autoescape)), env.opts.autoescape);
t_2 += "\">\n\t\t\t\t<img src=\"";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),"images", env.opts.autoescape)),0, env.opts.autoescape), env.opts.autoescape);
t_2 += "\" class=\"img\"/>\n\t\t\t\t<div class=\"content\">\n\t\t\t\t\t<div class=\"inner clearfix\">\n\t\t\t\t\t\t<h3>";
t_2 += runtime.suppressValue(runtime.memberLookup((t_11),"name", env.opts.autoescape), env.opts.autoescape);
t_2 += "</h3>\n\t\t\t\t\t\t";
if(runtime.memberLookup((t_11),"type", env.opts.autoescape) == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Type")),"NIGHT_MOTION", env.opts.autoescape)) {
t_2 += "\n\t\t\t\t\t\t<p class=\"price\">睡前摇</p>\n\t\t\t\t\t\t";
;
}
else {
t_2 += "\n\t\t\t\t\t\t<p class=\"price\">";
t_2 += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((t_11),"price", env.opts.autoescape))), env.opts.autoescape);
t_2 += "</p>\n\t\t\t\t\t\t";
;
}
t_2 += "\n\t\t\t\t\t\t<div class=\"time\">\n\t\t\t\t\t\t\t";
t_2 += runtime.suppressValue((lineno = 36, colno = 35, runtime.callWrap(runtime.memberLookup((t_5),"orderStatusText", env.opts.autoescape), "orderStatus[\"orderStatu\"]", [t_11,runtime.contextOrFrameLookup(context, frame, "Status"),runtime.contextOrFrameLookup(context, frame, "Type")])), env.opts.autoescape);
t_2 += "\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t";
t_2 += "\n\t\t\t\t\t\t<p class=\"shop\">";
t_2 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_11),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"name", env.opts.autoescape), env.opts.autoescape);
t_2 += "</p>\n\t\t\t\t\t\t";
t_2 += runtime.suppressValue((lineno = 46, colno = 33, runtime.callWrap(runtime.memberLookup((t_5),"orderStatusBtn", env.opts.autoescape), "orderStatus[\"orderStatu\"]", [t_11,runtime.contextOrFrameLookup(context, frame, "Status"),runtime.contextOrFrameLookup(context, frame, "Type")])), env.opts.autoescape);
t_2 += "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</li>\n\t\t";
;
}
}
frame = frame.pop();
t_2 += "\n\t</ul>\n\t";
})});
}
t_2 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("order");
context.setVariable("order", macro_t_1);
output += "\n\n";
var macro_t_12 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_13 = "";t_13 += "\n<p class=\"empty\">此处没有订单</p>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_13);
});
context.addExport("empty");
context.setVariable("empty", macro_t_12);
output += "\n\n<div class=\"page-container order-wrap\">\n\t";
if(runtime.contextOrFrameLookup(context, frame, "hasCategory")) {
output += "\n\t\t";
if(env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"bargain_orders", env.opts.autoescape)) == 0 && env.getFilter("length").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"countdown_orders", env.opts.autoescape)) == 0) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 63, colno = 9, runtime.callWrap(macro_t_12, "empty", [])), env.opts.autoescape);
output += "\n\t\t";
;
}
else {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 65, colno = 9, runtime.callWrap(macro_t_1, "order", [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"bargain_orders", env.opts.autoescape),"bargain"])), env.opts.autoescape);
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 66, colno = 9, runtime.callWrap(macro_t_1, "order", [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"countdown_orders", env.opts.autoescape),"countdown"])), env.opts.autoescape);
output += "\n\t\t";
;
}
output += "\n\t";
;
}
else {
output += "\n\t\t";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "data")) == 0) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 70, colno = 9, runtime.callWrap(macro_t_12, "empty", [])), env.opts.autoescape);
output += "\n\t\t";
;
}
else {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 72, colno = 9, runtime.callWrap(macro_t_1, "order", [runtime.contextOrFrameLookup(context, frame, "data"),"all"])), env.opts.autoescape);
output += "\n\t\t";
;
}
output += "\n\t";
;
}
output += "\n</div>\n";
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
return function(ctx, cb) { return nunjucks.render("templates/order/list.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/order/list.content.html", ctx)
};