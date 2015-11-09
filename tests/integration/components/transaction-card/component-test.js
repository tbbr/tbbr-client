import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import moment from 'moment'

moduleForComponent('transaction-card', 'Integration | Component | transaction card', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(5)

  let createdAt = Date()

  this.set('transaction', Ember.Object.create({
    type: 'Borrow',
    amount: 2440,
    memo: 'Food',
    relatedUser: Ember.Object.create({name: 'Test User 1'}),
    groupId: 1,
    creator: Ember.Object.create({name: 'Test User 2'}),
    createdAt: createdAt,
    // Stubbed
    formattedAmount: "$24.40"
  }))

  this.render(hbs`{{transaction-card transaction=transaction}}`)

  assert.equal(this.$('span.name').first().text().trim(), 'Test User 2', 'Creator name is rendered properly')
  assert.equal(this.$('span.name').eq(1).text().trim(), 'Test User 1', 'Related user name is renderd properly')
  assert.equal(this.$('span.type').text().trim(), 'borrowed', 'The display type of the transaction is borrowed')
  assert.equal(this.$('span.amount').text().trim(), '$24.40', 'The amount is formatted properly')
  assert.equal(this.$('span.memo').text().trim(), 'Food', 'The memo is food')
})
