import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  hashId: DS.attr('string'),
  groupMembers: DS.hasMany('groupMember'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
})
