import Ember from 'ember'
import config from '../../config/environment'

const { service } = Ember.inject

function determineMinimizedTransactions(curUserId, groupMembers) {
  let transactions = []
  let simpleMembers = []
  groupMembers = groupMembers.toArray()
  groupMembers.forEach((m) => {
    simpleMembers.push({
      id: m.get('id'),
      val: m.get('amountSent') - m.get('amountReceived'),
      user: m.get('user')
    })
  })
  simpleMembers.sort((a,b) => {
    return b.val - a.val
  })

  let left = 0
  let right = simpleMembers.length - 1

  while (left < right) {
    let leftMember = simpleMembers[left]
    let rightMember = simpleMembers[right]
    let transactionAmount
    const result = leftMember.val + rightMember.val
    if (result < 0) {
      transactionAmount = leftMember.val
      leftMember.val = 0
      rightMember.val = result
      left++
    } else if (result > 0) {
      transactionAmount = Math.abs(rightMember.val)
      leftMember.val = result
      rightMember.val = 0
      right--
    } else {
      transactionAmount = leftMember.val
      leftMember.val = 0
      rightMember.val = 0
      left++
      right--
    }
    // if curUserId is involved in the transaction then add the transaction
    if ((leftMember.user.get('id') === curUserId ||
        rightMember.user.get('id') === curUserId
      ) && transactionAmount > 0) {
      transactions.push({
        senderId: rightMember.user.get('id'),
        recipientId: leftMember.user.get('id'),
        amount: transactionAmount
      })
    }
  }
  return transactions
}

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['isCreatingTransaction:blurred'],

  transactionsForCurrentUser: [],

  setup: function() {
    const groupId = this.get('group').get('id')
    // Ensures that all user records are loaded into the ember database
    this.get('store').query('groupMember', {
      groupId: groupId
    })
    const curUserId = this.get('sessionUser.session').get('data').authenticated.user_id.toString()
    this.set('transactionsForCurrentUser', determineMinimizedTransactions(
      curUserId,
      this.get('group').get('groupMembers')
    ))
  }.on('init'),

  inviteUrl: function() {
    return `${config.appHost}/groups/${this.get('group.hashId')}`
  }.property('group'),

  currentUserInGroup: function() {
    let inGroup = false
    let curUserId = this.get('sessionUser.session.data').authenticated.user_id.toString()
    this.get('group').get('groupMembers').forEach(gm => {
      if (gm.get('user').get('id') == curUserId) {
        inGroup = true
      }
    })
    return inGroup
  }.property('group.groupMembers.[]', 'sessionUser.current'),

  isGroupEmpty: function() {
    return this.get('group.groupMembers').get('length') === 1
  }.property('group.groupMembers.[]'),

  groupTransactions: function() {
    let groupId = this.get('group.id')
    let groupTransactions = this.get('store').query('groupTransaction', {
      groupId: groupId
    })
    return groupTransactions
  }.property('group', 'triggerReloadTransactions'),

  sortedGroupTransactions: function() {
    return this.get('groupTransactions').sortBy('createdAt').reverse()
  }.property('groupTransactions.[]'),

  actions: {
    joinGroup: function() {
      let curUser = this.get('sessionUser.current')
      let curUserRec = this.get('store').peekRecord('user', curUser.get('id'))
      let group = this.get('group')
      let groupMember = this.get('store').createRecord('groupMember', {
        group: group,
        user: curUserRec
      })
      groupMember.save()
    },
    inviteClick: function() {
      this.$('.invite-user input').select()
    },
    addTransaction: function() {
      this.set('isCreatingTransaction', true)
    },
    closeTransactionCreateAction: function() {
      this.set('isCreatingTransaction', false)
    },
    transactionUpdated: function() {
      // TODO: I feel horrible about this :(
      this.toggleProperty('triggerReloadTransactions')
    },
    groupTransactionCreated: function() {
      this.toggleProperty('triggerReloadTransactions')
    }
  }
})
