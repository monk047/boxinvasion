var mongoose = require('mongoose');


//Game Schema
var GameSchema = mongoose.Schema({
	acceptedToId : {
		type : String 
	},
	acceptedById : {
		type : String
	}
});

var Game = module.exports = mongoose.model('Game', GameSchema);

module.exports.createGame = function(game, callback){
	game.save(callback);
}

module.exports.clearTable = function(callback) {
	Game.remove({}, callback);
	
}
module.exports.getGame = function (callback) {

    Game.find({}, callback);
}


