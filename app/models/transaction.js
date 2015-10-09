import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  amount: DS.attr('number'),
  comment: DS.attr('string'),
  lenderId: DS.belongsTo('user'),
  burrowerId: DS.belongsTo('user'),
  groupId: DS.belongsTo('group')
});
