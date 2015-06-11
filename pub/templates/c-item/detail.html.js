var nunjucks = require("nunjucks");

    
        
        require("templates/item/_stars.html");
    
        
        require("templates/c-item/_item_tip.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/c-item/detail.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"c-item-detail\">\n\t";
output += "\n\t";
if(!env.getFilter("is").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"rating", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "undefined"))) {
output += "\n\t";
var t_1;
t_1 = env.getFilter("number").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments_count", env.opts.autoescape)) > env.getFilter("number").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments_limit", env.opts.autoescape));
frame.set("showStar", t_1, true);
if(!frame.parent) {
context.setVariable("showStar", t_1);
context.addExport("showStar");
}
output += "\n\t";
var t_2;
t_2 = env.getFilter("number").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments_count", env.opts.autoescape)) > 0;
frame.set("showComment", t_2, true);
if(!frame.parent) {
context.setVariable("showComment", t_2);
context.addExport("showComment");
}
output += "\n\n\t";
if(runtime.contextOrFrameLookup(context, frame, "showStar") || runtime.contextOrFrameLookup(context, frame, "showComment")) {
output += "\n\t<div class=\"block\">\n\t\t<a class=\"block-content clearfix\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ITEM_COMMENTS", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"item_id",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"id", env.opts.autoescape)), env.opts.autoescape);
output += "\">\n\t\t\t";
if(runtime.contextOrFrameLookup(context, frame, "showStar")) {
output += "\n\t\t\t";
env.getTemplate("templates/item/_stars.html", false, "templates/c-item/detail.html", function(t_4,t_3) {
if(t_4) { cb(t_4); return; }
t_3.getExported(function(t_5,t_3) {
if(t_5) { cb(t_5); return; }
if(t_3.hasOwnProperty("star")) {
var t_6 = t_3.star;
} else {
cb(new Error("cannot import 'star'")); return;
}
context.setVariable("star", t_6);
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 11, colno = 8, runtime.callWrap(t_6, "star", [runtime.contextOrFrameLookup(context, frame, "item")])), env.opts.autoescape);
output += "\n\t\t\t";
})});
}
else {
output += "\n\t\t\t<span class=\"stars star-less\">评论少于";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments_limit", env.opts.autoescape), env.opts.autoescape);
output += "条</span>\n\t\t\t";
;
}
output += "\n\t\t\t";
if(runtime.contextOrFrameLookup(context, frame, "showComment")) {
output += "\n\t\t\t<span class=\"btn-comment\">查看评论(";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments_count", env.opts.autoescape), env.opts.autoescape);
output += ")</span>\n\t\t\t";
;
}
output += "\n\t\t</a>\n\t</div>\n\t";
;
}
output += "\n\t";
;
}
output += "\n\n    ";
if(!runtime.contextOrFrameLookup(context, frame, "done")) {
output += "\n    <div class=\"description block\">\n\t    <p class=\"block-content\">";
output += runtime.suppressValue(env.getFilter("nl2br").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"description", env.opts.autoescape)), env.opts.autoescape);
output += "</p>\n\t\t<a class=\"btn-more\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ITEM_DESCRIPTION", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"item_id",runtime.contextOrFrameLookup(context, frame, "itemId"),"url",runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"more_info", env.opts.autoescape)), env.opts.autoescape);
output += "\">查看更多描述信息</a>\n    </div>\n\t<div class=\"hint block\">\n\t";
env.getTemplate("templates/c-item/_item_tip.html", false, "templates/c-item/detail.html", function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
t_7.getExported(function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
if(t_7.hasOwnProperty("tip")) {
var t_10 = t_7.tip;
} else {
cb(new Error("cannot import 'tip'")); return;
}
context.setVariable("tip", t_10);
output += "\n\t";
output += runtime.suppressValue((lineno = 30, colno = 5, runtime.callWrap(t_10, "tip", [runtime.contextOrFrameLookup(context, frame, "item")])), env.opts.autoescape);
output += "\n\t</div>\n\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"ad", env.opts.autoescape)) {
output += "\n    <div class=\"preferential block\">\n        <div class=\"inner\">\n            <h3>优惠信息</h3>\n            <p>\n\t            <span class=\"block-content\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"ad", env.opts.autoescape)),"content", env.opts.autoescape) || runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"ad", env.opts.autoescape)),"title", env.opts.autoescape), env.opts.autoescape);
output += "</span>\n\t            ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"ad", env.opts.autoescape)),"url", env.opts.autoescape)) {
output += "\n\t            <!--<span class=\"btn-more\">-->\n\t\t            <a class=\"btn-more\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ITEM_PREFERENTIAL", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"item_id",runtime.contextOrFrameLookup(context, frame, "itemId"),"url",runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"ad", env.opts.autoescape)),"url", env.opts.autoescape)), env.opts.autoescape);
output += "\">查看优惠详情</a>\n\t            <!--</span>-->\n\t            ";
;
}
output += "\n            </p>\n        </div>\n    </div>\n\t";
;
}
output += "\n    ";
})});
}
output += "\n    <div class=\"shop block\">\n\t    ";
var t_11;
t_11 = runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"branches", env.opts.autoescape)),0, env.opts.autoescape);
frame.set("shop", t_11, true);
if(!frame.parent) {
context.setVariable("shop", t_11);
context.addExport("shop");
}
output += "\n        <h3>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "shop")),"name", env.opts.autoescape), env.opts.autoescape);
output += "</h3>\n\t    <div class=\"block-content\">\n\t        <p class=\"tel\"><a href=\"tel:";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "shop")),"tel", env.opts.autoescape), env.opts.autoescape);
output += "\">电话：<span>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "shop")),"tel", env.opts.autoescape), env.opts.autoescape);
output += "</span></a></p>\n\t        <p class=\"addr\"><a href=\"";
output += runtime.suppressValue(env.getFilter("geoLink").call(context, runtime.contextOrFrameLookup(context, frame, "shop")), env.opts.autoescape);
output += "\">地址：<span>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "shop")),"address", env.opts.autoescape), env.opts.autoescape);
output += "</span></a></p>\n\t\t</div>\n        <!--<span class=\"btn-more\">-->\n\t        <a class=\"btn-more\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ITEM_SHOPS", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"item_id",runtime.contextOrFrameLookup(context, frame, "itemId")), env.opts.autoescape);
output += "\">所有门店</a>\n        <!--</span>-->\n    </div>\n\t";
output += "\n\t";
if(env.getFilter("is").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"rating", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "undefined"))) {
output += "\n    <div class=\"comments block\">\n        <h3>用户评论</h3>\n        ";
if(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments", env.opts.autoescape)),0, env.opts.autoescape)) {
output += "\n\t    <div class=\"block-content\">\n\t        <p>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments", env.opts.autoescape)),0, env.opts.autoescape)),"mobile", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t        <p>";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"comments", env.opts.autoescape)),0, env.opts.autoescape)),"content", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t</div>\n        <!--<span class=\"btn-more\">-->\n\t        <a class=\"btn-more\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ITEM_COMMENTS", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route"),"item_id",runtime.contextOrFrameLookup(context, frame, "itemId")), env.opts.autoescape);
output += "\">更多评论</a>\n\t    <!--</span>-->\n        ";
;
}
else {
output += "\n\t    <div class=\"block-content\">\n            <p>暂无评论</p>\n\t\t</div>\n        ";
;
}
output += "\n    </div>\n\t";
;
}
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
return function(ctx, cb) { return nunjucks.render("templates/c-item/detail.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/c-item/detail.html", ctx)
};