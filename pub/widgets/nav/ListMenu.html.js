var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/nav/ListMenu.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"top-nav-list-menu top-nav-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "menuType"), env.opts.autoescape);
output += "\">\n\t<div class=\"mask\"></div>\n\t<ul>\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "menus");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("menu", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t\t<li class=\"menu-item ";
if(runtime.memberLookup((t_4),"active", env.opts.autoescape)) {
output += "active ";
;
}
output += "\">\n\t\t\t<a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url", env.opts.autoescape), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</a>\n\t\t</li>\n\t\t";
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
return function(ctx, cb) { return nunjucks.render("widgets/nav/ListMenu.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/nav/ListMenu.html", ctx)
};