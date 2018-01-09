var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

// ActiveUser Schema
var ActiveSchema = mongoose.Schema({
	userid: {
		type: String
	},
	socketid: {
		type: String
	},
	isplaying: {
		type: Boolean,
		default : false
	},
	username:{
		type: String
	}
});

var Active = module.exports = mongoose.model('Active', ActiveSchema);



module.exports.getUserByID = function(id, callback){
	var query = {userid: id};
	Active.findOne(query, callback);
}

module.exports.addActive = function(active, callback){

	active.save(callback);
}

module.exports.updateActive = function (active, callback){

	var id = active.userid;
	var socketid = active.socketid;

	Active.findOneAndUpdate({userid: id}, {$set:{socketid: socketid }},function(err, doc){
	    if(err){
	        console.log("Something wrong when updating data!");
	    }
	});

}

module.exports.deleteByID = function(id, callback){

	Active.findOneAndRemove({userid: id}, function (err, doc) {
		if(err) {
			throw err;
		}
		else {
			console.log('user deleted');
		}
	});
}

module.exports.getAllActive = function (callback) {

	Active.find({}, callback);
}