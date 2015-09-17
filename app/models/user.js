import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  username: DS.attr('string'),
  groups: DS.hasMany('groups'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
