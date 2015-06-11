var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/zone/address-select.macro.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
["cbdLng", "cbdLat", "cbdName", "shouldFav", "route"], 
[], 
function (l_cbdLng, l_cbdLat, l_cbdName, l_shouldFav, l_route, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("cbdLng", l_cbdLng);
frame.set("cbdLat", l_cbdLat);
frame.set("cbdName", l_cbdName);
frame.set("shouldFav", l_shouldFav);
frame.set("route", l_route);
var t_2 = "";t_2 += "\n<a href=\"javascript:;\"\n   data-lng=\"";
t_2 += runtime.suppressValue(l_cbdLng, env.opts.autoescape);
t_2 += "\"\n   data-lat=\"";
t_2 += runtime.suppressValue(l_cbdLat, env.opts.autoescape);
t_2 += "\"\n   data-name=\"";
t_2 += runtime.suppressValue(l_cbdName, env.opts.autoescape);
t_2 += "\"\n   class=\"cbd-point\">\n\t";
t_2 += runtime.suppressValue(l_cbdName, env.opts.autoescape);
t_2 += "\n</a>\n";
t_2 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("macro_located");
context.setVariable("macro_located", macro_t_1);
output += "\n\n";
var macro_t_3 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_4 = "";t_4 += "\n定位中...\n";
;
frame = frame.pop();
return new runtime.SafeString(t_4);
});
context.addExport("macro_locating");
context.setVariable("macro_locating", macro_t_3);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_6 = "";t_6 += "\n<span class=\"click-to-geo\">点击获取当前位置</span>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_6);
});
context.addExport("macro_clicktogeo");
context.setVariable("macro_clicktogeo", macro_t_5);
output += "\n\n";
var macro_t_7 = runtime.makeMacro(
["cityName", "usingAddr"], 
[], 
function (l_cityName, l_usingAddr, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("cityName", l_cityName);
frame.set("usingAddr", l_usingAddr);
var t_8 = "";t_8 += "\n<div class=\"page-container page-address-wrap\">\n\t<div class=\"item-cbd-wrap\">\n\t\t";
t_8 += "\n\t\t<div class=\"block position-block use-addr\">\n\t\t\t<h3 class=\"use-addr\">当前使用位置</h3>\n\t\t\t<p class=\"use-addr-content\">";
t_8 += runtime.suppressValue(l_usingAddr, env.opts.autoescape);
t_8 += "</p>\n\t\t</div>\n\t\t<div class=\"block position-block title-pos\">\n\t\t\t<h3 class=\"title-pos\">当前定位位置</h3>\n\t\t\t<p class=\"position\">定位中...</p>\n\t\t</div>\n\t\t<div class=\"search-body\"></div>\n\t</div>\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_8);
});
context.addExport("macro_main");
context.setVariable("macro_main", macro_t_7);
output += "\n\n";
var macro_t_9 = runtime.makeMacro(
["branches", "cbd", "fav", "history"], 
[], 
function (l_branches, l_cbd, l_fav, l_history, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("branches", l_branches);
frame.set("cbd", l_cbd);
frame.set("fav", l_fav);
frame.set("history", l_history);
var t_10 = "";t_10 += "\n";
if(env.getFilter("length").call(context, l_branches)) {
t_10 += "\n<div class=\"block block-multi-line branches\">\n\t<h3 class=\"title-hot\">推荐商家</h3>\n\t<div class=\"addrs branches\">\n\t\t";
t_10 += runtime.suppressValue((lineno = 50, colno = 12, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "macro_cbd"), "macro_cbd", [l_branches])), env.opts.autoescape);
t_10 += "\n\t</div>\n</div>\n";
;
}
t_10 += "\n";
if(env.getFilter("length").call(context, l_cbd)) {
t_10 += "\n<div class=\"block block-multi-line\">\n\t<h3 class=\"title-hot\">热门商圈[";
t_10 += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "cityName"), env.opts.autoescape);
t_10 += "]</h3>\n\t<div class=\"addrs cbd\">\n\t\t";
t_10 += runtime.suppressValue((lineno = 58, colno = 12, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "macro_cbd"), "macro_cbd", [l_cbd])), env.opts.autoescape);
t_10 += "\n\t</div>\n</div>\n";
;
}
t_10 += "\n";
if(env.getFilter("length").call(context, l_fav)) {
t_10 += "\n<div class=\"block block-multi-line\">\n\t<h3 class=\"title-fav\">收藏地址</h3>\n\t<div class=\"list addressbook\">\n\t\t";
t_10 += runtime.suppressValue((lineno = 66, colno = 20, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "macro_addressbook"), "macro_addressbook", [l_fav])), env.opts.autoescape);
t_10 += "\n\t</div>\n</div>\n";
;
}
t_10 += "\n";
if(env.getFilter("length").call(context, l_history)) {
t_10 += "\n<div class=\"block block-multi-line\">\n\t<h3 class=\"title-search\">搜索历史</h3>\n\t<div class=\"list search-history\">\n\t\t";
t_10 += runtime.suppressValue((lineno = 74, colno = 20, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "macro_addressbook"), "macro_addressbook", [l_history])), env.opts.autoescape);
t_10 += "\n\t</div>\n</div>\n";
;
}
t_10 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_10);
});
context.addExport("macro_body");
context.setVariable("macro_body", macro_t_9);
output += "\n\n";
var macro_t_11 = runtime.makeMacro(
["addressbook"], 
[], 
function (l_addressbook, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("addressbook", l_addressbook);
var t_12 = "";t_12 += "\n\t";
if(env.getFilter("length").call(context, l_addressbook)) {
t_12 += "\n\t\t<div class=\"inner\">\n\t\t\t<ul class=\"row\">\n\t\t\t";
frame = frame.push();
var t_15 = l_addressbook;
if(t_15) {var t_14 = t_15.length;
for(var t_13=0; t_13 < t_15.length; t_13++) {
var t_16 = t_15[t_13];
frame.set("addr", t_16);
frame.set("loop.index", t_13 + 1);
frame.set("loop.index0", t_13);
frame.set("loop.revindex", t_14 - t_13);
frame.set("loop.revindex0", t_14 - t_13 - 1);
frame.set("loop.first", t_13 === 0);
frame.set("loop.last", t_13 === t_14 - 1);
frame.set("loop.length", t_14);
t_12 += "\n\t\t\t\t<li class=\"addr\">\n\t\t\t\t\t<a class=\"cbd-point\"\n\t\t\t\t\t   href=\"javascript:;\"\n\t\t\t\t\t   data-lng=\"";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"lng", env.opts.autoescape), env.opts.autoescape);
t_12 += "\"\n\t\t\t\t\t   data-lat=\"";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"lat", env.opts.autoescape), env.opts.autoescape);
t_12 += "\"\n\t\t\t\t\t   data-name=\"";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"name", env.opts.autoescape), env.opts.autoescape);
t_12 += " ";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"address", env.opts.autoescape), env.opts.autoescape);
t_12 += "\">\n\t\t\t\t\t\t";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"name", env.opts.autoescape), env.opts.autoescape);
t_12 += " ";
t_12 += runtime.suppressValue(runtime.memberLookup((t_16),"address", env.opts.autoescape), env.opts.autoescape);
t_12 += "\n\t\t\t\t\t</a>\n\t\t\t\t</li>\n\t\t\t";
;
}
}
frame = frame.pop();
t_12 += "\n\t\t\t</ul>\n\t\t</div>\n\t";
;
}
else {
t_12 += "\n\t\t<span class=\"inner list-empty\">这里啥都没有 ╮(╯▽╰)╭ </span>\n\t";
;
}
t_12 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_12);
});
context.addExport("macro_addressbook");
context.setVariable("macro_addressbook", macro_t_11);
output += "\n\n";
var macro_t_17 = runtime.makeMacro(
["cbd"], 
[], 
function (l_cbd, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("cbd", l_cbd);
var t_18 = "";t_18 += "\n<div class=\"inner\">\n\t";
frame = frame.push();
var t_21 = l_cbd;
if(t_21) {var t_20 = t_21.length;
for(var t_19=0; t_19 < t_21.length; t_19++) {
var t_22 = t_21[t_19];
frame.set("addr", t_22);
frame.set("loop.index", t_19 + 1);
frame.set("loop.index0", t_19);
frame.set("loop.revindex", t_20 - t_19);
frame.set("loop.revindex0", t_20 - t_19 - 1);
frame.set("loop.first", t_19 === 0);
frame.set("loop.last", t_19 === t_20 - 1);
frame.set("loop.length", t_20);
t_18 += "\n\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape) % 3 == 0) {
t_18 += "\n\t<ul class=\"row clearfix\">\n\t\t";
;
}
t_18 += "\n\t\t<li class=\"addr\"><a class=\"cbd-point single-line\" href=\"javascript:;\" data-lng=\"";
t_18 += runtime.suppressValue(runtime.memberLookup((t_22),"lng", env.opts.autoescape), env.opts.autoescape);
t_18 += "\" data-lat=\"";
t_18 += runtime.suppressValue(runtime.memberLookup((t_22),"lat", env.opts.autoescape), env.opts.autoescape);
t_18 += "\"\n\t\t                    data-name=\"";
t_18 += runtime.suppressValue(runtime.memberLookup((t_22),"name", env.opts.autoescape), env.opts.autoescape);
t_18 += "\">";
t_18 += runtime.suppressValue(runtime.memberLookup((t_22),"name", env.opts.autoescape), env.opts.autoescape);
t_18 += "</a></li>\n\t\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape) % 3 == 2 || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"last", env.opts.autoescape)) {
t_18 += "\n\t</ul>\n\t";
;
}
t_18 += "\n\t";
;
}
}
frame = frame.pop();
t_18 += "\n</div>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_18);
});
context.addExport("macro_cbd");
context.setVariable("macro_cbd", macro_t_17);
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
return function(ctx, cb) { return nunjucks.render("templates/zone/address-select.macro.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/zone/address-select.macro.html", ctx)
};