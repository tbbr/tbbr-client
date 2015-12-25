import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['isCreatingTransaction:blurred'],

  // TODO: big design flaw, will figure out later :(
  triggerUserTransactions: 0,

  userTransactions: function() {
    let friendId = this.get('friendship.friend.id')
    let relatedObjectId = this.get('friendship.id')
    let curUserId = this.get('sessionUser.session.data').authenticated.user_id.toString()

    let transactions = this.get('store').filter('transaction', t => {
      if (t.get('relatedObjectId') == relatedObjectId && t.get('relatedObjectType') == 'Friendship') {
        return (t.get('relatedUser.id') === friendId && t.get('creator.id') === curUserId) ||
          (t.get('relatedUser.id') === curUserId && t.get('creator.id') === friendId)
      } else {
        return false
      }
    })
    return transactions
  }.property('sessionUser.session', 'friendship', 'triggerUserTransactions'),

  sortedUserTransactions: function() {
    return this.get('userTransactions').sortBy('createdAt').reverse()
  }.property('userTransactions.[]'),

  getUserTransactions: function() {
    this.get('store').query('transaction', {
      'relatedObjectId': this.get('friendship.id'),
      'relatedObjectType': 'Friendship',
      'relatedUserId': this.get('friendship.friend.id')
    })
  }.observes('sessionUser.session', 'friendship').on('init'),

  userBalance: function() {
    let balance = 0
    let curUser = this.get('sessionUser.current')
    this.get('userTransactions').forEach(t => {
      if (t.get('type') === 'Borrow') {
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
    return balance
  }.property('userTransactions.[]'),

  displayBalance: function() {
    return "$" + (this.get('userBalance')/100).toFixed(2)
  }.property('userBalance'),

  setBalanceStatus: function() {
    let balance = this.get('userBalance')

    if (balance > 0) {
      this.set('balanceStatus', 'positive')
    } else if (balance < 0) {
      this.set('balanceStatus', 'negative')
    }

    if (balance == 0) {
      this.set('balanceStatus', '')
    }
  }.observes('userBalance'),

  actions: {
    addTransaction: function() {
      this.set('isCreatingTransaction', true)
    },
    closeTransactionCreateAction: function() {
      this.set('isCreatingTransaction', false)
    },
    transactionUpdated: function() {
      // TODO: I feel horrible about this :(
      this.incrementProperty('triggerUserTransactions')
    }
  }
})
