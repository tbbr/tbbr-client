import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  session: service('session'),
  actions: {
    loginFacebook: function() {
      this.get('session').authenticate('authenticator:torii', 'facebook').then(() => {
        this.sendAction('onLoginSuccess')
      })
    }
  }
})
