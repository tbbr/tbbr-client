import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  name: null,
  description: null,
  actions: {
    cancelCreateAction: function() {
      this.sendAction('cancelCreateAction');
    },
    createGroup: function() {
      let group = this.get('store').createRecord('group', {
        name: this.get('name'),
        description: this.get('description')
      });
      group.save().then((group) => {
      });
    }
  }
});
