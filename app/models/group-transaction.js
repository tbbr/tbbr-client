import DS from 'ember-data'

export default DS.Model.extend({
  type: DS.attr('string'),
  amount: DS.attr('number'),
  senders: DS.hasMany('user'),
  recipients: DS.hasMany('user'),
  senderSplits: DS.attr('array'),
  recipientSplits: DS.attr('array'),
  senderSplitType: DS.attr('string'),
  recipientSplitType: DS.attr('string'),
  group: DS.belongsTo('group'),
  creator: DS.belongsTo('user'),
  createdAt: DS.attr('Date', {
    defaultValue: function() { return new Date() }
  }),
  updatedAt: DS.attr('date')
})
