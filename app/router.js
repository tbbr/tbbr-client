import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function() {
  this.route('index', {path: '/'}, function() {
    this.route('group', {resetNamespace: true, path: '/groups/:hashId'})
    this.route('friendship', {resetNamespace: true, path: '/friendships/:hashId'})
  })

  this.route('login')
})

export default Router
