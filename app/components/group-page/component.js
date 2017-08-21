import Ember from 'ember'
import config from '../../config/environment'

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['isCreatingTransaction:blurred'],

  setup: function() {
    const groupId = this.get('group').get('id')
    // Ensures that all user records are loaded into the ember database
    this.get('store').query('groupMember', {
      groupId: groupId
    })
  }.on('init'),

  inviteUrl: function() {
    return `${config.appHost}/dashboard/groups/${this.get('group.hashId')}`
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

  // groupTransactions: function() {
  //   let relatedObjectId = this.get('group.id')
  //   let transactions = this.get('store').filter('transaction', t => {
  //     return t.get('relatedObjectId') == relatedObjectId && t.get('relatedObjectType') == 'Group'
  //   })
  //   return transactions
  // }.property('group', 'triggerUserTransactions'),
  //
  // sortedGroupTransactions: function() {
  //   return this.get('groupTransactions').sortBy('createdAt').reverse()
  // }.property('groupTransactions.[]'),
  //
  // getGroupTransactions: function() {
  //   this.get('store').query('transaction', {
  //     'relatedObjectId': this.get('group.id'),
  //     'relatedObjectType': 'Group'
  //   })
  // }.observes('group').on('init'),

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
      this.incrementProperty('triggerUserTransactions')
    }
  }
})
