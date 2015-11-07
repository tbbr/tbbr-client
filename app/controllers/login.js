import Ember from 'ember'

export default Ember.Controller.extend({
  actions: {
    onLoginSuccess: function() {
      this.transitionToRoute('groups')
    }
  }
})
