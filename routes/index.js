var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');


// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

	var token = jwt.sign(req.user.id, 'secret');

	res.render('index', {title: req.user.name, userName: req.user.name, token : token ,condition:false });
	
	var sess = req.session;
	// var packet = socket.handshake.session;
	console.log('\nSession ID : '+sess.id);
	console.log('\nUser ID : '+req.user.id);
	// console.log(packet);

});



function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;
