import DS from 'ember-data';

let User = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  groups: DS.hasMany('groups'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});

User.reopen({
  isCurrentUser: function(curUser) {
    return this.get('id') == curUser.get('id')
  }
})

export default User;
