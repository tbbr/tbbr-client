import Ember from 'ember';

export default Ember.Component.extend({
  displayType: function() {
    let type = this.get('transaction.type')
    if (type === 'Burrow') {
      return 'burrowed'
    } else if (type === 'Lend') {
      return 'lent'
    }

    return 'burrowed'
  }.property('transaction.type')
})
