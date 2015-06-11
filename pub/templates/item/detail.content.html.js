var nunjucks = require("nunjucks");

    
        
        require("templates/item/detail.maininfo.html");
    
        
        require("templates/c-item/detail.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/detail.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container item-detail-wrap\">\n    <div class=\"imgs viewport\">\n        <ul class=\"clearfix flipsnap ";
if(runtime.contextOrFrameLookup(context, frame, "isTypeCountdown")) {
output += "img-countdown ";
;
}
else {
output += "img-bargain ";
;
}
output += "\"\n            ";
output += "\n\t\t    >\n            ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"images", env.opts.autoescape);
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("img", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t        ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape) < 2) {
output += "\n\t        <li class=\"item ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"first", env.opts.autoescape)) {
output += "first";
;
}
output += "\" data-index=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape), env.opts.autoescape);
output += "\" ";
output += ">\n\t\t        <img src=\"";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\"/>\n\t        </li>\n\t        ";
;
}
output += "\n            ";
;
}
}
frame = frame.pop();
output += "\n        </ul>\n\t    ";
output += "\n    </div>\n\t<div class=\"main-info-wrap\">\n\t    <div class=\"main-info\">\n\t\t    ";
env.getTemplate("templates/item/detail.maininfo.html", false, "templates/item/detail.content.html", function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
t_5.render(context.getVariables(), frame.push(), function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
output += t_6
output += "\n\t    </div>\n\t</div>\n    <div class=\"block\">\n\t    <p class=\"buy block-content\">\n\t\t    ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"left", env.opts.autoescape) == 0) {
output += "\n\t\t    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"like", env.opts.autoescape), env.opts.autoescape);
output += "个人抢购，已经抢完了！明天早点来\n\t\t    ";
;
}
else {
output += "\n\t\t    ";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"like", env.opts.autoescape), env.opts.autoescape);
output += "人正在抢购，只剩";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "item")),"left", env.opts.autoescape), env.opts.autoescape);
output += "个啦！\n\t\t    ";
;
}
output += "\n\t    </p>\n    </div>\n    ";
output += "\n\t";
env.getTemplate("templates/c-item/detail.html", false, "templates/item/detail.content.html", function(t_11,t_9) {
if(t_11) { cb(t_11); return; }
t_9.render(context.getVariables(), frame.push(), function(t_12,t_10) {
if(t_12) { cb(t_12); return; }
output += t_10
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
return function(ctx, cb) { return nunjucks.render("templates/item/detail.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/detail.content.html", ctx)
};