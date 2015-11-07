import Ember from 'ember'
import config from '../config/environment'
/* global Hashids */

export default Ember.Route.extend({
  model: function(params) {
    let hashids = new Hashids(config.APP.HASHIDS_SALT, config.APP.HAHSIDS_MIN_LENGTH)
    let num = hashids.decode(params.hashId)[0]

    return this.store.findRecord('group', num, {reload: true})
  },
  setupController(controller, model) {
    controller.set('model', model)
  }
})
