var mongoose = require('mongoose');


// ActiveUser Schema
var ActiveUserSchema = mongoose.Schema({
	userid: {
		type: String
	},
	username: {
		type: String
	},
	socketid: {
		type: String
	},
	isplaying: {
		type: Boolean
	}
});

var ActiveUser = module.exports = mongoose.model('ActiveUser', ActiveUserSchema);

module.exports.createActiveUser = function(newUser, callback){

}

module.exports.deleteActiveUser = function(newUser, callback){

}

module.exports.updatePlayingStatus = function(newUser, callback){

}
