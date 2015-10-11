import Ember from 'ember';

const { service } = Ember.inject

export default Ember.Component.extend({
  sessionUser: service('session-user'),
  store: service(),

  dollars: null,
  cents: null,
  comment: null,

  actions: {
    transactionCreate: function() {
      let amount = parseInt(this.get('dollars') * 100) + parseInt(this.get('cents'))

      if (!amount) {
        return
      }

      let user = this.get('user')
      let curGroup = this.get('group')
      let curUser = this.get('sessionUser.current')
      let comment = this.get('comment')

      let transaction = this.get('store').createRecord('transaction', {
        amount: amount,
        comment: comment,
        lenderId: curUser,
        burrowerId: user,
        groupId: curGroup
      });
      
      transaction.save()
    }
  }
});