var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["pages/other/download/url-schema.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\n";
if(runtime.contextOrFrameLookup(context, frame, "isFav")) {
output += "\n\n";
output += "\niqianggou://fav?lng=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lng"), env.opts.autoescape);
output += "&lat=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "lat"), env.opts.autoescape);
output += "&address=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "address"), env.opts.autoescape);
output += "\n\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "isCoin")) {
output += "\n\n";
output += "\niqianggou://coin\n\n";
;
}
else {
if(runtime.contextOrFrameLookup(context, frame, "isPreferential")) {
output += "\n\n";
output += "\niqianggou://preferential?item_id=";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "itemId"), env.opts.autoescape);
output += "\n\n";
;
}
else {
output += "\n\n";
output += "\niqianggou://home\n\n";
;
}
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
return function(ctx, cb) { return nunjucks.render("pages/other/download/url-schema.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("pages/other/download/url-schema.html", ctx)
};