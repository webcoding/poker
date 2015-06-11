var app = exports

app.STATUS_NAV_ALONE              = 'nodes_status_nav_alone'
app.STATUS_NAV_SUB_NAVIGATION_BAR = 'nodes_status_nav_sub_navigation_bar'

app.STYLE_BG_WHITE                = 'bg-white'
app.STYLE_BG_GRAY                 = 'bg-gray'

app.window = window
app.document = window.document
app.body = $('body')
app.container = $('#content')
app.main = $('#main')

// 默认状态是没有 tabs 的
app.status  = app.STATUS_NAV_ALONE
//
app.bgStyle = app.STATE_BG_GRAY

app.beStatus = function (status) {
	if(status !== app.status) {
		app.status = status
		if(status === app.STATUS_NAV_ALONE){
			app.container.removeClass('app-nav-has-subnavbar')
		}
		else{
			app.container.addClass('app-nav-has-subnavbar')
		}
	}
}


app.setBgStyle = function (style) {
	if(style !== app.bgStyle){
		app.bgStyle = style
		if(style === app.STYLE_BG_WHITE){
			app.body.removeClass(app.STYLE_BG_GRAY).addClass(app.STYLE_BG_WHITE)
		}
		else{
			app.body.removeClass(app.STYLE_BG_WHITE).addClass(app.STYLE_BG_GRAY)
		}
	}
}