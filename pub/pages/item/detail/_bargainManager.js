var storage = require('storage')

function BargainManager(){
	this.data = storage.get(storage.ITEMS_HAD_BARGAIN) || {}
}

BargainManager.prototype.bargain = function(itemId){
	this.data[itemId] = 1
	storage.set(storage.ITEMS_HAD_BARGAIN, this.data)
}

BargainManager.prototype.isBargained = function(itemId){
	return this.data[itemId]
}

var bargainManager = new BargainManager()

module.exports = bargainManager