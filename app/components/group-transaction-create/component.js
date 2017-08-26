import Ember from 'ember'

const { service } = Ember.inject

function gtGenerateSimpleSplits(amount, splitCount) {
	let splits = []
	if (splitCount == 0) {
		return splits
	}
	while (splitCount !== 0) {
		let res = Math.ceil(amount / splitCount)
		amount -= res
		splitCount--
		splits.push(res)
	}
	return splits
}

function gtGenerateSplitAmounts(amount, splitParts) {
	let splitPartTotal = 0
	for (let key in splitParts) {
		splitPartTotal += splitParts[key]
	}

	let simpleSplits = gtGenerateSimpleSplits(amount, splitPartTotal)
	let consolidatedSplits = {}
  Object.keys(splitParts).forEach((key) => {
    consolidatedSplits[key] = 0
  })

  // Get the Max Split part
	let maxSplitPart = 0
  for (let key in splitParts) {
    if (splitParts[key] > maxSplitPart) {
      maxSplitPart = splitParts[key]
    }
  }

	let cur = 0
	// Keep running until we've consumed all split parts
	while (cur < splitPartTotal) {
		for (let key in consolidatedSplits) {
			if (splitParts[key] > 0) {
				consolidatedSplits[key] += simpleSplits[cur]
				splitParts[key]--
				cur++
			}
			// if we've consumed all the split parts, then exit
			if (cur == splitPartTotal) {
				break
			}
		}
	}
	return consolidatedSplits
}


export default Ember.Component.extend({
  sessionUser: service('session-user'),
	flashMessages: service(),
  store: service(),

  classNames: ['fade-in', 'animation-duration-300s'],
	splitType: 'Share',

  setup: function() {
    let shareSplitsPerMember = {}
    // Give every member of the group one share initially
    for (let i = 0; i < this.get('group.groupMembers').get('length'); i++) {
      shareSplitsPerMember[this.get('group.groupMembers').objectAt(i).get('id')] = 1
    }
		for (let i = 0; i < this.get('group.groupMembers').get('length'); i++) {
			shareSplitsPerMember[this.get('group.groupMembers').objectAt(i).get('id')] = 1
		}
    this.set('totalShares', this.get('group.groupMembers').get('length'))
    this.set('shareSplitsPerMember', shareSplitsPerMember)
		this.set('amountSplitsPerMember', {})
		this.set('disabledMembers', {})
    this.set('amount', null)
    this.set('memo', '')
		// this.set('splitType', 'Share')
  }.on('init'),

  sender: function() {
    return this.get('sessionUser.current')
  }.property('sessionUser.current'),

  shareSplitAmounts: function() {
    return gtGenerateSplitAmounts(this.get('amount'), Object.assign({}, this.get('shareSplitsPerMember')))
  }.property('amount', 'shareSplitsPerMember'),

  isPayback: function() {
    return this.get('type') === 'Payback'
  }.property('type'),

  actions: {
    updateShareSplitsPerMember: function(memberId, newVal) {
			if (this.get('splitType') === 'Share' && !this.get('disabledMembers')[memberId]) {
	      let splits = this.get('shareSplitsPerMember')
	      splits[memberId] = newVal
	      // this should force observers to fire
	      this.set('shareSplitsPerMember', Object.assign({}, splits))
			}
    },

		updateAmountPerMember: function(memberId, amount) {
			if (this.get('splitType') === 'Normal' && !this.get('disabledMembers')[memberId]) {
				this.get('amountSplitsPerMember')[memberId] = amount
			}
		},

		toggleMemberDisabled: function(memberId) {
			let disabledMembers = this.get('disabledMembers')
			let shareSplits = this.get('shareSplitsPerMember')
			let amountSplits = this.get('amountSplitsPerMember')
			if (disabledMembers[memberId]) {
				console.log('member enabled')
				disabledMembers[memberId] = false
				shareSplits[memberId] = 1
			} else {
				console.log('member disabled')
				disabledMembers[memberId] = true
				// Remove memberId from shareSplitsPerMember and amountSplitsPerMember if it already exists
				delete shareSplits[memberId]
				delete amountSplits[memberId]
			}
			this.set('shareSplitsPerMember', Object.assign({}, shareSplits))
			this.set('amountSplitsPerMember', Object.assign({}, amountSplits))
		},

		updateSplitType: function() {
			if (this.get('splitType') === 'Normal') {
				this.set('splitType', 'Share')
			} else {
				this.set('splitType', 'Normal')
			}
		},

    transactionCreate: function() {
			const flashMessages = this.get('flashMessages')
      let sender = this.get('sender').content
      let amount = this.get('amount') || 0
			let ogRecipientSplits
			if (this.get('splitType') === 'Normal') {
				const amountSplitsPerMember = this.get('amountSplitsPerMember')
				let sum = 0
				for (let key in amountSplitsPerMember) {
					sum += amountSplitsPerMember[key]
				}
				if (sum !== amount) {
					flashMessages.warning('Things don\'t add up, double check your recipient splits')
					return
				}
				ogRecipientSplits = amountSplitsPerMember
			} else {
				ogRecipientSplits = this.get('shareSplitsPerMember')
			}
			let recipients = []
			let recipientSplits = []
      this.get('group.groupMembers').forEach((m) => {
				if (!this.get('disabledMembers')[m.get('id')]) {
					recipients.push(m.get('user').content)
					recipientSplits.push(ogRecipientSplits[m.get('id')])
				}
			})
			
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
        amount: amount,
        memo: this.get('memo').trim(),
        senders: [sender],
        recipients: recipients,
				senderSplits: [1],
				recipientSplits: recipientSplits,
				recipientSplitType: this.get('splitType'),
				senderSplitType: 'Share',
				group: this.get('group')
      })

      groupTransaction.save().then(gt => {
        this.sendAction('closeAction')
      })
    },
    close: function() {
      this.sendAction('closeAction')
    }
  }
})
