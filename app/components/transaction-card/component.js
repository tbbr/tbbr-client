import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isEditingTransaction:blurred'],
  isEditingTransaction: false,

  dollars: function() {
    let dollars = parseInt(this.get('transaction.amount')/100)
    return dollars === 0 ? "0" : dollars
  }.property('transaction.amount'),

  cents: function() {
    let cents = (this.get('transaction.amount') % 100)

    return cents.toString().length === 1 ? "0" + cents.toString() : cents.toString()
  }.property('transaction.amount'),

  displayType: function() {
    let type = this.get('transaction.type')
    if (type === 'Burrow') {
      return 'burrowed'
    } else if (type === 'Lend') {
      return 'lent'
    }

    return 'burrowed'
  }.property('transaction.type'),

  actions: {
    editTransaction: function() {
      this.set('isEditingTransaction', true)
    },
    closeTransactionEdit: function() {
      this.set('isEditingTransaction', false)
    }
  }
})
