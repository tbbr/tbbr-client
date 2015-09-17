import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    post() {
      // this.model.save();
      let group = this.store.createRecord('group', {
        name: "Only Homies",
        description: "My Homies group okay?"
      });

      group.save();
    }
  }
});
