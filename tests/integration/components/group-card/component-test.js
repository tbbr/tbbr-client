import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('group-card', 'Integration | Component | group card', {
  integration: true
})

test('it renders', function(assert) {
  assert.expect(2)

  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })

  this.render(hbs`{{group-card}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#group-card}}
      template block text
    {{/group-card}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
})
