/* global require, module */
var env = process.env.EMBER_ENV;
var isProductionLikeENV = ['production', 'staging'].indexOf(env) > -1;
var envConfig = require('./config/environment')(env);
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    tests: !isProductionLikeENV,
    hinting: !isProductionLikeENV,
    sourcemaps: {
      enabled: !isProductionLikeENV
    },
    minifyJS: {
      enabled: isProductionLikeENV
    },
    minifyCSS: {
      enabled: isProductionLikeENV
    },
    minifyHTML: {
      enabled: isProductionLikeENV
    },
    fingerprint: {
      enabled: isProductionLikeENV,
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg', 'woff', 'ttf', 'eot'],
      exclude: ['apple-touch-icon', 'ms-tile'],
      prepend: envConfig.assetHost
    },
  });

  app.import({
    development : 'bower_components/ember-data/ember-data.js',
    staging     : 'bower_components/ember-data/ember-data.prod.js',
    production  : 'bower_components/ember-data/ember-data.prod.js'
  }, {
    exports: { 'ember-data': [ 'default' ] }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/hashids/lib/hashids.js');
  app.import('bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js')
  app.import('bower_components/perfect-scrollbar/css/perfect-scrollbar.css')

  return app.toTree();
};
