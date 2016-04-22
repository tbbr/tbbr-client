import DS from 'ember-data'

let User = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  externalId: DS.attr('string'),
  groups: DS.hasMany('groups'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
})


User.reopen({
  avatarUrl: function() {
    return "https://graph.facebook.com/" + this.get('externalId') + "/picture?type=large"
  }.property()
})

export default User
