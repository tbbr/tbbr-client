import DS from 'ember-data'

export default DS.Model.extend({
  amount: DS.attr('number'),
  senders: DS.hasMany('user'),
  recipients: DS.hasMany('user'),
  senderSplits: DS.attr('array'),
  recipientSplits: DS.attr('array'),
  senderSplitType: DS.attr('string'),
  recipientSplitType: DS.attr('string'),
  group: DS.belongsTo('group'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
})
