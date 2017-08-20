import Ember from 'ember'
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return Ember.RSVP.hash({
      groups: this.store.findAll('group'),
      friendships: this.store.findAll('friendship')
    })
  },
  setupController(controller, model) {
    controller.set('model', model)
  }
})
