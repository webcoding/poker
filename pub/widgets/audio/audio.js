var inherit = require('inherit')

var tplFn = require('./audio.html')

var Audio = inherit({
	name: 'Audio',
	proto:{
		/**
		 * @param audioPath
		 */
		__constructor: function(options){
			this.audioPath = options.audioPath
			this.node = $(tplFn({
				audioPath: this.audioPath
			}))
			this.dom = this.node[0]
			$('body').append(this.node)

			this._onPlay = $.proxy(this.onPlay, this)
			this._onEnded = $.proxy(this.onEnded, this)

			//this.node.on('play', this._onPlay)
			this.node.on('ended', this._onEnded)
		},
		play: function(times, gapTime){
			times = times || 1
			gapTime = gapTime || 0
			this._needPlayTimes = times
			this._gapTime = gapTime
			this._playTimes = 0
			this.dom.play()
		},
		pause: function(){

		},
		stop: function(){

		},
		destroy: function(){
			this.node.remove()
		},
		onPlay: function(e){

		},
		onEnded: function(e){
			var me = this
			me._playTimes++
			if(me._playTimes < me._needPlayTimes){
				setTimeout(function(){
					me.dom.play()
				}, me._gapTime)
			}
			// play over
			else{

			}
		}
	}
})

module.exports = Audio