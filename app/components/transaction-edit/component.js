import Ember from 'ember'

// const { service } = Ember.inject

export default Ember.Component.extend({
  classNames: ['fade-in', 'animation-duration-300s'],

  dollars: function() {
    return parseInt(this.get('transaction.amount')/100)
  }.property('transaction.amount'),

  cents: function() {
    let cents = this.get('transaction.amount') % 100
    return cents.toString().length < 2 ? "0" + cents.toString() : cents.toString()
  }.property('transaction.amount'),

  setup: function() {
    this.$('.input-dollar').focus()
  }.on('didInsertElement'),

  isBorrow: function() {
    return this.get('transaction.type') === 'Borrow'
  }.property('transaction.type'),

  isLend: function() {
    return this.get('transaction.type') === 'Lend'
  }.property('transaction.type'),


  actions: {
    transactionSave: function() {
      let cents = this.get('cents') || 0
      let dollars = this.get('dollars') || 0

      let amount = parseInt(dollars * 100) + parseInt(cents)

      if (!amount || amount === 0) {
        return
      }

      let transaction = this.get('transaction')

      transaction.set('amount', amount)
      transaction.set('memo', transaction.get('memo').trim())

      this.get('transaction').save().then(() => {
        this.sendAction('closeAction')
        this.sendAction('transactionUpdated')
      })
    },
    changeType: function(type) {
      this.get('transaction').set('type', type)
    },
    close: function() {
      this.sendAction('closeAction')
    },
    checkDollars: function(d) {
      let dot = (d.lastIndexOf(".") > -1) ? true : false

      let dollars = Math.abs(parseInt(d))
      if (dollars > 9999) {
        dollars = 9999
      }
      this.set('dollars', dollars)

      if (dot) {
        this.$('.input-cent').focus()
      }
    },
    checkCents: function(c) {
      let cents = Math.abs(parseInt(c))
      if (cents > 99) {
        cents = 99
      }
      this.set('cents', cents)
    }
  }
})
