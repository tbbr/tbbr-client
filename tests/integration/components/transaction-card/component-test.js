import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('transaction-card', 'Integration | Component | transaction card', {
  integration: true
})

test('it renders', function(assert) {
  assert.expect(2)

  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })

  this.render(hbs`{{transaction-card}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#transaction-card}}
      template block text
    {{/transaction-card}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
})
