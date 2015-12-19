import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  classNames: ['fade-in', 'animation-duration-300s'],

  store: service(),

  type: 'Borrow',
  dollars: null,
  cents: null,
  memo: '',

  setup: function() {
    let self = this
    this.$('.input-dollar').focus()
  }.on('didInsertElement'),

  isBorrow: function() {
    return this.get('type') === 'Borrow'
  }.property('type'),

  isLend: function() {
    return this.get('type') === 'Lend'
  }.property('type'),

  preview: function() {
    let cents = this.get('cents') || 0
    let dollars = this.get('dollars') || 0
    let amount = (parseInt(dollars * 100) + parseInt(cents))/100

    return `I ${this.get('type')}, $${amount.toFixed(2)}`
  }.property('cents', 'dollars', 'type'),

  actions: {
    transactionCreate: function() {
      let cents = this.get('cents') || 0
      let dollars = this.get('dollars') || 0

      let amount = parseInt(dollars * 100) + parseInt(cents)

      if (!amount || amount === 0) {
        return
      }

      let transaction = this.get('store').createRecord('transaction', {
        type: this.get('type'),
        amount: amount,
        memo: this.get('memo'),
        relatedUser: this.get('relatedUser'),
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
