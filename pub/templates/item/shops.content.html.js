var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/shops.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container item-shops\">\n\t<ul class=\"shops\">\n\t    ";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "shops");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("shop", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t    <li>\n\t        <h2>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</h2>\n\t        <p>电话：";
output += runtime.suppressValue(runtime.memberLookup((t_4),"tel", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t        <p>地址：";
output += runtime.suppressValue(runtime.memberLookup((t_4),"address", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t    </li>\n\t    ";
;
}
}
frame = frame.pop();
output += "\n\t</ul>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/item/shops.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/shops.content.html", ctx)
};