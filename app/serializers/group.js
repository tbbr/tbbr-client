import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    hashId: {serialize: false},
    createdAt: {serialize: false},
    updatedAt: {serialize: false}
  },
  keyForAttribute: function(attr, method) {
    return Ember.String.camelize(attr);
  }
});
