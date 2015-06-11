var nunjucks = require("nunjucks");

    
        
        require("templates/action_motion/start.pages.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/action_motion/start.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
env.getTemplate("templates/action_motion/start.pages.html", false, "templates/action_motion/start.content.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
context.setVariable("pages", t_1);
output += "\n\n";
if(!runtime.contextOrFrameLookup(context, frame, "onlySubPage")) {
output += "\n<div class=\"page-container page-motion page-action-motion-start\">\n\t<div class=\"page-motion-wrap\">\n\t\t<!--<img src=\"night_motion/shareimg.png\" class=\"share-image\">-->\n\t\t<img src=\"night_motion/close.png\" alt=\"\" class=\"close\"/>\n\t\t<div class=\"page-inner\">\n";
;
}
output += "\n\n\t\t";
output += "\n\t\t";
output += "\n\n\n\t\t";
output += "\n\t\t";
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"ERROR", env.opts.autoescape)) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 19, colno = 20, runtime.callWrap(runtime.memberLookup((t_1),"page_error", env.opts.autoescape), "pages[\"page_error\"]", [runtime.contextOrFrameLookup(context, frame, "error_msg")])), env.opts.autoescape);
output += "\n\t\t";
output += "\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"LOCKED", env.opts.autoescape)) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 22, colno = 26, runtime.callWrap(runtime.memberLookup((t_1),"page_have_locked", env.opts.autoescape), "pages[\"page_have_\"]", [runtime.contextOrFrameLookup(context, frame, "locked_item"),runtime.contextOrFrameLookup(context, frame, "left_times"),runtime.contextOrFrameLookup(context, frame, "start_time"),runtime.contextOrFrameLookup(context, frame, "end_time"),runtime.contextOrFrameLookup(context, frame, "can_motion"),runtime.contextOrFrameLookup(context, frame, "show_life_text")])), env.opts.autoescape);
output += "\n\t\t";
output += "\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"NOT_START", env.opts.autoescape)) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 25, colno = 24, runtime.callWrap(runtime.memberLookup((t_1),"page_not_start", env.opts.autoescape), "pages[\"page_not_s\"]", [runtime.contextOrFrameLookup(context, frame, "start_time"),runtime.contextOrFrameLookup(context, frame, "end_time")])), env.opts.autoescape);
output += "\n\t\t";
output += "\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"TIME_OVER", env.opts.autoescape)) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 28, colno = 24, runtime.callWrap(runtime.memberLookup((t_1),"page_time_over", env.opts.autoescape), "pages[\"page_time_\"]", [runtime.contextOrFrameLookup(context, frame, "start_time"),runtime.contextOrFrameLookup(context, frame, "end_time")])), env.opts.autoescape);
output += "\n\t\t";
output += "\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"LIFE_OVER", env.opts.autoescape)) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 31, colno = 24, runtime.callWrap(runtime.memberLookup((t_1),"page_life_over", env.opts.autoescape), "pages[\"page_life_\"]", [])), env.opts.autoescape);
output += "\n\t\t";
output += "\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"ITEM_OVER", env.opts.autoescape)) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 34, colno = 25, runtime.callWrap(runtime.memberLookup((t_1),"page_pool_empty", env.opts.autoescape), "pages[\"page_pool_\"]", [])), env.opts.autoescape);
output += "\n\t\t";
output += "\n\t\t";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "status") == runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "Status")),"NORMAL", env.opts.autoescape)) {
output += "\n\t\t\t";
output += runtime.suppressValue((lineno = 37, colno = 21, runtime.callWrap(runtime.memberLookup((t_1),"page_normal", env.opts.autoescape), "pages[\"page_norma\"]", [runtime.contextOrFrameLookup(context, frame, "list"),runtime.contextOrFrameLookup(context, frame, "left_times"),runtime.contextOrFrameLookup(context, frame, "start_time"),runtime.contextOrFrameLookup(context, frame, "end_time"),runtime.contextOrFrameLookup(context, frame, "can_motion"),runtime.contextOrFrameLookup(context, frame, "show_life_text")])), env.opts.autoescape);
output += "\n\t\t";
;
}
;
}
;
}
;
}
;
}
;
}
;
}
output += "\n\n";
if(!runtime.contextOrFrameLookup(context, frame, "onlySubPage")) {
output += "\n\t\t</div>\n\t</div>\n\t<div class=\"clouds\"></div>\n</div>\n";
;
}
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
return function(ctx, cb) { return nunjucks.render("templates/action_motion/start.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/action_motion/start.content.html", ctx)
};