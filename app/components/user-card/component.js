import Ember from 'ember';

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['isCreatingTransaction:blurred'],

  userTransactions: function() {
    let groupId = this.get('group.id')
    let userId = this.get('user.id')
    let curUserId = this.get('sessionUser.current.id')

    let transactions = this.get('store').filter('transaction', t => {
      if (t.get('groupId') == groupId) {
        return (t.get('relatedUser.id') === userId && t.get('creator.id') === curUserId)||
          (t.get('relatedUser.id') === curUserId && t.get('creator.id') === userId)
      } else {
        return false
      }
    })
    return transactions
  }.property(),

  getUserTransactions: function() {
    this.get('store').query('transaction', {
      'groupId': this.get('group.id'),
      'relatedUserId': this.get('user.id')
    })
  }.observes('sessionUser.curent', 'user', 'group').on('init'),


  userBalance: function() {
    let balance = 0
    let curUser = this.get('sessionUser.current')
    this.get('userTransactions').forEach(t => {
      if (t.get('type') === 'Burrow') {
        if (curUser.get('id') === t.get('creator.id')) {
          balance -= t.get('amount')
        } else {
          balance += t.get('amount')
        }
      } else if (t.get('type') === 'Lend') {
        if (curUser.get('id') === t.get('creator.id')) {
          balance += t.get('amount')
        } else {
          balance -= t.get('amount')
        }
      }
    })
    if (balance > 0) {
      this.set('balanceStatus', 'positive')
    } else if (balance < 0) {
      this.set('balanceStatus', 'negative')
    }
    return "$" + (balance/100).toFixed(2)
  }.property('userTransactions.[]'),

  isCreatingTransaction: false,
  isShowTransactions: false,

  actions: {
    addTransaction: function() {
      this.set('isCreatingTransaction', true)
    },
    toggleShowTransactions: function() {
      this.toggleProperty('isShowTransactions')
    },
    closeTransactionCreateAction: function() {
      this.set('isCreatingTransaction', false)
    }
  }
});
