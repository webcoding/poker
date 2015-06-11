var nunjucks = require("nunjucks");

    
        
        require("templates/c-item/_item_tip.html");
    


(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["templates/order/pay.content.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"page-container order-pay-wrap\">\n    <div class=\"summary\">\n\t    <div class=\"block\">\n\t        <h3>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"name", env.opts.autoescape), env.opts.autoescape);
output += "</h3>\n\t\t    <div class=\"block-content\">\n\t\t        <p class=\"price\">";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"price", env.opts.autoescape))), env.opts.autoescape);
output += "</p>\n\t\t        <p class=\"shop\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"name", env.opts.autoescape), env.opts.autoescape);
output += "<span class=\"btn-detail\"><b>详情</b><em>&gt;</em></span></p>\n\t\t    </div>\n\t    </div>\n        <div class=\"detail\">\n\t        <div class=\"block\">\n                <p class=\"addr block-content\">地址：";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"branches", env.opts.autoescape)),0, env.opts.autoescape)),"address", env.opts.autoescape), env.opts.autoescape);
output += "</p>\n\t\t    </div>\n\t        <div class=\"block\">\n\t\t        ";
env.getTemplate("templates/c-item/_item_tip.html", false, "templates/order/pay.content.html", function(t_2,t_1) {
if(t_2) { cb(t_2); return; }
t_1.getExported(function(t_3,t_1) {
if(t_3) { cb(t_3); return; }
if(t_1.hasOwnProperty("tip")) {
var t_4 = t_1.tip;
} else {
cb(new Error("cannot import 'tip'")); return;
}
context.setVariable("tip", t_4);
output += "\n\t\t        ";
output += runtime.suppressValue((lineno = 15, colno = 14, runtime.callWrap(t_4, "tip", [runtime.contextOrFrameLookup(context, frame, "order")])), env.opts.autoescape);
output += "\n\t        </div>\n        </div>\n    </div>\n    <form class=\"form\" id=\"order-pay-form\" method=\"POST\">\n        <div class=\"pay balance-wrap\">\n            <div class=\"main clearfix\">\n\t            ";
if(runtime.contextOrFrameLookup(context, frame, "isCountdown")) {
output += "\n\t            ";
output += "\n\t            <p>不支持<span>余额</span>支付</p>\n\t            ";
;
}
else {
output += "\n                <input type=\"checkbox\" name=\"account-balance\" id=\"account-balance\" ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"account_balance", env.opts.autoescape) == 0) {
output += "disabled";
;
}
output += " />\n                <label for=\"account-balance\">使用余额支付（共";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"account_balance", env.opts.autoescape))), env.opts.autoescape);
output += "）</label>\n                <!--<input type=\"hidden\" name=\"balance-money\" value=\"0\"/>-->\n                <p class=\"money\"></p>\n\t            ";
;
}
output += "\n            </div>\n            <div class=\"password\"><input type=\"password\" name=\"password\" placeholder=\"请输入账户密码\"/></div>\n            <p class=\"link-forgot clearfix\"><a href=\"";
output += runtime.suppressValue(env.getFilter("getRoute").call(context, runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "route")),"R", env.opts.autoescape)),"RESET_PASSWORD", env.opts.autoescape),runtime.contextOrFrameLookup(context, frame, "route")), env.opts.autoescape);
output += "\">忘记密码？</a></p>\n        </div>\n        <div class=\"pay alipay-wrap\">\n            <div class=\"main clearfix\">\n                <input type=\"radio\" checked name=\"alipay-web\" id=\"alipay-web\"/>\n                <label for=\"alipay-web\">使用支付宝网页支付</label>\n                <!--<input type=\"hidden\" name=\"alipay-web-money\" value=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"price", env.opts.autoescape), env.opts.autoescape);
output += "\" />-->\n                <p class=\"money\">";
output += runtime.suppressValue(env.getFilter("rmb").call(context, env.getFilter("formatPrice").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "order")),"price", env.opts.autoescape))), env.opts.autoescape);
output += "</p>\n            </div>\n        </div>\n        <button class=\"btn-submit\" type=\"submit\">确认</button>\n        <p class=\"time-tip\">请在<span>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "orderLifeTotalMinutes"), env.opts.autoescape);
output += "分00秒</span>内支付</p>\n    </form>\n</div>";
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
return function(ctx, cb) { return nunjucks.render("templates/order/pay.content.html", ctx, cb); }})();


module.exports = function(ctx){
    return nunjucks.render("templates/order/pay.content.html", ctx)
};