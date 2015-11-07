import Ember from 'ember'

export default Ember.Component.extend({
  isCreatingGroup: false,
  actions: {
    toggleCreatingGroup: function() {
      this.toggleProperty('isCreatingGroup')
    }
  }
})
