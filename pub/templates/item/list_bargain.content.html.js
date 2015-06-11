var nunjucks = require("nunjucks");

    
        
        require("templates/item/list_bargain.items.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/list_bargain.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container items-wrap items-wrap-bargain\">\n\t<a class=\"curr-pos single-line\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"ADDR_SELECT", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\">位置：";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "currentPosition"), env.opts.autoescape);
output += "</a>\n\t<!--<a class=\"action\" href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"A_MOTION_START", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\"><img src=\"night_motion/ad.jpg\" alt=\"睡前摇\"/></a>-->\n    <div class=\"content-wrap\">\n\t    ";
env.getTemplate("templates/item/list_bargain.items.html", false, "templates/item/list_bargain.content.html", function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame.push(), function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n    </div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/item/list_bargain.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/list_bargain.content.html", ctx)
};