var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/action_motion/start.parts.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["start_time", "end_time"], 
[], 
function (l_start_time, l_end_time, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("start_time", l_start_time);
frame.set("end_time", l_end_time);
var t_2 = "";t_2 += "\n<div class=\"banner\">\n\t<img src=\"night_motion/banner.png\" alt=\"\"/>\n\t<p class=\"time\">每日活动时间：";
t_2 += runtime.suppressValue(env.getFilter("formatTime").call(context, l_start_time,"hh:mm"), env.opts.autoescape);
t_2 += "-";
t_2 += runtime.suppressValue(env.getFilter("formatTime").call(context, l_end_time,"hh:mm"), env.opts.autoescape);
t_2 += "</p>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("banner");
context.setVariable("banner", macro_t_1);
output += "\n\n";
var macro_t_3 = runtime.makeMacro(
["canMotion"], 
[], 
function (l_canMotion, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("canMotion", l_canMotion);
var t_4 = "";t_4 += "\n<div class=\"box\">\n\t";
if(l_canMotion) {
t_4 += "\n\t<p class=\"tip\">快来摇我拿奖品吧~</p>\n\t";
;
}
else {
t_4 += "\n\t<p class=\"tip\">快来戳我拿奖品吧~</p>\n\t";
;
}
t_4 += "\n\t<img src=\"night_motion/box.png\" alt=\"\"/>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_4);
});
context.addExport("box");
context.setVariable("box", macro_t_3);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
["users"], 
[], 
function (l_users, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("users", l_users);
var t_6 = "";t_6 += "\n\t";
if(env.getFilter("length").call(context, l_users)) {
t_6 += "\n\t<div class=\"userlist\">\n\t\t<div class=\"inner\">\n\t\t\t<ul>\n\t\t\t";
frame = frame.push();
var t_9 = l_users;
if(t_9) {var t_8 = t_9.length;
for(var t_7=0; t_7 < t_9.length; t_7++) {
var t_10 = t_9[t_7];
frame.set("user", t_10);
frame.set("loop.index", t_7 + 1);
frame.set("loop.index0", t_7);
frame.set("loop.revindex", t_8 - t_7);
frame.set("loop.revindex0", t_8 - t_7 - 1);
frame.set("loop.first", t_7 === 0);
frame.set("loop.last", t_7 === t_8 - 1);
frame.set("loop.length", t_8);
t_6 += "\n\t\t\t\t<li>";
t_6 += runtime.suppressValue(runtime.memberLookup((t_10),"mobile", env.opts.autoescape) || runtime.memberLookup((t_10),"user_name", env.opts.autoescape), env.opts.autoescape);
t_6 += "刚刚摇到";
t_6 += runtime.suppressValue(runtime.memberLookup((t_10),"item_name", env.opts.autoescape), env.opts.autoescape);
t_6 += "</li>\n\t\t\t";
;
}
}
frame = frame.pop();
t_6 += "\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n\t";
;
}
t_6 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_6);
});
context.addExport("userlist");
context.setVariable("userlist", macro_t_5);
output += "\n\n";
var macro_t_11 = runtime.makeMacro(
["left", "show_text"], 
[], 
function (l_left, l_show_text, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("left", l_left);
frame.set("show_text", l_show_text);
var t_12 = "";t_12 += "\n\t<div class=\"life\">\n\t\t<p>\n\t\t\t";
frame = frame.push();
var t_15 = (lineno = 35, colno = 18, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "range"), "range", [0,3]));
if(t_15) {var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("i", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_12 += "\n\t\t\t<span class=\"star ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape) < l_left) {
t_12 += "star-alive ";
;
}
t_12 += "\">️</span>\n\t\t\t";
;
}
}
frame = frame.pop();
t_12 += "\n\t\t</p>\n\t\t";
t_12 += "\n\t\t";
if(l_show_text) {
t_12 += "\n\t\t\t<p>\n\t\t\t\t";
if(l_left > 0) {
t_12 += "\n\t\t\t\t\t今天还有";
t_12 += runtime.suppressValue(l_left, env.opts.autoescape);
t_12 += "次机会哦~不满意就重来吧!\n\t\t\t\t";
;
}
else {
t_12 += "\n\t\t\t\t\t您今天的摇奖机会已经用完啦~赶快收了这个奖品吧(n_n)\n\t\t\t\t";
;
}
t_12 += "\n\t\t\t\t<br>15分钟内领取有效哦\n\t\t\t</p>\n\t\t";
;
}
t_12 += "\n\t</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_12);
});
context.addExport("life");
context.setVariable("life", macro_t_11);
output += "\n\n";
var macro_t_17 = runtime.makeMacro(
["item", "pool_id"], 
[], 
function (l_item, l_pool_id, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("item", l_item);
frame.set("pool_id", l_pool_id);
var t_18 = "";t_18 += "\n\t<div class=\"item clearfix\" ";
if(l_pool_id) {
t_18 += " data-is-locked-item=\"true\" data-pool-id=\"";
t_18 += runtime.suppressValue(l_pool_id, env.opts.autoescape);
t_18 += "\"";
;
}
t_18 += ">\n\t\t<div class=\"inner\">\n\t\t\t<img src=\"";
t_18 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((l_item),"images", env.opts.autoescape)),0, env.opts.autoescape), env.opts.autoescape);
t_18 += "\" alt=\"\"/>\n\t\t\t<div class=\"info\">\n\t\t\t\t<h3>";
t_18 += runtime.suppressValue(runtime.memberLookup((l_item),"name", env.opts.autoescape), env.opts.autoescape);
t_18 += "</h3>\n\t\t\t\t<p>\n\t\t\t\t\t<span class=\"mkt-price\">";
t_18 += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((l_item),"market_price", env.opts.autoescape))), env.opts.autoescape);
t_18 += "</span>\n\t\t\t\t\t<span class=\"curr-price\">";
t_18 += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, 0)), env.opts.autoescape);
t_18 += "</span>\n\t\t\t\t</p>\n\t\t\t\t<p class=\"branch\">";
t_18 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((l_item),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"name", env.opts.autoescape), env.opts.autoescape);
t_18 += "</p>\n\t\t\t\t<p class=\"addr\">";
t_18 += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((l_item),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"address", env.opts.autoescape), env.opts.autoescape);
t_18 += "</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_18);
});
context.addExport("item");
context.setVariable("item", macro_t_17);
output += "\n\n";
var macro_t_19 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_20 = "";t_20 += "\n\n";
;
frame = frame.pop();
return new runtime.SafeString(t_20);
});
context.addExport("prize");
context.setVariable("prize", macro_t_19);
output += "\n\n";
var macro_t_21 = runtime.makeMacro(
["type"], 
[], 
function (l_type, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("type", l_type);
var t_22 = "";t_22 += "\n    <div class=\"avatar\n    ";
if(l_type == 1) {
t_22 += "\n    avatar-laught\n    ";
;
}
else {
if(l_type == 2) {
t_22 += "\n    avatar-cry\n    ";
;
}
else {
if(l_type == 3) {
t_22 += "\n    avatar-blink\n    ";
;
}
else {
if(l_type == 4) {
t_22 += "\n    avatar-smile\n    ";
;
}
;
}
;
}
;
}
t_22 += "\"></div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_22);
});
context.addExport("avatar");
context.setVariable("avatar", macro_t_21);
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
return function(ctx, cb) { return nunjucks.render("templates/action_motion/start.parts.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/action_motion/start.parts.html", ctx)
};