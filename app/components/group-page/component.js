import Ember from 'ember'
import config from '../../config/environment'

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  inviteUrl: function() {
    return `${config.appHost}/groups/${this.get('group.hashId')}`
  }.property('group'),

  filteredGroupUsers: function() {
    return this.get('group.users').filter(u => {
      return u.get('id') != this.get('sessionUser.current.id')
    })
  }.property('group.users.[]'),
  currentUserInGroup: function() {
    let inGroup = false
    let curUserId = this.get('sessionUser.session.data').authenticated.user_id.toString()
    this.get('group').get('users').forEach((user) => {
      if (user.get('id') == curUserId) {
        inGroup = true
        break
      }
    })
    return inGroup
  }.property('group.users.[]', 'sessionUser.current'),

  isGroupEmpty: function() {
    return this.get('group.users').length === 1
  }.property('group.users.[]'),

  groupTransactions: function() {
    let relatedObjectId = this.get('group.id')
    let transactions = this.get('store').filter('transaction', t => {
      return t.get('relatedObjectId') == relatedObjectId && t.get('relatedObjectType') == 'Group'
    })
    return transactions
  }.property('group', 'triggerUserTransactions'),

  sortedGroupTransactions: function() {
    return this.get('groupTransactions').sortBy('createdAt').reverse()
  }.property('groupTransactions.[]'),

  getGroupTransactions: function() {
    this.get('store').query('transaction', {
      'relatedObjectId': this.get('group.id'),
      'relatedObjectType': 'Group'
    })
  }.observes('group').on('init'),

  actions: {
    joinGroup: function() {
      let curUser = this.get('sessionUser.current')
      let curUserRec = this.get('store').peekRecord('user', curUser.get('id'))
      let group = this.get('group')
      group.get('users').pushObject(curUserRec)
      group.save()
    },
    inviteClick: function() {
      this.$('.invite-user input').select()
    }
  }
})
