var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/overlay/modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
if(runtime.contextOrFrameLookup(context, frame, "needSection") == "wrap") {
output += "\n<div class=\"modal-wrap\">\n    <div class=\"mask\"></div>\n    <div class=\"modal\">\n        <div class=\"modal-inner\">\n            <div class=\"top\">\n                <h2></h2>\n                <p></p>\n            </div>\n            <div class=\"buttons\"></div>\n        </div>\n    </div>\n</div>\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "needSection") == "buttons") {
output += "\n    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "buttons");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("button", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n        <span class=\"button\" data-index=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index0", env.opts.autoescape), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"text", env.opts.autoescape), env.opts.autoescape);
output += "</span>\n    ";
;
}
}
frame = frame.pop();
output += "\n";
;
}
;
}
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
return function(ctx, cb) { return nunjucks.render("widgets/overlay/modal.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/overlay/modal.html", ctx)
};