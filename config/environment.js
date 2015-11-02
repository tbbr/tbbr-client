/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'tbbr-client',
    environment: environment,
    baseURL: '/',
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
      HASHIDS_SALT: 'mSwyDdV6Ml4BNvmsM9TK',
      HAHSIDS_MIN_LENGTH: 11
    },

    apiHost: '//tbbr.me',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'font-src': "'self' http://fonts.gstatic.com", // Allow fonts to be loaded from http://fonts.gstatic.com
      'connect-src': "'self' http://localhost:8080", // Allow data (ajax/websocket) from http://localhost:8080
      'img-src': "'self' http://fpoimg.com http://i.imgur.com",
      'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
      'media-src': "'self'"
    },
    appHost: 'http://tbbr.me'
  };

  ENV.torii = {
    providers: {
      'facebook-oauth2': {
        apiKey: '556458821173978'
      }
    }
  };

  ENV['ember-simple-auth'] = {
    store: 'session-store:local-storage'
  };

  if (environment === 'development') {
    ENV.apiHost = '//localhost:8080'
    ENV.appHost = 'http://localhost:4200'
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'staging') {
    ENV.assetHost = '//s3.amazonaws.com/tbbrassets/'
  }


  if (environment === 'production') {
    ENV.assetHost = '//s3.amazonaws.com/tbbrassets/'
  }

  return ENV;
};
