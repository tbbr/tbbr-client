import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

const sessionUserStub = Ember.Service.extend({
  isAuthenticated: false,
  current: null
})


moduleForComponent('group-page', 'Integration | Component | group page', {
  integration: true,

  beforeEach: function () {
    this.register('service:session-user', sessionUserStub)
    this.inject.service('session-user', { as: 'sessionUser' })
  }
})


test('it renders nothing when user is not logged in', function(assert) {
  this.set('group', Ember.Object.create(
    {
      name: 'Test Group',
      users: [
        Ember.Object.create({name: 'User1'}),
        Ember.Object.create({name: 'User2'})
      ]
    }
  ))

  this.render(hbs`{{group-page group=group}}`)

  assert.equal(this.$().text(), '', 'Does not render anything when user is not logged in')
})
