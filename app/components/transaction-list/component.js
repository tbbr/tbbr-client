import Ember from 'ember'
/* global Ps */

export default Ember.Component.extend({
  // didInsertElement() {
  //   this.$().perfectScrollbar()
  // },
  actions: {
    transactionUpdated: function() {
      this.sendAction('transactionUpdated')
    }
  }
})
