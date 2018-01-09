var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){

	var name = req.user.name ;
	var token = jwt.sign(req.user.id, 'secret');
	res.render('index', {title: req.user.name, userName: req.user.username, token : token ,condition:false});
	
	var sess = req.session;

});

router.post('/', function (req,res) {
	res.redirect('/');

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
