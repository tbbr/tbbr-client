import Ember from 'ember';

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  classNameBindings: ['isBlurred:blurred'],

  isCreatingTransaction: false,
  actions: {
    addTransaction: function() {
      this.set('isCreatingTransaction', true)
      this.set('isBlurred', true)
      // let user = this.get('user')
      // let curGroup = this.get('group')
      // let curUser = this.get('sessionUser.current')
      // let transaction = this.get('store').createRecord('transaction', {
      //   amount: 425,
      //   comment: "This is some memo or whatever?",
      //   lenderId: curUser,
      //   burrowerId: user,
      //   groupId: curGroup
      // });
      // transaction.save()
    }
  }
});
