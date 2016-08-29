
var passport = require('passport'),
    util = require('util'),
    StravaStrategy = require('passport-strava-oauth2').Strategy,
    express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser')
    bodyParser = require('body-parser');

module.exports = function(app) {
  app.use(express.static('public'));
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser(process.env.sessionSecret))
  app.use(session({secret: process.env.sessionSecret,
                   resave: false,
                   saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new StravaStrategy({
      clientID: process.env.stravaClientID,
      clientSecret: process.env.stravaSecret,
      callbackURL: process.env.stravaCallbackURL,
    },
    function(accessToken, refreshToken, profile, done){
      process.nextTick(function(){
        // for testing
        return done(null, profile);
        // after testing, call firebase and return the user profile matching the user id
      })
    }
  ));

  // Passport session setup.
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(sessionUser, done) {
    done(null, sessionUser);
  });


  app.get('/api/auth/strava/send',  passport.authenticate('strava'));

  app.get('/api/auth/strava/rcv', passport.authenticate('strava', { failureRedirect: '/failed'}),
    function(req, res){
      // @note - we know user exists right here in the req var.
      res.redirect('/');
    }
  );

  app.get('/protected', function(req, res) {
    res.send(util.inspect(req.session))
  });

  app.get("/api/user", function (req,res) {
    if (req.isAuthenticated()) {
        res.json({
            authenticated: true,
            user: req.user
        })
    } else {
        res.json({
            authenticated: false,
            user: null
        })
    }
  });
};
