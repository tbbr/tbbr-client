import DS from 'ember-data';

let Transaction = DS.Model.extend({
  type: DS.attr('string'),
  amount: DS.attr('number'),
  memo: DS.attr('string'),
  relatedUser: DS.belongsTo('user'),
  groupId: DS.attr('number'),
  creator: DS.belongsTo('user')
})

Transaction.reopen({
  formattedAmount: function() {
    return "$" + (this.get('amount')/100).toFixed(2)
  }.property('amount').readOnly()
})

export default Transaction
