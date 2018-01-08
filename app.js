var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var sharedsession = require('express-socket.io-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt =  require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var socket = require('socket.io');
var CircularJSON = require('circular-json');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;

//var db = mongoose.createConnection('mongodb://localhost/loginapp');

var socketserver = require('./socketserver/socketserver');

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


//*************************SOCKET***************************//
var io = socket(server);
var x;
var cleanDB=true;
//Socket Middleware to handle every socket connection and request
io.use((socket, next) => {
          if(cleanDB)
          {
              cleanDB=false;
              var MongoClient = require('mongodb').MongoClient;
              var url = "mongodb://localhost:27017/loginapp";

              MongoClient.connect(url, function(err, db) {
                  if (err) throw err;
                  db.collection("actives").remove({},function(err) {
                      if (err) throw err;

                      db.close();

                  });
              });
          }

          console.log('\n********************************');
          console.log('Incoming socket ID is : '+socket.id);
          socketserver.handleConnection(socket.handshake.query.token, socket.id, function(err){
              if(err) throw err;


          });
          //setTimeout(socketserver.broadcastActiveUsers, 1800);
          setTimeout(testIt, 600);
  
      function testIt(){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/loginapp";
     
        MongoClient.connect(url, function(err, db) {
            console.log("heheheheheheheeheheh :" );
            if (err) throw err;
            db.collection("actives").find({}).toArray(function(err, result) {
                if (err) throw err;

                db.close();
                io.sockets.emit('newuser',{
                    activeUlist:result

                });
            });
        });
      }
  // x = socketserver.broadcastActiveUsers();
  // console.log('list of all active users :');
  // console.log(JSON.stringify(x, undefined, 4 ));
  next();

});

io.on('connection', (socket)=>{

  socket.on('newuser', function (data) {
      console.log("client id: "+ socket.id);
          io.sockets.emit('newuser', data);
  });
    socket.on('userLogout', function (data) {
        console.log("user logout client id: "+ socket.id);
        socket.broadcast.emit('userLogout', data);
    });
    // chat data by Niaz Hussain
       socket.on('chat', function (data) {
          console.log("client id: "+ socket.id);
          io.sockets.emit('chat', data);
  });

    // Niaz Hussain :when user is typing ,show typing message to all connected user
        socket.on('typing', function (data){
           socket.broadcast.emit('typing', data);
        });
      // Niaz Hussain :
        socket.on('not typing', function (data){
            socket.broadcast.emit('not typing',data);
        });
      // Niaz Hussain :
      socket.on('thinking', function (data){
          socket.broadcast.emit('thinking',data);
      });


      //Handle Invite requests
      socket.on('invitegame', function(data){
        console.log('invite for : '+data.id+ ' from : '+socket.id);

      });

  socket.on('disconnect', function () {
      socketserver.handleDisconnect(socket.handshake.query.token, socket.id, function(err){
        if(err) throw err;
          
      });

      setTimeout(doIt, 600);
      console.log('disconnected');
      // console.log('broadcast is calling DISCONNECT');
      //setTimeout(socketserver.broadcastActiveUsers, 1800);

      
  });

    function doIt(){
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/loginapp";

        MongoClient.connect(url, function(err, db) {
            console.log("heheheheheheheeheheh :" );
            if (err) throw err;
            db.collection("actives").find({}).toArray(function(err, result) {
                if (err) throw err;

                db.close();
                io.sockets.emit('userLogout',{
                    activeUlist:result

                });
            });
        });
    };
});

//********************************************************//

