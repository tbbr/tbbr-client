import Ember from 'ember'

export default Ember.Component.extend({
  classNameBindings:['isInvalid:invalid'],
  amount: null,
  amountFloat: null,
  isInvalid: false,

  willInsertElement() {
    let amount = this.get('amount')
    if (amount) {
      this.set('amountFloat', (amount/100).toFixed(2))
    }
  },

  didInsertElement() {
    this.$('.input-amount').focus()
  },

  actions: {
    checkAmount: function(event) {
      let checkAmount = /^\d+(?:\.\d{0,2})?$/
      if (checkAmount.test(event.target.value)) {
        this.set('isInvalid', false)
        this.set('amount', parseInt(event.target.value*100))
      } else {
        this.set('isInvalid', true)
        this.set('amount', null)
      }
    }
  }
})
