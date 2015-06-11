var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/picswiper/picswiper.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"viewport pic-swiper\">\n\t<p><span>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "currentIndex") + 1, env.opts.autoescape);
output += "</span>/";
output += runtime.suppressValue(env.getFilter("length").call(context, runtime.contextOrFrameLookup(context, frame, "images")), env.opts.autoescape);
output += "</p>\n\t<div class=\"flipsnap\">\n\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "images");
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
output += "\n\t\t<div class=\"item\">\n\t\t\t<img src=\"";
output += runtime.suppressValue(t_4, env.opts.autoescape);
output += "\">\n\t\t</div>\n\t\t";
;
}
}
frame = frame.pop();
output += "\n\t</div>\n\t<!--<ul class=\"pagination\"></ul>-->\n</div>";
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
return function(ctx, cb) { return nunjucks.render("widgets/picswiper/picswiper.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/picswiper/picswiper.html", ctx)
};