import DS from 'ember-data';

let Transaction = DS.Model.extend({
  type: DS.attr('string'),
  amount: DS.attr('number'),
  comment: DS.attr('string'),
  lenderId: DS.belongsTo('user'),
  burrowerId: DS.belongsTo('user'),
  groupId: DS.belongsTo('group')
})

Transaction.reopen({
  formattedAmount: function() {
    return "$" + (this.get('amount')/100).toFixed(2)
  }.property('amount').readOnly()
})

export default Transaction
