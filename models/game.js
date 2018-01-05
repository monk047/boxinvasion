var mongoose = require('mongoose');


//Game Schema
var GameSchema = mongoose.Schema({
	player: [{
		name : String,
		socketid : String,
		playerid : String

	}],
	gametype: {
		type: Boolean
	}
});

var Game = module.exports = mongoose.model('Game', GameSchema);

module.exports.createGame = function(newUser, callback){
	
}


