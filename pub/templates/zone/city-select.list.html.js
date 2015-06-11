var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/zone/city-select.list.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "city_list");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("city", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<li><a href=\"javascript:;\" class=\"city\" data-action=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "action"), env.opts.autoescape);
output += "\" data-available=\"true\" data-city='";
output += runtime.suppressValue(env.getFilter("json_encode").call(context, t_4), env.opts.autoescape);
output += "' data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.opts.autoescape), env.opts.autoescape);
output += "\" data-name=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "\" data-baiduid=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"baidu_id", env.opts.autoescape), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.opts.autoescape), env.opts.autoescape);
output += "</a></li>\n";
;
}
}
frame = frame.pop();
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
return function(ctx, cb) { return nunjucks.render("templates/zone/city-select.list.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/zone/city-select.list.html", ctx)
};