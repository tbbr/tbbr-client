import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  classNameBindings: ['isEditingTransaction:blurred'],

  sessionUser: service('session-user'),
  isEditingTransaction: false,

  isCreatorCurrentUser: function() {
    return this.get('sessionUser.current.id') === this.get('transaction.creator.id')
  }.property('transaction.creator'),

  dollars: function() {
    let dollars = parseInt(this.get('transaction.amount')/100)
    return dollars === 0 ? "0" : dollars
  }.property('transaction.amount'),

  cents: function() {
    let cents = (this.get('transaction.amount') % 100)

    return cents.toString().length === 1 ? "0" + cents.toString() : cents.toString()
  }.property('transaction.amount'),

  actions: {
    editTransaction: function() {
      this.set('isEditingTransaction', true)
    },
    deleteTransaction: function() {
      this.get('transaction').destroyRecord().then(() => {
        this.sendAction('transactionUpdated')
      })
    },
    closeTransactionEdit: function() {
      this.set('isEditingTransaction', false)
    },
    transactionUpdated: function() {
      this.sendAction('transactionUpdated')
    }
  }
})
