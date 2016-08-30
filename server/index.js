
var passport = require('passport'),
    util = require('util'),
    StravaStrategy = require('passport-strava-oauth2').Strategy,
    express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser')
    bodyParser = require('body-parser'),
    https = require('https');

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

  app.get('/api/auth/strava/logout', function(req, res){
    if(req.isAuthenticated()){
      req.logout();
      res.redirect('/');
    }
  })

  app.get("/api/user/starred", function(req, res){
    console.log(req.user.token)
    if(req.isAuthenticated()){
      var options = {
        host: "www.strava.com",
        port: 443,
        path: '/api/v3/athletes/' + req.user.id + '/segments/starred',
        method: "GET",
        headers: {
          Authorization: "Bearer " + req.user.token
        }
      }
      var request = https.request(options, function(response){
        var buffer = "";
        response.on('data', (data) =>{
          buffer += data;
        });
        response.on('end', function(){
          res.send(JSON.parse(buffer));
        })
      })
      request.end();
      request.on('error', (e) => {
        process.stdout.write(e);
      })
    } else {
      res.json({
          authenticated: false,
          user: null
      })
    }
  });

  app.get("/api/user/effort/:effort_id", function(req, res){
    console.log(req.params.effort_id)
    if(req.isAuthenticated()){
      var seg_id = parseInt(req.params.effort_id);
      var options = {
        host: "www.strava.com",
        port: 443,
        path: '/api/v3/segment_efforts/' + seg_id ,
        method: "GET",
        headers: {
          Authorization: "Bearer " + req.user.token
        }
      };
      var request = https.request(options, function(response){
        var buffer = "";
        response.on('data', (data) =>{
          buffer += data;
        });
        response.on('end', function(){
          res.send(JSON.parse(buffer));
        })
      })
      request.end();
      request.on('error', (e) => {
        console.log(e);
      })
    } else {
      res.json({
          authenticated: false,
          user: null
      })
    }
  });

  app.get("/api/user/segment/:segment_id/:start_date/:end_date", function(req, res){

    if(req.isAuthenticated()){
      var seg_id = parseInt(req.params.segment_id);
      var start_date = req.params.start_date;
      var end_date = req.params.end_date;
      var options = {
        host: "www.strava.com",
        port: 443,
        path: '/api/v3/segments/' + seg_id + "/all_efforts?athlete_id=" + req.user.id + "&start_date_local=" + start_date + "&end_date_local=" + end_date ,
        method: "GET",
        headers: {
          Authorization: "Bearer " + req.user.token
        }
      };
      var request = https.request(options, function(response){
        var buffer = "";
        response.on('data', (data) =>{
          buffer += data;
        });
        response.on('end', function(){
          res.send(JSON.parse(buffer));
        })
      })
      request.end();
      request.on('error', (e) => {
        console.log(e);
      })
    } else {
      res.json({
          authenticated: false,
          user: null
      })
    }
  });
};
