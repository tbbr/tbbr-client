import Ember from 'ember'

export default Ember.Component.extend({
  classNameBindings:['isInvalid:invalid', 'isSmall:currency-input-small'],
  amount: null,
  isInvalid: false,

  amountFloat: function() {
    let amount = this.get('amount')
    if (amount) {
      return (amount/100).toFixed(2)
    }
    return null
  }.property('amount'),

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
