import DS from 'ember-data'

let Transaction = DS.Model.extend({
  type: DS.attr('string'),
  amount: DS.attr('number'),
  isSettled: DS.attr('boolean'),
  memo: DS.attr('string'),
  status: DS.attr('string'),
  relatedObjectType: DS.attr('string'),
  relatedObjectId: DS.attr('number'),
  sender: DS.belongsTo('user'),
  recipient: DS.belongsTo('user'),
  creator: DS.belongsTo('user'),
  createdAt: DS.attr('Date', {
    defaultValue: function() { return new Date() }
  }),
  updatedAt: DS.attr('Date')
})

Transaction.reopen({
  formattedAmount: function() {
    return "$" + Number((this.get('amount')/100).toFixed(2)).toLocaleString()
  }.property('amount').readOnly()
})

export default Transaction
