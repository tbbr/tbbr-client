import DS from 'ember-data';

export default DS.Transform.extend({
  serialize: function(deserialized) {
    console.log(deserialized)
    return !!deserialized ? deserialized.toArray() : null
  },

  deserialize: function(serialized) {
    console.log(serialized)
    return Ember.A(serialized)
  }
});
