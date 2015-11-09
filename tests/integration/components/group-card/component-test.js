import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('group-card', 'Integration | Component | group card', {
  integration: true
})

test('it renders with the correct content', function(assert) {

  this.set('group', Ember.Object.create(
    {
      name: 'Test',
      users: [
        Ember.Object.create({name: 'User1'}),
        Ember.Object.create({name: 'User2'})
      ]
    }
  ))

  this.render(hbs`{{group-card group=group}}`)

  assert.equal(this.$('.group-img').text().trim(), 'T', 'uses the first letter of the group name as image text')
  assert.equal(this.$('.content .name a').text().trim(), 'Test', 'displays group name')
  assert.equal(this.$('.user-list li').length, 2, 'has the correct number of users rendered')
})
