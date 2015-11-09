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

  assert.equal(this.$('.group-img').text().trim(), 'T')
  assert.equal(this.$('.content .name a').text().trim(), 'Test')
  assert.equal(this.$('.user-list li').length, 2)
})
