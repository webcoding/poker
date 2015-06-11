var nunjucks = require("nunjucks");

    
        
        require("templates/item/_stars.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/comments.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container item-comments\">\n\t<ul class=\"items\">\n\t    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "comments");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("c", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t    <li>\n\t        <p>\n\t\t        <span class=\"mobile\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"mobile", env.opts.autoescape), env.opts.autoescape);
output += "</span>\n\t\t        ";
env.getTemplate("templates/item/_stars.html", false, "templates/item/comments.content.html", function(t_6,t_5) {
if(t_6) { cb(t_6); return; }
t_5.getExported(function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
if(t_5.hasOwnProperty("star")) {
var t_8 = t_5.star;
} else {
cb(new Error("cannot import 'star'")); return;
}
frame.set("star", t_8);
output += "\n\t\t        ";
output += runtime.suppressValue((lineno = 7, colno = 15, runtime.callWrap(t_8, "star", [t_4])), env.opts.autoescape);
output += "\n\t        </p>\n\t\t    <p class=\"\">\n\t\t\t    <span class=\"date\">";
output += runtime.suppressValue(env.getFilter("formatTime").call(context, runtime.memberLookup((t_4),"time", env.opts.autoescape)), env.opts.autoescape);
output += "</span>\n\t\t    </p>\n\t\t    <p class=\"buy\">购买了";
output += runtime.suppressValue(runtime.memberLookup((t_4),"item_name", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t        <p>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"content", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t    ";
if(runtime.memberLookup((t_4),"image_thumb", env.opts.autoescape)) {
output += "\n\t\t\t    <p class=\"imgs\">\n\t\t\t    ";
frame = frame.push();
var t_11 = runtime.memberLookup((t_4),"image_thumb", env.opts.autoescape);
if(t_11) {var t_10 = t_11.length;
for(var t_9=0; t_9 < t_11.length; t_9++) {
var t_12 = t_11[t_9];
frame.set("img", t_12);
frame.set("loop.index", t_9 + 1);
frame.set("loop.index0", t_9);
frame.set("loop.revindex", t_10 - t_9);
frame.set("loop.revindex0", t_10 - t_9 - 1);
frame.set("loop.first", t_9 === 0);
frame.set("loop.last", t_9 === t_10 - 1);
frame.set("loop.length", t_10);
output += "\n\t\t\t\t    <img src=\"";
output += runtime.suppressValue(t_12, env.opts.autoescape);
output += "\" alt=\"\"/>\n\t\t\t    ";
;
}
}
frame = frame.pop();
output += "\n\t\t\t    </p>\n\t\t    ";
;
}
output += "\n\t    </li>\n\t    ";
})});
}
}
frame = frame.pop();
output += "\n\t</ul>\n\t";
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
return function(ctx, cb) { return nunjucks.render("templates/item/comments.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/comments.content.html", ctx)
};