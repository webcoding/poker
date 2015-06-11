var nunjucks = require("nunjucks");

    
        
        require("templates/order/_order_status.html");
    
        
        require("templates/c-item/detail.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/order/detail.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container order-detail\">\n\t";
env.getTemplate("templates/order/_order_status.html", false, "templates/order/detail.content.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
context.setVariable("orderStatus", t_1);
output += "\n\t<div class=\"main-info\">\n\t\t<h2 class=\"title\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"name", env.opts.autoescape), env.opts.autoescape);
output += "</h2>\n\t\t";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"status", env.opts.autoescape) == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"PAID", env.opts.autoescape)) {
output += "\n\t\t<h2 class=\"code\">验证码： ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"redeem_number", env.opts.autoescape), env.opts.autoescape);
output += "</h2>\n\t\t";
;
}
else {
output += "\n\t\t<span class=\"branch\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"address", env.opts.autoescape), env.opts.autoescape);
output += "</span>\n\t\t";
;
}
output += "\n\t</div>\n\n    <div class=\"block\">\n\t    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"status", env.opts.autoescape) == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"PAID", env.opts.autoescape)) {
output += "\n\t    <div class=\"block-content\">\n\t        <p class=\"paragraph\">过期时间：";
output += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"expire_date", env.opts.autoescape),"YYYY-MM-dd hh:mm"), env.opts.autoescape);
output += "</p>\n\t        <p class=\"paragraph\">领取商品时请展示此页，截图无效</p>\n\t    </div>\n        ";
;
}
else {
output += "\n\t    <div class=\"block-content\">\n            <p class=\"paragraph\">谢谢购买</p>\n\t\t</div>\n        ";
;
}
output += "\n    </div>\n\t";
env.getTemplate("templates/c-item/detail.html", false, "templates/order/detail.content.html", function(t_6,t_4) {
if(t_6) { cb(t_6); return; }
t_4.render(context.getVariables(), frame.push(), function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
output += t_5
output += "\n</div>";
cb(null, output);
})})})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("templates/order/detail.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/order/detail.content.html", ctx)
};