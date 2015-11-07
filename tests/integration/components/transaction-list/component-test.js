import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('transaction-list', 'Integration | Component | transaction list', {
  integration: true
})

test('it renders', function(assert) {
  assert.expect(2)

  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })

  this.render(hbs`{{transaction-list}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#transaction-list}}
      template block text
    {{/transaction-list}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
})
