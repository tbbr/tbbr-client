import Ember from 'ember'
const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),

  myTransaction: function() {
    const transactions = this.get('transactions')
    const memberUserId = this.get('member').get('user').get('id')
    let myTransaction = transactions.filter((t) => {
      if (t.senderId === memberUserId || t.recipientId === memberUserId) {
        return true
      } else {
        return false
      }
    })

    // Cannot have more than one transactions between two users if transactions are minimized
    return myTransaction[0]
  }.property('transactions.[]'),

  myTransactionAmount: function() {
    if (!this.get('myTransaction')) {
      return 0
    }
    return this.get('myTransaction').amount
  }.property('myTransaction'),

  memberTotalAmount: function() {
    const m = this.get('member')
    return Math.abs(m.get('amountSent') - m.get('amountReceived'))
  }.property('member.amountSent', 'member.amountReceived'),

  isCurrentUser: function() {
    const memberUserId = this.get('member').get('user').get('id')
    const curUserId = this.get('sessionUser.session').get('data').authenticated.user_id.toString()
    return memberUserId === curUserId
  }.property('sessionUser.session'),

  amountText: function() {
    const myTransaction = this.get('myTransaction')
    const memberUserId = this.get('member').get('user').get('id')
    const curUserId = this.get('sessionUser.session').get('data').authenticated.user_id.toString()
    if (!myTransaction) {
      return ''
    }

    if (myTransaction.senderId === memberUserId) {
      return 'Owes you'
    } else {
      return 'You owe'
    }
  }.property('myTransaction'),

  curAmountText: function() {
    const member = this.get('member')
    const memberUserId = this.get('member').get('user').get('id')
    const curUserId = this.get('sessionUser.session').get('data').authenticated.user_id.toString()

    if (curUserId === memberUserId) {
      if (member.get('amountSent') > member.get('amountReceived')) {
        return 'You receive'
      } else if (member.get('amountSent') < member.get('amountReceived')) {
        return 'You owe'
      } else {
        return ''
      }
    }
  }.property('sessionUser.session', 'member.amountSent', 'member.amountReceived')

})
