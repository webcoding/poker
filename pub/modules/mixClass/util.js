function mix(proto){
	return {
		mixTo:function(__constructor){
			for(var key in proto){
				if(proto.hasOwnProperty(key)) __constructor.prototype[key] = proto[key]
			}
		}
	}
}

exports.mix = mix