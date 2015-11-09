import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(2)
  this.render(hbs`{{login-form}}`)

  assert.equal(this.$('.site-name').text().trim(), 'tbbr', 'renders the site name in correct position')
  assert.equal(this.$('.btn--facebook-login').text().trim(), 'Login with Facebook', 'renders a button with Login with Facebook text')
})

skip('clicking on Login with Facebook button triggers an action', function(assert) {
  assert.expect(1)

  this.on('loginFacebook', () => {
    assert.equal(true, true, 'The loginFacebook action was called')
  })

  this.render(hbs`{{login-form loginFacebook=(action loginFacebook)}}`)

  this.$('.btn--facebook-login').click()

})
