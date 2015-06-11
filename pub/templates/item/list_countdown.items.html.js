var nunjucks = require("nunjucks");

    
        
        require("templates/item/_downtip.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/list_countdown.items.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\n";
if(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "items")) > 0) {
output += "\n<ul class=\"items items-countdown\">\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "items");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t<li class=\"item\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "\" data-index=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape), env.opts.autoescape);
output += "\">\n\t\t<a href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ITEM_DETAIL", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"item_id",runtime.memberLookup((t_4),"id", env.opts.autoescape),"type",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"ITEM_TYPE_COUNTDOWN", env.opts.autoescape)), env.opts.autoescape);
output += "\">\n\t\t\t<div class=\"top\">\n\t\t\t\t<img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"images", env.opts.autoescape)),0, env.opts.autoescape), env.opts.autoescape);
output += "\"/>\n\t\t\t\t<span class=\"down-tip\">\n\t\t\t\t\t";
env.getTemplate("templates/item/_downtip.html", false, "templates/item/list_countdown.items.html", function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame.push(), function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\n\t\t\t\t</span>\n\t\t\t\t<span class=\"price-floor\">底价";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((t_4),"floor_price", env.opts.autoescape))), env.opts.autoescape);
output += "</span>\n\t\t\t</div>\n\t\t\t<div class=\"info clearfix\">\n\t\t\t\t<div class=\"left\">\n\t\t\t\t\t";
output += "\n\t\t\t\t\t<p class=\"name single-line\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t\t\t\t<p class=\"shop single-line\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"brand", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t\t\t\t<p class=\"addr single-line\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_4),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"address_short", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"right\">\n\t\t\t\t\t<span class=\"price-start\">";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((t_4),"start_price", env.opts.autoescape))), env.opts.autoescape);
output += "</span>\n\t\t\t\t\t<span class=\"real-time\"></span>\n\t\t\t\t\t";
output += "\n\t\t\t\t\t<input class=\"range\" type=\"range\" max=\"1\" min=\"0\" value=\"0\" step=\"0.001\"/>\n\t\t\t\t\t<p class=\"end\">\n\t\t\t\t\t\t<span class=\"end-time\">";
output += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((t_4),"countdown_buy_end_time", env.opts.autoescape),"hh:mm"), env.opts.autoescape);
output += "</span>\n\t\t\t\t\t\t<span class=\"tip-end\">结束</span>\n\t\t\t\t\t\t";
output += "\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</a>\n\t</li>\n";
})});
}
}
frame = frame.pop();
output += "\n</ul>\n";
;
}
else {
output += "\n<p class=\"empty\">您周边没有倒计时商品哦~</p>\n";
;
}
output += "\n";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "paginationHTML"), env.opts.autoescape);
output += "\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/item/list_countdown.items.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/list_countdown.items.html", ctx)
};