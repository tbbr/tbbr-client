import DS from 'ember-data'

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  hashId: DS.attr('string'),
  users: DS.hasMany('user'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
})
