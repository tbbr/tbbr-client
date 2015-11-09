import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'

const sessionUserStub = Ember.Service.extend({
  isAuthenticated: true,
  current: Ember.Object.create({
    name: 'Test User',
    avatarUrl: 'http://testimage.com/image.jpg'
  })
})


moduleForComponent('site-header', 'Integration | Component | site header', {
  integration: true,

  beforeEach: function () {
    this.register('service:session-user', sessionUserStub)
    this.inject.service('session-user', { as: 'sessionUser' })
  }
})

test('it renders correct content', function(assert) {
  assert.expect(3)

  this.render(hbs`{{site-header}}`)

  assert.equal(this.$('.logo').text().trim(), 'tbbr', 'renders the site name in correct position')
  assert.equal(this.$('.user-info span').text().trim(), 'Test User', 'renders the name of the user currently logged in')

  assert.equal(this.$('.user-info .avatar').css('background-image'), 'url(http://testimage.com/image.jpg)', 'renders the avatar of the user currently logged in')
})
