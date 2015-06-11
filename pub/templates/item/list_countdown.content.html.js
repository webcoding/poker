var nunjucks = require("nunjucks");

    
        
        require("templates/item/list_countdown.items.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/item/list_countdown.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container items-wrap-countdown\">\n\t";
output += "\n\t";
env.getTemplate("templates/item/list_countdown.items.html", false, "templates/item/list_countdown.content.html", function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
t_1.render(context.getVariables(), frame.push(), function(t_4,t_2) {
if(t_4) { cb(t_4); return; }
output += t_2
output += "\n</div>";
cb(null, output);
})});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
return function(ctx, cb) { return nunjucks.render("templates/item/list_countdown.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/item/list_countdown.content.html", ctx)
};