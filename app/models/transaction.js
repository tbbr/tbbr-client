import DS from 'ember-data'

let Transaction = DS.Model.extend({
  type: DS.attr('string'),
  amount: DS.attr('number'),
  memo: DS.attr('string'),
  relatedObjectType: DS.attr('string'),
  relatedObjectId: DS.attr('number'),
  sender: DS.belongsTo('user'),
  recipient: DS.belongsTo('user'),
  creator: DS.belongsTo('user'),
  createdAt: DS.attr('Date', {
    defaultValue: function() { return new Date() }
  }),
  is_settled: DS.attr('boolean')
})

Transaction.reopen({
  formattedAmount: function() {
    return "$" + (this.get('amount')/100).toFixed(2)
  }.property('amount').readOnly()
})

export default Transaction
