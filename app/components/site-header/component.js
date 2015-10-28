import Ember from 'ember'

const { service } = Ember.inject

export default Ember.Component.extend({
  classNames: ['from-top'],
  sessionUser: service('session-user'),
});
