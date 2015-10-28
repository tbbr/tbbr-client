import Ember from 'ember';

const { service } = Ember.inject

export default Ember.Component.extend({
  store: service(),

  type: 'Burrow',
  dollars: null,
  cents: null,
  memo: '',

  isBurrow: function() {
    return this.get('type') === 'Burrow'
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
    }
  }
});
