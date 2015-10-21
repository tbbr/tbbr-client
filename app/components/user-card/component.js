import Ember from 'ember';

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['isBlurred:blurred'],

  userTransactions: function() {
    return this.get('store').query('transaction', {
      'groupId': this.get('group.id'),
      'userId': this.get('user.id')
    })
  }.property('sessionUser.curent', 'user', 'group'),

  userBalance: function() {
    let balance = 0
    let curUser = this.get('sessionUser.current')
    this.get('userTransactions').forEach(t => {
      if (curUser.get('id') == t.get('lenderId').get('id')) {
        balance += t.get('amount')
      } else if (curUser.get('id') == t.get('burrowerId').get('id')) {
        balance -= t.get('amount')
      }
    })
    return balance
  }.property('userTransactions.content'),

  isCreatingTransaction: false,
  isShowTransactions: false,

  actions: {
    addTransaction: function() {
      this.set('isCreatingTransaction', true)
      this.set('isBlurred', true)
    },
    toggleShowTransactions: function() {
      this.toggleProperty('isShowTransactions')
    }
  }
});
