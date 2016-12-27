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
    return "$" + Number((this.get('balance')/100).toFixed(2)).toLocaleString()
  }.property('balance').readOnly(),

  dollars: function() {
    return parseInt(this.get('balance')/100)
  }.property('balance').readOnly(),

  cents: function() {
    let cents = this.get('balance') % 100
    return cents.toString().length < 2 ? "0" + cents.toString() : cents.toString()
  }.property('balance').readOnly(),

  dollarsAbs: function() {
    return Math.abs(this.get('dollars'))
  }.property('dollars').readOnly(),

  centsAbs: function() {
    return Math.abs(this.get('cents'))
  }.property('cents').readOnly()
})

export default Friendship
