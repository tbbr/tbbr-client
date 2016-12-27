import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNames: ['fade-in', 'animation-duration-300s'],

  sender: function() {
    return this.get('sessionUser.current')
  }.property('sessionUser.current'),

  amount: null,
  memo: '',

  preview: function() {
    let amount = this.get('amount') / 100 || 0;
    let memo = this.get('memo')
    let senderName = this.get('sender.name') || ''

    return `${senderName} paid $${Number(amount.toFixed(2)).toLocaleString()} for ${memo}`
  }.property('amount', 'sender', 'memo'),

  isPayback: function() {
    return this.get('type') === 'Payback'
  }.property('type'),

  actions: {
    transactionCreate: function() {
      let sender = this.get('sender')
      let amount = this.get('amount') || 0
      let usersInvolved = this.get('usersInvolved')
      let recipient

      if (!amount || amount === 0) {
        return
      }

      if (!sender) {
        return
      }

      if (sender.get('id') === usersInvolved[0].get('id')) {
        recipient = usersInvolved[1]
      } else {
        recipient = usersInvolved[0]
      }

      if (!sender || !recipient) {
        return
      }

      let transaction = this.get('store').createRecord('transaction', {
        type: this.get('type'),
        amount: amount,
        status: "Confirmed", // TODO: Default it to pending, and have functionality to confirm / reject transaction
        memo: this.get('memo').trim(),
        sender: sender,
        recipient: recipient,
        relatedObjectType: this.get('relatedObjectType'),
        relatedObjectId: this.get('relatedObjectId')
      })

      transaction.save().then(t => {
        this.sendAction('closeAction')
      })
    },
    changeType: function(type) {
      this.set('type', type)
    },
    close: function() {
      this.sendAction('closeAction')
    }
  }
})
