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
  store: service(),

  classNames: ['fade-in', 'animation-duration-300s'],
	splitType: 'Shares',

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
		// this.set('splitType', 'Shares')
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
			if (this.get('splitType') === 'Shares' && !this.get('disabledMembers')[memberId]) {
	      let splits = this.get('shareSplitsPerMember')
	      splits[memberId] = newVal
	      // this should force observers to fire
	      this.set('shareSplitsPerMember', Object.assign({}, splits))
			}
    },

		updateAmountPerMember: function(memberId, amount) {
			if (this.get('splitType') === 'Normal' && !this.get('disabledMembers')[memberId]) {
				amountSplitsPerMember[memberId] = amount
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
				this.set('splitType', 'Shares')
			} else {
				this.set('splitType', 'Normal')
			}
		},

    transactionCreate: function() {
      let sender = this.get('sender')
      let amount = this.get('amount') || 0
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

      if (!sender || !recipient) {
        return
      }

      let transaction = this.get('store').createRecord('transaction', {
        type: this.get('type'),
        amount: amount,
        status: "Confirmed", // TODO: Default it to pending, and have functionality to confirm / reject transaction
        memo: this.get('memo').trim(),
        sender: sender,
        recipient: recipient,
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
