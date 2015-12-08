import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function() {
  this.route('dashboard', {path: 'dashboard'}, function() {
    this.route('group', {resetNamespace: true, path: '/groups/:hashId'})
    this.route('friendship', {resetNamespace: true, path: '/friendships/:hashId'})
  })

  this.route('login')
})

export default Router
