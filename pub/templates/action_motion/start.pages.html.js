var nunjucks = require("nunjucks");

    
        
        require("templates/action_motion/start.parts.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/action_motion/start.pages.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
env.getTemplate("templates/action_motion/start.parts.html", false, "templates/action_motion/start.pages.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(t_1.hasOwnProperty("banner")) {
var t_4 = t_1.banner;
} else {
cb(new Error("cannot import 'banner'")); return;
}
context.setVariable("banner", t_4);
if(t_1.hasOwnProperty("box")) {
var t_5 = t_1.box;
} else {
cb(new Error("cannot import 'box'")); return;
}
context.setVariable("box", t_5);
if(t_1.hasOwnProperty("userlist")) {
var t_6 = t_1.userlist;
} else {
cb(new Error("cannot import 'userlist'")); return;
}
context.setVariable("userlist", t_6);
if(t_1.hasOwnProperty("life")) {
var t_7 = t_1.life;
} else {
cb(new Error("cannot import 'life'")); return;
}
context.setVariable("life", t_7);
if(t_1.hasOwnProperty("item")) {
var t_8 = t_1.item;
} else {
cb(new Error("cannot import 'item'")); return;
}
context.setVariable("item", t_8);
if(t_1.hasOwnProperty("avatar")) {
var t_9 = t_1.avatar;
} else {
cb(new Error("cannot import 'avatar'")); return;
}
context.setVariable("avatar", t_9);
output += "\n\n";
var macro_t_10 = runtime.makeMacro(
["taken_order"], 
[], 
function (l_taken_order, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("taken_order", l_taken_order);
var t_11 = "";t_11 += "\n<div class=\"page-claimed\" data-order-id=\"";
t_11 += runtime.suppressValue(runtime.memberLookup((l_taken_order),"id", env.opts.autoescape), env.opts.autoescape);
t_11 += "\">\n\t";
t_11 += runtime.suppressValue((lineno = 4, colno = 8, runtime.callWrap(t_9, "avatar", [3])), env.opts.autoescape);
t_11 += "\n\t<p>";
t_11 += runtime.suppressValue(runtime.memberLookup((l_taken_order),"name", env.opts.autoescape), env.opts.autoescape);
t_11 += "领取成功!\n\t\t<br>\n\t\t奖品已经发送到您的订单中啦~\n\t</p>\n\t<p>火速像小伙伴们炫耀一下吧~\n\t\t<br>\n\t\t分享还能攒人品，增加<b>5</b>倍概率哦~\n\t</p>\n\t<a href=\"javascript:;\" class=\"button btn-share\">立即分享</a>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_11);
});
context.addExport("page_claimed");
context.setVariable("page_claimed", macro_t_10);
output += "\n\n";
var macro_t_12 = runtime.makeMacro(
["locked_item", "left_times", "start_time", "end_time", "can_motion", "show_life_text"], 
[], 
function (l_locked_item, l_left_times, l_start_time, l_end_time, l_can_motion, l_show_life_text, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("locked_item", l_locked_item);
frame.set("left_times", l_left_times);
frame.set("start_time", l_start_time);
frame.set("end_time", l_end_time);
frame.set("can_motion", l_can_motion);
frame.set("show_life_text", l_show_life_text);
var t_13 = "";t_13 += "\n<div class=\"page-locked\">\n\t";
t_13 += runtime.suppressValue((lineno = 19, colno = 8, runtime.callWrap(t_4, "banner", [l_start_time,l_end_time,l_can_motion])), env.opts.autoescape);
t_13 += "\n\t";
t_13 += runtime.suppressValue((lineno = 20, colno = 5, runtime.callWrap(t_5, "box", [l_can_motion])), env.opts.autoescape);
t_13 += "\n\t";
t_13 += runtime.suppressValue((lineno = 21, colno = 6, runtime.callWrap(t_7, "life", [l_left_times,l_show_life_text])), env.opts.autoescape);
t_13 += "\n\t";
t_13 += runtime.suppressValue((lineno = 22, colno = 6, runtime.callWrap(t_8, "item", [runtime.memberLookup((l_locked_item),"item", env.opts.autoescape),runtime.memberLookup((l_locked_item),"pool_id", env.opts.autoescape)])), env.opts.autoescape);
t_13 += "\n\t<a href=\"javascript:;\" class=\"button btn-claim\">领取</a>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_13);
});
context.addExport("page_have_locked");
context.setVariable("page_have_locked", macro_t_12);
output += "\n\n";
var macro_t_14 = runtime.makeMacro(
["start_time", "end_time"], 
[], 
function (l_start_time, l_end_time, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("start_time", l_start_time);
frame.set("end_time", l_end_time);
var t_15 = "";t_15 += "\n<div class=\"page-not-start\">\n\t";
t_15 += runtime.suppressValue((lineno = 29, colno = 8, runtime.callWrap(t_4, "banner", [l_start_time,l_end_time,runtime.contextOrFrameLookup(context, frame, "can_motion")])), env.opts.autoescape);
t_15 += "\n\t";
t_15 += runtime.suppressValue((lineno = 30, colno = 8, runtime.callWrap(t_9, "avatar", [4])), env.opts.autoescape);
t_15 += "\n\t<p>亲，活动还没开始呢~</p>\n\t<p>";
t_15 += runtime.suppressValue(env.getFilter("formatTime").call(context, l_start_time,"hh:mm"), env.opts.autoescape);
t_15 += "再来摇一摇吧!</p>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_15);
});
context.addExport("page_not_start");
context.setVariable("page_not_start", macro_t_14);
output += "\n\n";
var macro_t_16 = runtime.makeMacro(
["start_time", "end_time"], 
[], 
function (l_start_time, l_end_time, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("start_time", l_start_time);
frame.set("end_time", l_end_time);
var t_17 = "";t_17 += "\n<div class=\"page-time-over\">\n\t";
t_17 += runtime.suppressValue((lineno = 38, colno = 8, runtime.callWrap(t_4, "banner", [l_start_time,l_end_time,runtime.contextOrFrameLookup(context, frame, "can_motion")])), env.opts.autoescape);
t_17 += "\n\t";
t_17 += runtime.suppressValue((lineno = 39, colno = 8, runtime.callWrap(t_9, "avatar", [2])), env.opts.autoescape);
t_17 += "\n\t<p>哎呦~今天的睡前摇已经结束啦~</p>\n\t<p>明天早点来吧~</p>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_17);
});
context.addExport("page_time_over");
context.setVariable("page_time_over", macro_t_16);
output += "\n\n";
var macro_t_18 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_19 = "";t_19 += "\n<div class=\"page-life-over\">\n\t";
t_19 += runtime.suppressValue((lineno = 47, colno = 8, runtime.callWrap(t_9, "avatar", [2])), env.opts.autoescape);
t_19 += "\n\t<p>哎呦~今天机会已经全部用完啦~</p>\n\t<p>记得明天再来吧~</p>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_19);
});
context.addExport("page_life_over");
context.setVariable("page_life_over", macro_t_18);
output += "\n\n";
var macro_t_20 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_21 = "";t_21 += "\n<div class=\"page-pool-empty\">\n\t";
t_21 += runtime.suppressValue((lineno = 55, colno = 8, runtime.callWrap(t_9, "avatar", [2])), env.opts.autoescape);
t_21 += "\n\t<p>哎呦~今天的奖品已经全部抢完啦~</p>\n\t<p>明天早点来吧~</p>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_21);
});
context.addExport("page_pool_empty");
context.setVariable("page_pool_empty", macro_t_20);
output += "\n\n";
var macro_t_22 = runtime.makeMacro(
["users", "left_times", "start_time", "end_time", "can_motion", "show_life_text"], 
[], 
function (l_users, l_left_times, l_start_time, l_end_time, l_can_motion, l_show_life_text, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("users", l_users);
frame.set("left_times", l_left_times);
frame.set("start_time", l_start_time);
frame.set("end_time", l_end_time);
frame.set("can_motion", l_can_motion);
frame.set("show_life_text", l_show_life_text);
var t_23 = "";t_23 += "\n<div class=\"page-normal\">\n\t";
t_23 += runtime.suppressValue((lineno = 63, colno = 8, runtime.callWrap(t_4, "banner", [l_start_time,l_end_time])), env.opts.autoescape);
t_23 += "\n\t";
t_23 += runtime.suppressValue((lineno = 64, colno = 5, runtime.callWrap(t_5, "box", [l_can_motion])), env.opts.autoescape);
t_23 += "\n\t";
t_23 += runtime.suppressValue((lineno = 65, colno = 6, runtime.callWrap(t_7, "life", [l_left_times,l_show_life_text])), env.opts.autoescape);
t_23 += "\n\t";
t_23 += runtime.suppressValue((lineno = 66, colno = 10, runtime.callWrap(t_6, "userlist", [l_users])), env.opts.autoescape);
t_23 += "\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_23);
});
context.addExport("page_normal");
context.setVariable("page_normal", macro_t_22);
output += "\n\n";
var macro_t_24 = runtime.makeMacro(
["_item", "route"], 
[], 
function (l__item, l_route, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("_item", l__item);
frame.set("route", l_route);
var t_25 = "";t_25 += "\n<div class=\"page-shared\">\n\t";
t_25 += runtime.suppressValue((lineno = 72, colno = 8, runtime.callWrap(t_9, "avatar", [1])), env.opts.autoescape);
t_25 += "\n\t<p class=\"tip\">哇~你的朋友刚刚摇到了 ";
t_25 += runtime.suppressValue(runtime.memberLookup((l__item),"name", env.opts.autoescape), env.opts.autoescape);
t_25 += "！</p>\n\t<p class=\"tip\">你还不赶快去摇一摇吗~</p>\n\t";
t_25 += runtime.suppressValue((lineno = 75, colno = 6, runtime.callWrap(t_8, "item", [l__item])), env.opts.autoescape);
t_25 += "\n\t<a class=\"button\" href=\"";
t_25 += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((l_route),"R", env.opts.autoescape)),"A_MOTION_START", env.opts.autoescape),l_route), env.opts.autoescape);
t_25 += "\">我也要玩</a>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_25);
});
context.addExport("page_shared");
context.setVariable("page_shared", macro_t_24);
output += "\n\n";
var macro_t_26 = runtime.makeMacro(
["msg"], 
[], 
function (l_msg, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("msg", l_msg);
var t_27 = "";t_27 += "\n<div class=\"page-error\">\n\t";
t_27 += runtime.suppressValue((lineno = 82, colno = 8, runtime.callWrap(t_9, "avatar", [2])), env.opts.autoescape);
t_27 += "\n\t<p>";
t_27 += runtime.suppressValue(l_msg, env.opts.autoescape);
t_27 += "</p>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_27);
});
context.addExport("page_error");
context.setVariable("page_error", macro_t_26);
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("templates/action_motion/start.pages.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/action_motion/start.pages.html", ctx)
};