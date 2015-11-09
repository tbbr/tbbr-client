import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('transaction-list', 'Integration | Component | transaction list', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(2)

  this.set('user', Ember.Object.create({name: 'Test User'}))

  this.set('transactions', [
    Ember.Object.create({type: 'Borrow', amount: 123}),
    Ember.Object.create({type: 'Lend', amount: 456}),
    Ember.Object.create({type: 'Borrow', amount: 789})
  ])

  this.render(hbs`{{transaction-list user=user transactions=transactions}}`)

  assert.equal(this.$('.transaction-card-content').length, 3, 'Renders 3 transaction-cards')

  this.set('transactions', [])

  assert.equal(
    this.$('.status-text').text().trim(),
    'You currently have no transactions with Test User',
    'Renders no transactions found message when an empty array of transactions are passed in'
  )
})
