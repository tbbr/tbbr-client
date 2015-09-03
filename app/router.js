import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('groups', {resetNamespace: true}, function() {
    this.route('group', {resetNamespace: true, path: '/:group_hash'});
  });
});

export default Router;
