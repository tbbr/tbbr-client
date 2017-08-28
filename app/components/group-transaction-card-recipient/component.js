import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'li',

  recipientAmount: function() {
    return this.get('groupTransaction').get('recipientSplits')[this.get('index')]
  }.property('groupTransaction.amount', 'groupTransaction.recipientSplits', 'groupTransaction.recipientSplitType')
})
