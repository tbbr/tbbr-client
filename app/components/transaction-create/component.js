import Ember from 'ember';

const { service } = Ember.inject

export default Ember.Component.extend({
  classNames: ['fade-in', 'animation-duration-300s'],

  store: service(),

  type: 'Borrow',
  dollars: null,
  cents: null,
  memo: '',

  setup: function() {
    this.$('.input-dollar').focus()
  }.on('didInsertElement'),

  isBorrow: function() {
    return this.get('type') === 'Borrow'
  }.property('type'),

  isLend: function() {
    return this.get('type') === 'Lend'
  }.property('type'),

  actions: {
    transactionCreate: function() {
      let cents = this.get('cents') || 0
      let dollars = this.get('dollars') || 0

      let amount = parseInt(dollars * 100) + parseInt(cents)

      if (!amount || amount === 0) {
        return
      }

      let relatedUser = this.get('user')
      let curGroup = this.get('group')
      let memo = this.get('memo')
      let type = this.get('type')

      let transaction = this.get('store').createRecord('transaction', {
        type: type,
        amount: amount,
        memo: memo,
        relatedUser: relatedUser,
        groupId: curGroup.get('id')
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
});
