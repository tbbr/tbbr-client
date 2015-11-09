import { moduleForModel, test } from 'ember-qunit'

moduleForModel('transaction', 'Unit | Model | transaction', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
})

test('it exists', function(assert) {
  var model = this.subject()
  assert.ok(!!model)
})

test('should have creator and relatedUser of type user', function(assert) {
  assert.expect(6)
  const Transaction = this.store().modelFor('transaction')
  const relationshipCreator = Ember.get(Transaction, 'relationshipsByName').get('creator')
  const relationshipRelatedUser = Ember.get(Transaction, 'relationshipsByName').get('relatedUser')

  assert.equal(relationshipCreator.key, 'creator', 'has relationship with name of creator')
  assert.equal(relationshipCreator.kind, 'belongsTo', 'kind of relationship is belongsTo')
  assert.equal(relationshipCreator.type, 'user', 'relationship is of type user')

  assert.equal(relationshipRelatedUser.key, 'relatedUser', 'has relationship with name of relatedUser')
  assert.equal(relationshipRelatedUser.kind, 'belongsTo', 'kind of relationship is belongsTo')
  assert.equal(relationshipRelatedUser.type, 'user', 'relationship is of type user')
})

test('should formatAmount correctly', function(assert) {
  assert.expect(1)
  const transaction = this.subject({ amount: 2540 })

  assert.equal(transaction.get('formattedAmount'), '$25.40', 'formats amount correctly')
})
