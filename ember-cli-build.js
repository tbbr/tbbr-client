/* global require, module */
var path = require('path')
var env = process.env.EMBER_ENV
var isProductionLikeENV = ['production', 'staging'].indexOf(env) > -1
var envConfig = require('./config/environment')(env)
var EmberApp = require('ember-cli/lib/broccoli/ember-app')
var jsStringEscape = require('js-string-escape')

function render(errors) {
  if (!errors) { return '' }
  return errors.map(function(error) {
    return error.line + ':' + error.column + ' ' +
      ' - ' + error.message + ' (' + error.ruleId +')'
  }).join('\n')
}

// Qunit test generator
function eslintTestGenerator(relativePath, errors) {
  var pass = !errors || errors.length === 0
  return "import { module, test } from 'qunit'\n" +
    "module('ESLint - " + path.dirname(relativePath) + "')\n" +
    "test('" + relativePath + " should pass ESLint', function(assert) {\n" +
    "  assert.ok(" + pass + ", '" + relativePath + " should pass ESLint." +
    jsStringEscape("\n" + render(errors)) + "')\n" +
   "})\n"
}

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    storeConfigInMeta: false,
    tests: !isProductionLikeENV,
    hinting: false, // Until this goes somewhere: https://github.com/ember-cli/rfcs/pull/15
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
    eslint: {
      testGenerator: eslintTestGenerator
    }
  })

  app.import({
    development : 'bower_components/ember-data/ember-data.js',
    staging     : 'bower_components/ember-data/ember-data.prod.js',
    production  : 'bower_components/ember-data/ember-data.prod.js'
  }, {
    exports: { 'ember-data': [ 'default' ] }
  })

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

  app.import('bower_components/hashids/lib/hashids.js')
  app.import('bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js')
  app.import('bower_components/perfect-scrollbar/css/perfect-scrollbar.css')

  return app.toTree()
}
