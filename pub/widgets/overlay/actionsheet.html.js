var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/overlay/actionsheet.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"actionsheet-wrap\">\n    <div class=\"mask\"></div>\n    <div class=\"content\">\n    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "buttons");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("btns", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n    <div class=\"group\">\n        ";
var t_5;
t_5 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape);
frame.set("index0", t_5, true);
if(!frame.parent) {
context.setVariable("index0", t_5);
context.addExport("index0");
}
output += "\n        ";
frame = frame.push();
var t_8 = t_4;
if(t_8) {var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("btn", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n        <span data-index0=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "index0"), env.opts.autoescape);
output += "\" data-index1=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape), env.opts.autoescape);
output += "\" class=\"item ";
output += runtime.suppressValue(runtime.memberLookup((t_9),"color", env.opts.autoescape), env.opts.autoescape);
output += " ";
output += runtime.suppressValue((runtime.memberLookup((t_9),"label", env.opts.autoescape)?"label":""), env.opts.autoescape);
output += " ";
output += runtime.suppressValue((runtime.memberLookup((t_9),"bold", env.opts.autoescape)?"bold":""), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_9),"text", env.opts.autoescape), env.opts.autoescape);
output += "</span>\n        ";
;
}
}
frame = frame.pop();
output += "\n    </div>\n    ";
;
}
}
frame = frame.pop();
output += "\n</div>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/overlay/actionsheet.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/overlay/actionsheet.html", ctx)
};