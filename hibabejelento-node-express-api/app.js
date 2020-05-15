const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const dbUrl = 'mongodb://localhost:27017';

require('./models/user.model');
require('./models/complaint.model');

const userModel = mongoose.model('user');
const complaintModel = mongoose.model('complaint');

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function() {
    console.log('The database connection works');
});

mongoose.connection.on('error', function(error) {
    console.log('Error during the database connection', error);
});

var whitelist = ['https://localhost:3000/login', 'https://localhost:3000/logout', 'https://localhost:3000/register'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors());
//app.options('*', cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// The following two are custom middlewares. They will be called in the exact order they were attached to the server application with app.use
// A middleware chain forwards the req, res parameters using the next method to the next middleware function in the chain, until
// one forgets to call the next, or one cuts the chain by sending a response to the client
// Every method attached to the server with app.use() is basically a middleware, which can add custom logic to the request handling
const pointlessMiddleware = (req, res, next) => {
    req.pointless = 'This middleware is absolutely pointless but is at least a good example';
    next(); // req, res are automatically forwarded to the next middleware on the execution chain
};

// The cookieParser and bodyParser methods are also middlewares. After they handled the request, it will have the body
// as an object in the req.body attribute. If a middleware runs before these two, they will perceive the req.body as undefined

const thisMakesSense= (req, res, next) => {
    if(!req.isAuthenticated()) {
        res.status(403).send('You have no right to do that!');
    } else {
        next();
    }
};

app.use(pointlessMiddleware);

// ezekkel lépteti be a passport sessionbe a usert majd szedi ki onnan
passport.serializeUser((user, done) => {
    if(!user) return done("Error - we have no user", undefined);
    return done(null, user);
});

passport.deserializeUser((user, done) => {
    if(!user) return done("Error - no user object to deserialize", undefined);
    return done(null, user);
});

passport.use('local', new localStrategy((username, password, done) => {
    userModel.findOne({username: username}, function(err, user) {
        if(err) return done('There was an error while retrieving the user');
        if(user) {
            user.comparePasswords(password, function(error, isMatch) {
                if(error || !isMatch) return done('There was an error when comparing the passwords or wrong password');
                return done(null, user);
            })
        } else {
            return done('There is no registered user with that username');
        }
    })
}));

app.use(expressSession({secret: 'thisisawonderfulunbreakablesecretforourserverapplication'}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/user'));
app.use('/', require('./routes/complaint'));

// I protect every route with the /inner prefix with the thisMakeSense middleware
app.use('/inner', thisMakesSense);

const lastResort = (req, res, next) => {
    res.status(200).send('Dont worry, everything is fine, only there was no other method to send a response');
};

app.use(lastResort);

app.listen(3000, () => {
    console.log('the server is running');
});

// node index.js runs the project
