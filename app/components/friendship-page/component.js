import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['blurred:blurred'],
  wantsSettledTransactions: false,

  userTransactions: function() {
    let relatedObjectId = this.get('friendship.friendshipDataId')

    let transactions = this.get('store').filter('transaction', t => {
      return t.get('relatedObjectId') == relatedObjectId
      && t.get('relatedObjectType') == 'Friendship'
    })
    return transactions
  }.property('friendship.friendshipDataId'),

  sortedUserTransactions: function() {
    return this.get('userTransactions').sortBy('createdAt').reverse()
  }.property('userTransactions.[]'),

  userSettledTransactions: function() {
    let relatedObjectId = this.get('friendship.friendshipDataId')

    let settledTransactions = this.get('store').filter('transaction', t => {
      console.log(t.get('memo'))
      return t.get('relatedObjectId') == relatedObjectId &&
      t.get('relatedObjectType') == 'Friendship' && t.get('is_settled') == true
    })
    return settledTransactions
  }.property('friendship.friendshipDataId'),

  sortedUserSettledTransactions: function() {
    return this.get('userSettledTransactions').sortBy('createdAt').reverse()
  }.property('userTransactions.[]'),

  getUserTransactions: function() {
    this.get('store').query('transaction', {
      'relatedObjectId': this.get('friendship.friendshipDataId'),
      'relatedObjectType': 'Friendship'
    })
  }.observes('friendship').on('init'),

  isBalanceNegative: function() {
    return this.get('friendship.balance') < 0
  }.property('friendship.balance'),

  balanceStatus: function() {
    let balance = this.get('friendship.balance')

    if (balance > 0) {
      return 'positive'
    } else if (balance < 0) {
      return 'negative'
    }
    return ''
  }.property('friendship.balance'),

  usersInvolved: function() {
    let curUser = this.get('sessionUser.current')
    return [curUser, this.get('friendship.friend')]
  }.property('sessionUser.current', 'friendship.friend'),

  actions: {
    addTransaction: function() {
      this.set('isCreatingTransaction', true)
      this.set('blurred', true)
    },
    settleTransaction: function() {
      this.set('isSettlingTransaction', true)
      this.set('blurred', true)
    },
    closeTransactionCreateAction: function() {
      this.set('isCreatingTransaction', false)
      this.set('isSettlingTransaction', false)
      this.set('blurred', false)
      this.sendAction('reloadFriendship')
    },
    updateBalance: function() {
      this.sendAction('reloadFriendship')
    },
    wantsSettled: function() {
      console.log('wantsSettled function is firing')
      this.toggleProperty('wantsSettledTransactions', true);
    }
  }
})
