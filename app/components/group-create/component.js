import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  store: service('store'),
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
      debugger;
      // this.get('session').authenticate('authenticator:torii', 'facebook');
      group.save().then((group) => {
        debugger
      });
    }
  }
});
