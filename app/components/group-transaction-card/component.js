import Ember from 'ember'
const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),

  isCreatorCurrentUser: function() {
    const curUserId = this.get('sessionUser.session').get('data').authenticated.user_id.toString()
    return curUserId === this.get('groupTransaction.creator.id')
  }.property('groupTransaction.creator', 'sessionUser.session'),

  actions: {
    deleteGroupTransaction: function() {
      this.get('groupTransaction').destroyRecord().then(() => {
        this.sendAction('groupTransactionUpdated')
      })
    },
  }
})
