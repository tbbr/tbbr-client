import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
    sessionUser: service('session-user')
});
