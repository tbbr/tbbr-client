import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  store: service('store'),
  name: null,
  description: null,
  actions: {
    cancelCreateAction: function() {
      this.sendAction('cancelCreateAction')
    },
    createGroup: function() {
      let name = this.get('name')
      let description = this.get('description')

      if (!name) {
        return
      }

      let group = this.get('store').createRecord('group', {
        name: this.get('name'),
        description: this.get('description')
      })

      group.save().then(() => {
        this.sendAction('cancelCreateAction')
      })
    }
  }
})
