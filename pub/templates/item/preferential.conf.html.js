var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/preferential.conf.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var macro_t_1 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_2 = "";t_2 += "\n\t<%= mainModuleAndDepsStyle %>\n";
;
frame = frame.pop();
return new runtime.SafeString(t_2);
});
context.addExport("style");
context.setVariable("style", macro_t_1);
output += "\n\n";
var macro_t_3 = runtime.makeMacro(
["part"], 
[], 
function (l_part, kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
frame.set("part", l_part);
var t_4 = "";t_4 += "\n\t";
if(l_part == "main") {
t_4 += "\n\t\t<%= mainModule %>\n\t";
;
}
else {
if(l_part == "deps") {
t_4 += "\n\t\t<%= mainModuleDeps %>\n\t";
;
}
;
}
t_4 += "\n";
;
frame = frame.pop();
return new runtime.SafeString(t_4);
});
context.addExport("script");
context.setVariable("script", macro_t_3);
output += "\n\n";
var macro_t_5 = runtime.makeMacro(
[], 
[], 
function (kwargs) {
frame = frame.push();
kwargs = kwargs || {};
if (kwargs.hasOwnProperty("caller")) {
frame.set("caller", kwargs.caller); }
var t_6 = "";t_6 += "\n商品优惠详情\n";
;
frame = frame.pop();
return new runtime.SafeString(t_6);
});
context.addExport("title");
context.setVariable("title", macro_t_5);
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
return function(ctx, cb) { return nunjucks.render("templates/item/preferential.conf.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/preferential.conf.html", ctx)
};