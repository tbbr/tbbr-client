import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function() {
  this.route('groups', {path: 'groups'}, function() {
    this.route('group', {resetNamespace: true, path: '/:hashId'})
  })
  this.route('login')
})

export default Router
