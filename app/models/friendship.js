import DS from 'ember-data'

let Friendship = DS.Model.extend({
  user: DS.belongsTo('user'),
  friend: DS.belongsTo('user'),
  hashId: DS.attr('string'),
  balance: DS.attr('number'),
  friendshipDataId: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
})

Friendship.reopen({
  formattedBalance: function() {
    return "$" + (this.get('balance')/100).toFixed(2)
  }.property('balance').readOnly(),
  dollars: function() {
    return parseInt(this.get('balance')/100)
  }.property('balance').readOnly(),
  cents: function() {
    let cents = this.get('balance') % 100
    return cents.toString().length < 2 ? "0" + cents.toString() : cents.toString()
  }.property('balance').readOnly(),
})

export default Friendship
