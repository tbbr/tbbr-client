import DS from 'ember-data'

export default DS.Model.extend({
  amountSent: DS.attr('number'),
  amountReceived: DS.attr('number'),
  user: DS.belongsTo('user'),
  group: DS.belongsTo('group'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
})
