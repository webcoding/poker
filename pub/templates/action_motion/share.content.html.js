var nunjucks = require("nunjucks");

    
        
        require("templates/action_motion/start.pages.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/action_motion/share.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
env.getTemplate("templates/action_motion/start.pages.html", false, "templates/action_motion/share.content.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
context.setVariable("pages", t_1);
output += "\n<div class=\"page-container page-motion page-action-motion-share\">\n\t<div class=\"page-motion-wrap\">\n\t\t<!--<img src=\"night_motion/shareimg.png\" class=\"share-image\">-->\n\t\t<img src=\"night_motion/close.png\" alt=\"\" class=\"close\"/>\n\t\t<div class=\"page-inner\">\n\t\t\t";
if(runtime.contextOrFrameLookup(context, frame, "mine")) {
output += "\n\t\t\t\t";
output += runtime.suppressValue((lineno = 7, colno = 23, runtime.callWrap(runtime.memberLookup((t_1),"page_claimed", env.opts.autoescape), "pages[\"page_claim\"]", [runtime.contextOrFrameLookup(context, frame, "item")])), env.opts.autoescape);
output += "\n\t\t\t";
;
}
else {
output += "\n\t\t\t\t";
output += runtime.suppressValue((lineno = 9, colno = 22, runtime.callWrap(runtime.memberLookup((t_1),"page_shared", env.opts.autoescape), "pages[\"page_share\"]", [runtime.contextOrFrameLookup(context, frame, "item"),runtime.contextOrFrameLookup(context, frame, "route")])), env.opts.autoescape);
output += "\n\t\t\t";
;
}
output += "\n\t\t</div>\n\t</div>\n\t<div class=\"clouds\"></div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/action_motion/share.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/action_motion/share.content.html", ctx)
};