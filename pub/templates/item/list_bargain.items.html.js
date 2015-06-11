var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/list_bargain.items.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div>\n";
if(runtime.contextOrFrameLookup(context, frame, "items")) {
output += "\n<ul class=\"items items-content\">\n";
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
output += "\n    <li class=\"item\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "\" data-index=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape), env.opts.autoescape);
output += "\">\n        <a href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ITEM_DETAIL", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"item_id",runtime.memberLookup((t_4),"id", env.opts.autoescape),"type",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"ITEM_TYPE_BARGAIN", env.opts.autoescape)), env.opts.autoescape);
output += "\" class=\"item-link\">\n\t        <img class=\"item-img\" src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_4),"images", env.opts.autoescape)),0, env.opts.autoescape), env.opts.autoescape);
output += "\"/>\n\t        <div class=\"item-inner\">\n\t            <div class=\"info\">\n\t                <h2 class=\"single-line\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</h2>\n\t                <p class=\"like single-line\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"like", env.opts.autoescape), env.opts.autoescape);
output += "人喜欢</p>\n\t            </div>\n\t\t        <p class=\"shop single-line\">\n\t\t\t        <span class=\"name\">\n\t\t\t        ";
if(runtime.memberLookup((t_4),"distance", env.opts.autoescape)) {
output += "\n\t\t\t        <span class=\"dis\">";
output += runtime.suppressValue(env.getFilter("formatDistance").call(context, runtime.memberLookup((t_4),"distance", env.opts.autoescape)), env.opts.autoescape);
output += "</span>\n\t\t\t        ";
;
}
output += "\n\t\t\t        ";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((t_4),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"name", env.opts.autoescape), env.opts.autoescape);
output += "\n\t\t\t\t    </span>\n\t\t        </p>\n\t            <div class=\"price\">\n\t                <p class=\"market-price\">";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((t_4),"market_price", env.opts.autoescape),2)), env.opts.autoescape);
output += "</p>\n\t                <p class=\"curr-price\">\n\t\t                ";
if(runtime.memberLookup((t_4),"left", env.opts.autoescape) > 0) {
output += "\n\t\t                <b>";
output += runtime.suppressValue(env.getFilter("round").call(context, runtime.memberLookup((t_4),"current_price", env.opts.autoescape),0,"floor"), env.opts.autoescape);
output += ".</b>";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("pad").call(context, env.getFilter("decimal").call(context, runtime.memberLookup((t_4),"current_price", env.opts.autoescape)),2,"0",true,true)), env.opts.autoescape);
output += "\n\t\t                ";
;
}
else {
output += "\n\t\t                <span class=\"over\">抢完了</span>\n\t\t                ";
;
}
output += "\n\t                </p>\n\t            </div>\n\t        </div>\n        </a>\n    </li>\n";
;
}
}
frame = frame.pop();
output += "\n</ul>\n";
;
}
else {
output += "\n<p class=\"empty\">没有更多商品了</p>\n";
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
return function(ctx, cb) { return nunjucks.render("templates/item/list_bargain.items.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/list_bargain.items.html", ctx)
};