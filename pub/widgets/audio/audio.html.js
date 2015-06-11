var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["widgets/audio/audio.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<audio controls preload=\"auto\" style=\"display: none\">\n\t<source src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "audioPath"), env.opts.autoescape);
output += ".ogg\" type=\"audio/ogg\">\n\t<source src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "audioPath"), env.opts.autoescape);
output += ".mp3\" type=\"audio/mpeg\">\n</audio>";
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
return function(ctx, cb) { return nunjucks.render("widgets/audio/audio.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("widgets/audio/audio.html", ctx)
};