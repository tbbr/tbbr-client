import Ember from 'ember'

export default Ember.Component.extend({
  balanceStatus: function() {
    let balance = this.get('friendship.balance')

    if (balance > 0) {
      return 'positive'
    } else if (balance < 0) {
      return 'negative'
    }
    return ''
  }.property('friendship.balance')
})
