import Ember from 'ember'
import { moduleForModel, test } from 'ember-qunit'

moduleForModel('group', 'Unit | Model | group', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
})

test('it exists', function(assert) {
  var model = this.subject()
  assert.ok(!!model)
})

test('should have many users', function(assert) {
  const Group = this.store().modelFor('group')
  const relationship = Ember.get(Group, 'relationshipsByName').get('users')

  assert.equal(relationship.key, 'users', 'has relationship of name users')
  assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany')
  assert.equal(relationship.type, 'user', 'has relationship of type user')
})
