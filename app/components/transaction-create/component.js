import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  classNames: ['fade-in', 'animation-duration-300s'],

  store: service(),

  sender: null,
  type: 'Bill',
  dollars: null,
  cents: null,
  memo: '',

  setup: function() {
    let self = this
    this.$('.input-dollar').focus()
  }.on('didInsertElement'),

  preview: function() {
    let cents = this.get('cents') || 0
    let dollars = this.get('dollars') || 0
    let amount = (parseInt(dollars * 100) + parseInt(cents))/100
    let memo = this.get('memo')
    let senderName = this.get('sender.name') || ''

    return `${senderName} paid $${amount.toFixed(2)} for ${memo}`
  }.property('cents', 'dollars', 'sender', 'memo'),

  actions: {
    transactionCreate: function() {
      let cents = this.get('cents') || 0
      let dollars = this.get('dollars') || 0
      let sender = this.get('sender')
      let amount = parseInt(dollars * 100) + parseInt(cents)
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

      let transaction = this.get('store').createRecord('transaction', {
        type: this.get('type'),
        amount: amount,
        memo: this.get('memo').trim(),
        sender: this.get('sender'),
        recipient: recipient,
        relatedObjectType: this.get('relatedObjectType'),
        relatedObjectId: this.get('relatedObjectId')
      })

      debugger

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
