import Ember from 'ember'

export default Ember.Component.extend({
  groupFirstLetter: function() {
    return this.get('group.name')[0]
  }.property('group.name')
});
