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

test('it renders correct content when user is logged in', function(assert) {
  this.set('sessionUser.current', Ember.Object.create({id: '1', name: 'Maaz'}))
  this.set('sessionUser.isAuthenticated', true)

  this.set('group', Ember.Object.create(
    {
      name: 'Test Group',
      users: [
        Ember.Object.create({id: '1', name: 'Maaz'})
      ],
      hashId: '1q2h3f'
    }
  ))

  this.render(hbs`{{group-page group=group}}`)

  assert.equal(this.$('.group-title').text().trim(), 'Test Group', 'renders correct group name')
  assert.equal(this.$('.invite-user .invite-text').first().text().trim(), 'Your group looks empty')
  assert.equal(this.$('.invite-user .invite-text').eq(1).text().trim(), 'Invite others with this link')
  assert.equal(this.$('.invite-user input').val(), 'http://tbbr.me/groups/1q2h3f', 'renders the correct invite url in the input')

  Ember.run(() => {this.get('group.users').pushObject(Ember.Object.create({id: '2', name: 'Test User'}))})
  Ember.run(() => {this.get('group.users').pushObject(Ember.Object.create({id: '3', name: 'Test User 2'}))})

  assert.equal(this.$('ul li').length, 2, 'Renders correct number of user cards')
})

test('it renders join group button if user is not in the group but logged in', function(assert) {
  this.set('sessionUser.current', Ember.Object.create({id: '1', name: 'Maaz'}))
  this.set('sessionUser.isAuthenticated', true)

  this.set('group', Ember.Object.create(
    {
      name: 'Test Group',
      users: [
        Ember.Object.create({id: '2', name: 'Test User'})
      ],
      hashId: '1q2h3f'
    }
  ))

  this.render(hbs`{{group-page group=group}}`)

  assert.equal(this.$('h1').text().trim(), 'Test Group', 'renders correct group name')
  assert.equal(this.$('button').text().trim(), 'Join Group', 'renders button with Join Group text')
})
