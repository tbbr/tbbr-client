import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('current-user-bar', 'Integration | Component | current user bar', {
  integration: true
})

test('it renders', function(assert) {
  assert.expect(2)

  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })

  this.render(hbs`{{current-user-bar}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#current-user-bar}}
      template block text
    {{/current-user-bar}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
})
