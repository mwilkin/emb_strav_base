/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    firebase: {
      apiKey: process.env.firebaseApiKey,
      authDomain: process.env.firebaseAuthDomain,
      databaseURL: process.env.firebaseDbURL,
      storageBucket: process.env.firebaseBucket
    },
    modulePrefix: 'strally',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.stravaSecret = process.env.stravaSecret;
    ENV.stravaAccessToken = process.env.stravaAccessToken;
    ENV.stravaClientID = process.env.stravaClientID;
    ENV.stravaCallbackURL = process.env.stravaCallbackURL;
    ENV.sessionSecret = process.env.sessionSecret;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
