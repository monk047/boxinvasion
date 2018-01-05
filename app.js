var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var socket = require('socket.io');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
//mongoose.Promise=global.Promise;
//var db = mongoose.createConnection('mongodb://localhost/loginapp');
var uList=[];

var routes = require('./routes/index');
var users = require('./routes/users');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  //res.locals.count = req.count ;
  next();
});

app.use('/', routes);
app.use('/users', users);

// Set Port
app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});


//********************************************************//
//on connection
// Make io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    //req.socket=socket;
    next();
});
var totalCount=0;
var io = socket(server);
io.on('connection', (socket)=>{
    var room="Testing";
      
      console.log('made socket connection \n'+socket.id);
    /* console.log("session in app.js:"+user);*/
// when user is typing ,show typing message to all connected user
      

// when user is typing ,show typing message to all connected user
      socket.on('typing', function (data){
          socket.broadcast.emit('typing', data);
      });

      socket.on('not typing', function (){
          socket.broadcast.emit('not typing');
      });

      // chat data
      socket.on('chat', function (data) {

          console.log("client id: "+ socket.id);
          io.to('room').emit('chat', data);
      });

      socket.on('invite', function(data) {

      });

      socket.on('game', function(data) {

      });
      /*@ Shafeak for gamestart*/
    socket.on('startgame', function (data) {
        var checkwaiting = false;
        io.in('waiting').clients((err, clients) => {
            if(clients.length > 0){
                checkwaiting = true;
                socket.gameUID=data.startgame;
                socket.join(socket.gameUID);
                console.log("app.js startgame:"+data.username);
                io.sockets.connected[clients[0]].leave("waiting");
                io.sockets.connected[clients[0]].gameUID = socket.gameUID;
                io.sockets.connected[clients[0]].join(socket.gameUID);
                /*io.to(socket.gameUID).emit('playgame',{
                    username:data.username
                });*/
                io.to('room').emit('invitesuccess', {
                    username:data.username,
                    cid:io.sockets.connected[clients[0]].usernameUID,
                    sid:socket.id
                });
            }
            else{
                console.log("app.js waiting:"+data.username);
                socket.join('waiting');
            }
        });
    });
    //@shafiq:saving user for socket room
    socket.on('setusername', function (data){
        console.log("app.js setusername:"+data.username);
       // var rm = io.sockets.adapter.rooms['room'];
        console.log("count :"+totalCount)
        console.log("lentgh of room :"+Object.keys('my_room').length);
        /*if(socket.rooms[room].count<2)
            socket.join('my_room');*/
        if(totalCount<2)
        {
            socket.join('room');
            socket.usernameUID=data.username;
            totalCount++;
        } 
    });
    socket.on('invitegame', function (data) {
    if(totalCount>2) {
     return true;
    }
console.log(totalCount)
        console.log("app.js invitegame:"+data.username);
            var userexist=false;
           io.clients((err, clients) => {
            if(clients.length > 0){
                for (var i = 0; i < clients.length; i++) {
                        if(io.sockets.connected[clients[i]].usernameUID === data.username){
                        console.log("app.js invitegame IF:"+data.username);
                        console.log("app.js clients: "+clients[i]);
                        console.log("users in if :"+data.username);
                        //Do something
                        userexist = true;
                          //  io.sockets.connected[clients[i]].join(socket.id)
                       /* io.to(socket.id).emit('invitesuccess', {
                            username:data.username,
                            cid:io.sockets.connected[clients[i]].usernameUID,
                            sid:socket.id
                        });*/
                       console.log("socket :"+socket.rooms);
                            socket.broadcast.to('room').emit('invitesuccess', {
                                username:data.username,
                                cid:io.sockets.connected[clients[i]].usernameUID,
                                sid:socket.id
                            });
                           /* io.to(io.sockets.connected[clients[i]].id).emit('invitesuccess', {
                                username:data.username,
                                cid:io.sockets.connected[clients[i]].usernameUID,
                                sid:socket.id
                            });*/
                        break;
                    }
                }
            }
            else{//if(userexist===false)
                console.log("app.js invitegame ELSE:"+data.username);
                io.to(socket.id).emit('invitefalied', {
                    msg: "failed"
                });
            }

});
    });
    socket.on('disconnect',function () {
        console.log("disconenct");
    });
});
