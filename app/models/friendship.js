import DS from 'ember-data'

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  friend: DS.belongsTo('user'),
  hashId: DS.attr('string'),
  friendshipDataId: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
})
