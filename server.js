const express = require("express");
const config = require("./config/config");
var cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const database = require('./utils/database');
var path = require('path'); 
const passport = require('passport');
const passportJWT = require('passport-jwt');
const cookieParser = require('cookie-parser');
const routes = require("./routes/api");
var session = require('express-session');

const app = express();
var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));


////////////////////////////////////JWT//////////////////////////////////////////////////////

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'pledgewebsite';

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    let user = getUser({ id: jwt_payload.id });
  
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
});

passport.use(strategy);



passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(obj, done) {
  done(null, obj)
})

 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.use(session({
  resave: true,
  secret: "secret",
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 


////////////////////////////////////Serve Config///////////////////////////////////////////////////////////////
//Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Configure API route
app.use("/api", routes);


//Heroku Build Process - Serve static assets if in production
if(process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));

    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}

//Define Port and Start server
const port = config.port || process.env.PORT || 5000;
app.listen(port, function (req, res) {
    console.log(`Server running at ${port}`);
});