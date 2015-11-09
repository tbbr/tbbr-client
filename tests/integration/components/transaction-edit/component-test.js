import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('transaction-edit', 'Integration | Component | transaction edit', {
  integration: true
})

test('it renders', function(assert) {
  assert.expect(5)

  this.set('transaction', Ember.Object.create({
    type: 'Lend',
    amount: 2440,
    memo: 'Food',
    relatedUser: Ember.Object.create({name: 'Test User 1'}),
    groupId: 1,
    creator: Ember.Object.create({name: 'Test User 2'}),
    createdAt: Date()
  }))

  this.render(hbs`{{transaction-edit transaction=transaction}}`)

  assert.equal(this.$('span.active').text().trim(), 'Lend', 'Selected category is Lend')
  assert.equal(this.$('input').length, 2, 'Renders 2 inputs one for dollar and one for cents')
  assert.equal(this.$('textarea').val(), 'Food', 'Renders textarea with correct content')
  assert.equal(this.$('button').text().trim(), 'Save', 'Renders the save button with correct text')
  assert.equal(this.$('i.close').length, 1, 'Renders an icon close button')
})
