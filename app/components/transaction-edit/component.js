import Ember from 'ember'

// const { service } = Ember.inject

export default Ember.Component.extend({
  classNames: ['fade-in', 'animation-duration-300s'],

  setup: function() {
    this.$('.input-dollar').focus()
  }.on('didInsertElement'),

  sender: function() {
    return this.get('transaction.sender')
  }.property('transaction.sender'),

  dollars: function() {
    return parseInt(this.get('transaction.amount')/100)
  }.property('transaction.amount'),

  cents: function() {
    let cents = this.get('transaction.amount') % 100
    return cents.toString().length < 2 ? "0" + cents.toString() : cents.toString()
  }.property('transaction.amount'),

  isPayback: function() {
    return this.get('transaction.type') === 'Payback'
  }.property('type'),

  usersInvolved: function() {
    return [this.get('transaction.sender'), this.get('transaction.recipient')]
  }.property('transaction.sender', 'transaction.recipient'),

  actions: {
    transactionSave: function() {
      let cents = this.get('cents') || 0
      let dollars = this.get('dollars') || 0
      let amount = parseInt(dollars * 100) + parseInt(cents)
      let sender = this.get('sender')
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

      let transaction = this.get('transaction')

      transaction.set('sender', sender)
      transaction.set('recipient', recipient)
      transaction.set('amount', amount)
      transaction.set('memo', transaction.get('memo').trim())

      this.get('transaction').save().then(() => {
        this.sendAction('closeAction')
        this.sendAction('transactionUpdated')
      })
    },
    close: function() {
      this.sendAction('closeAction')
    }
  }
})
