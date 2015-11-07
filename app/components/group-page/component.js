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
    let curUserId = this.get('sessionUser.current').get('id')
    this.get('group').get('users').forEach((user) => {
      if (user.get('id') == curUserId) {
        inGroup = true
      }
    })
    return inGroup
  }.property('group.users.[]', 'sessionUser.current'),

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
