import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('transaction-create', 'Integration | Component | transaction create', {
  integration: true
})

test('it renders', function(assert) {
  assert.expect(5)

  this.render(hbs`{{transaction-create}}`)

  assert.equal(this.$('span.active').text().trim(), 'Borrow', 'Default create type is Borrow')
  assert.equal(this.$('input').length, 2, 'Renders 2 inputs one for dollar and one for cents')
  assert.equal(this.$('textarea').attr('placeholder'), 'Memo...', 'Renders textarea with correct placeholder')
  assert.equal(this.$('button').text().trim(), 'Create', 'Renders button the create button with correct text')
  assert.equal(this.$('i.close').length, 1, 'Renders an icon close button')
})
