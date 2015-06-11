var TYPE = {
	NAV: {
		LOCATION: 'LOCATION',
		REPLACE: 'REPLACE',
		RELOAD: 'RELOAD'
	}
}
function Event(options){
	$.extend(this, options)
	this.defaultPrevented = false
	this.asyncUsed = false
}
Event.prototype.preventDefault = function(){
	this.defaultPrevented = true
}
Event.prototype.async = function(){
	this.asyncUsed = true
}

Event.prototype.TYPE = TYPE
Event.TYPE = TYPE

module.exports = Event