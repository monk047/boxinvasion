var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var Active = require('../models/active');
var User = require('../models/user');

//Takes the socketid and token to find user id. Adds to active users if not already ther and updates socket id if already active
module.exports.handleConnection = function (token, socketid, callback) {

    var id = jwt.decode(token);
    var newActive;
    User.getUserById(id,function (err , user) {
        newActive = new Active({
            userid : id,
            socketid :socketid,
            isPlaying :false,
            username : user.username
        });
    });

    Active.getUserByID(id, function (err, active) {
        if(err) throw err;
        //If user is NOT already active
        if(!active){
            Active.addActive(newActive, function(err, user){
                if(err) throw err;
                //console.log(user);
            });
            console.log('active user added');
        }
        // If user is active but socket has refreshed
        else {
            Active.updateActive(newActive, function(err, user){
                if(err) throw err;
                //console.log(user);
            });
            
        }

    });
    return Promise.resolve();
    
}

module.exports.handleDisconnect = function (token, socketid, callback) {

    var id = jwt.decode(token);

    Active.deleteByID(id, function (err, active) {
        if(err) throw err;
        console.log('deleteby ID was ran');
    });

};

module.exports.broadcastActiveUsers = function () {
	console.log('FUNCTION CALLED');
	Active.getAllActive(function (err, actives){
		if (err) throw err;
		console.log('list of all active users :');
		console.log(JSON.stringify(actives, undefined, 4 ));
	});
}

module.exports.handleInvites = function () {

}