import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['isCreatingTransaction:blurred'],

  userTransactions: function() {
    let friendId = this.get('friendship.friend.id')
    let relatedObjectId = this.get('friendship.friendshipDataId')
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
  }.property('sessionUser.session', 'friendship'),

  sortedUserTransactions: function() {
    return this.get('userTransactions').sortBy('createdAt').reverse()
  }.property('userTransactions.[]'),

  getUserTransactions: function() {
    this.get('store').query('transaction', {
      'relatedObjectId': this.get('friendship.friendshipDataId'),
      'relatedObjectType': 'Friendship',
      'relatedUserId': this.get('friendship.friend.id')
    })
  }.observes('sessionUser.session', 'friendship').on('init'),

  balanceStatus: function() {
    let balance = this.get('friendship.balance')

    if (balance > 0) {
      return 'positive'
    } else if (balance < 0) {
      return 'negative'
    }
    return ''
  }.property('friendship.balance'),

  actions: {
    addTransaction: function() {
      this.set('isCreatingTransaction', true)
    },
    closeTransactionCreateAction: function() {
      this.set('isCreatingTransaction', false)
      this.sendAction('reloadFriendship')
    },
    updateBalance: function() {
      this.sendAction('reloadFriendship')
    }
  }
})
