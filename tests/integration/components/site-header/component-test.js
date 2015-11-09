import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('site-header', 'Integration | Component | site header', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(1)

  this.render(hbs`{{site-header}}`)

  assert.equal(this.$('.logo').text().trim(), 'tbbr')
})
