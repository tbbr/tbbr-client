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
  }.property('amount').readOnly()
})

export default Friendship
