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
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/loginapp');
var db = mongoose.connection;

//var db = mongoose.createConnection('mongodb://localhost/loginapp');

var socketserver = require('./socketserver/socketserver');
var Active = require('./models/active');
var Game = require('./models/game');

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

//Clear Active
Active.remove({},()=>{
    console.log('active cleared');
});

//Clear Game Collection
Game.clearTable(()=>{
    console.log('Game Collection cleared on server start');
});

//************************************************************//
function getUser(){

    Active.find({}, function(err, result) {
        console.log(" dataaaa "+JSON.stringify(result, undefined , 4));
        if (err) throw err;

        io.sockets.emit('newuser',{
            activeUlist:result

        });
    });
}

function sendInvite(data){
    console.log('query :'+ query);
    var query=data.id;

    var requestFromId=jwt.decode(data.myToken);
    var requestFromUser=data.myUser;
    Active.getUserByID(query, function(err, result) {
        if (err) throw err;

        console.log(JSON.stringify(result, undefined , 4));
        io.to(result.socketid).emit( 'inviteReceive', {
            userid : result.userid,
            socketid:result.socketid,
            username:result.username,
            requestFromId:requestFromId,
            requestFromUser:requestFromUser
        });
    });

};
function inviteAccepted(data){
    Active.getUserByID(data.acceptedToId, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, undefined , 4));
        io.to(result.socketid).emit( 'inviteAccepted', {
            userid : result.userid,
            socketid:result.socketid,
            username:result.username,
            acceptedById:data.acceptedById,
            acceptedByName:data.acceptedByName
        });
    });
};
function inviteRejected(data){
    Active.getUserByID(data.rejectedToId, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, undefined , 4));
        io.to(result.socketid).emit( 'inviteRejected', {
            userid : result.userid,
            socketid:result.socketid,
            username:result.username,
            rejectedById:data.rejectedById,
            rejectedByName:data.rejectedByName
        });
    });
};
//*************************SOCKET***************************//
var io = socket(server);
var x;

