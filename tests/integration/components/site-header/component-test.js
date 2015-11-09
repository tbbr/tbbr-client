import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('site-header', 'Integration | Component | site header', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(1)

  this.render(hbs`{{site-header}}`)

  assert.equal(this.$('.logo').text().trim(), 'tbbr', 'renders the site name in correct position')
})

skip('it renders user related information', function(assert) {
  // Test user related information is rendered, when we can figure out
  // how to stub out services
})
