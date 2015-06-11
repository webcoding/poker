var nunjucks = require("nunjucks");


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/other/contact.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container contact-wrap\">\n<ul>\n\t<li>微信服务号：iqianggou</li>\n\t<li>微博：爱抢购APP</li>\n\t<li class=\"tel\">客服电话：<a href=\"tel:4006717909\"><span data-tel=\"4006717909\">4006-717-909</span></a></li>\n\t<li class=\"mail\"><a href=\"mailto:service@doweidu.com\"><span data-mail=\"service@doweidu.com\">service@doweidu.com</span></a></li>\n\t<li class=\"href\"><a href=\"http://www.iqianggou.com/\"><span data-href=\"http://www.iqianggou.com/\">http://www.iqianggou.com/</span></a></li>\n\t<li class=\"protocol\"><a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "urlProtocol"), env.opts.autoescape);
output += "\">服务条款</a></li>\n</ul>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/other/contact.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/other/contact.content.html", ctx)
};