//Socket Middleware to handle every socket connection and request
io.use((socket, next) => {

    console.log('\n********************************');
    console.log('Incoming socket ID is : '+socket.id);
    socketserver.handleConnection(socket.handshake.query.token, socket.id, function(err){
        if(err) throw err;


    });
    //setTimeout(socketserver.broadcastActiveUsers, 1800);
    setTimeout(getUser, 600);
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
        //data contains both users ids as  acceptedToId, acceptedById
        Game.find({}, function(err, game) {
            if (err) throw err;
            if(game.length)
            {
                Active.getUserByID(game[0].acceptedToId, function(err, acceptedToUser) {
                    if (err) throw err;
                    Active.getUserByID(game[0].acceptedById, function(err, acceptedByUser) {
                        if (err) throw err;
                        while(acceptedByUser.socketid == "undefined" && acceptedToUser.socketid == "undefined")
                        {
                        }

                        io.to(acceptedByUser.socketid).to(acceptedToUser.socketid).emit('chat', data);
                    });
                });
            }
        });
    });

    // Niaz Hussain :when user is typing ,show typing message to all connected user
    socket.on('typing', function (data){
        Game.find({}, function(err, game) {
            if (err) throw err;
            if(game.length)
            {
                Active.getUserByID(game[0].acceptedToId, function(err, acceptedToUser) {
                    if (err) throw err;
                    Active.getUserByID(game[0].acceptedById, function(err, acceptedByUser) {
                        if (err) throw err;
                        while(acceptedByUser.socketid == "undefined" && acceptedToUser.socketid == "undefined")
                        {
                        }

                        io.to(acceptedByUser.socketid).to(acceptedToUser.socketid).emit('typing', data);
                    });
                });
            }
        });
    });
    // Niaz Hussain :
    socket.on('not typing', function (data){
        Game.find({}, function(err, game) {
            if (err) throw err;
            if(game.length)
            {
                Active.getUserByID(game[0].acceptedToId, function(err, acceptedToUser) {
                    if (err) throw err;
                    Active.getUserByID(game[0].acceptedById, function(err, acceptedByUser) {
                        if (err) throw err;
                        while(acceptedByUser.socketid == "undefined" && acceptedToUser.socketid == "undefined")
                        {
                        }

                        io.to(acceptedByUser.socketid).to(acceptedToUser.socketid).emit('not typing', data);
                    });
                });
            }
        });
    });
    // Niaz Hussain :
    socket.on('thinking', function (data){
        Game.find({}, function(err, game) {
            if (err) throw err;
            if(game.length)
            {
                Active.getUserByID(game[0].acceptedToId, function(err, acceptedToUser) {
                    if (err) throw err;
                    Active.getUserByID(game[0].acceptedById, function(err, acceptedByUser) {
                        if (err) throw err;
                        while(acceptedByUser.socketid == "undefined" && acceptedToUser.socketid == "undefined")
                        {
                        }
                        io.to(acceptedByUser.socketid).to(acceptedToUser.socketid).emit('thinking', data);
                    });
                });
            }
        });
    });
    //Handle Invite requests
    socket.on('inviteSend', function(data){

        //TO active table - id socket - receiver ID
        //FROM token decode - from ID
        sendInvite(data);
    });
    //Handle invite accept
    socket.on('inviteAccepted', function(data){
        //TO active table - id socket - receiver ID
        //FROM token decode - from ID
        inviteAccepted(data);
    });
    socket.on('inviteRejected', function(data){
        //TO active table - id socket - receiver ID
        //FROM token decode - from ID
        inviteRejected(data);
    });
    //Play game
    socket.on('playgame',function (data) {

        game = new Game ({
            acceptedById : data.acceptedById ,
            acceptedToId : data.acceptedToId
        });

        Game.clearTable( (err) => {
            if (err) throw err;
            console.log('game created'+JSON.stringify(game,undefined, 4));

        });
        Game.createGame(game, (err) => {
            if (err) throw err;


        });

        //data contains both users ids as  acceptedToId, acceptedById

        Game.find({}, function(err, game) {
            if (err) throw err;

            while(game.length == "undefined")
            {

            }
            // if(game.length)
            // {

                Active.getUserByID(data.acceptedToId, function(err, acceptedToUser) {
                    if (err) throw err;
                    Active.getUserByID(data.acceptedById, function(err, acceptedByUser) {
                        if (err) throw err;
                        while(acceptedByUser.socketid == "undefined" && acceptedToUser.socketid == "undefined")
                        {
                        }
                        data.acceptedByUserName=acceptedByUser.username;
                        data.acceptedToUserName=acceptedToUser.username;
                        io.to(acceptedByUser.socketid).to(acceptedToUser.socketid).emit('playgame', data);
                    });
                });

          //  }

        });
        //////////////////////////////////////////////
    });
    socket.on('disconnect', function () {
        socketserver.handleDisconnect(socket.handshake.query.token, socket.id, function(err){
            if(err) throw err;

        });
        setTimeout(getUser, 600);
        console.log('disconnected');
        // console.log('broadcast is calling DISCONNECT');
        //setTimeout(socketserver.broadcastActiveUsers, 1800);
    });
///////////////////////// multiplayer gameobject /////////////
    socket.on('SendMove', function (data) {
        var senderid = jwt.decode(data.Token);
        Game.find({}, function(err, game) {
            if (err) throw err;
            if(game.length)
            {
                Active.getUserByID(game[0].acceptedToId, function(err, acceptedToUser) {
                    if (err) throw err;
                    Active.getUserByID(game[0].acceptedById, function(err, acceptedByUser) {
                        if (err) throw err;
                        while(acceptedByUser.socketid == "undefined" && acceptedToUser.socketid == "undefined")
                        {
                        }
                        data.acceptedByUserName=acceptedByUser.username;
                        data.acceptedToUserName=acceptedToUser.username;
                        if(game[0].acceptedToId == senderid)
                            io.to(acceptedByUser.socketid).emit('SendMove', data);
                        else if(game[0].acceptedById == senderid)
                            io.to(acceptedToUser.socketid).emit('SendMove', data);


                    });
                });
            }
        });
    });
});

//********************************************************//

