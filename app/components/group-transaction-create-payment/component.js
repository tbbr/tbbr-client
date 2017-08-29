import Ember from 'ember'

export default Ember.Component.extend({
  transactionCreate: function() {
    const flashMessages = this.get('flashMessages')
    let sender = this.get('sender').content
    let amount = this.get('amount') || 0
    let ogRecipientSplits
    if (this.get('splitType') === 'Normal') {
      ogRecipientSplits = this.get('amountSplitsPerMember')
    } else {
      ogRecipientSplits = gtGenerateSplitAmounts(this.get('amount'), Object.assign({}, this.get('shareSplitsPerMember')))
    }
    let recipients = []
    let recipientSplits = []
    let sum = 0
    this.get('group.groupMembers').forEach((m) => {
      if (!this.get('disabledMembers')[m.get('id')]) {
        recipients.push(m.get('user').content)
        recipientSplits.push(ogRecipientSplits[m.get('id')])
        sum += ogRecipientSplits[m.get('id')]
      }
    })

    if (sum !== amount) {
      flashMessages.warning('Things don\'t add up, double check your recipient splits')
      return
    }

    if (!amount || amount === 0) {
      flashMessages.warning('Amount cannot be zero or empty!')
      return
    }

    if (!sender) {
      flashMessages.warning('Someone must have paid! (Please include a sender!)')
      return
    }

    if (recipients.length === 0) {
      flashMessages.warning('You must have at least one recipient!')
      return
    }

    let groupTransaction = this.get('store').createRecord('groupTransaction', {
      type: 'Normal',
      amount: amount,
      memo: this.get('memo').trim(),
      senders: [sender],
      recipients: recipients,
      senderSplits: [amount],
      recipientSplits: recipientSplits,
      recipientSplitType: 'Normal',
      senderSplitType: 'Normal',
      group: this.get('group')
    })

    groupTransaction.save().then(gt => {
      this.sendAction('closeAction')
      this.sendAction('successfullyCreated')
    })
  },
  close: function() {
    this.sendAction('closeAction')
  }
})
