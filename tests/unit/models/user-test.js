import Ember from 'ember'
import { moduleForModel, test } from 'ember-qunit'

moduleForModel('user', 'Unit | Model | user', {
  // Specify the other units that are required for this test.
  needs: ['model:group']
})

test('it exists', function(assert) {
  var model = this.subject()
  assert.ok(!!model)
})

test('should have many groups', function(assert) {
  const User = this.store().modelFor('user')
  const relationship = Ember.get(User, 'relationshipsByName').get('groups')

  assert.equal(relationship.key, 'groups', 'has relationship of name groups')
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany')
  assert.equal(relationship.type, 'group', 'has relationship of type group')
})
