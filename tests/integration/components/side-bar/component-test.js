import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('side-bar', 'Integration | Component | side bar', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(5)

  this.set('groups', [])

  this.render(hbs`{{side-bar groups=groups}}`)

  assert.equal(this.$('.side-headers').length, 1, 'one side bar headers exist')
  assert.equal(this.$('.side-headers').text().trim(), 'Your Groups', 'sidebar header You Groups is rendered correctly')
  assert.equal(this.$('ul li').length, 0, 'does not render any groups when an empty array of groups is passed in')
  assert.equal(this.$('.status-text').text().trim(), 'No Groups Found', 'status text renders No Groups Found correctly')
  assert.equal(this.$('button').text().trim(), 'Create Group', 'has a button with Create Group text')
})

test('it renders a list of groups', function(assert) {
  assert.expect(1)

  this.set('groups', [
    Ember.Object.create({name: 'Test1'}),
    Ember.Object.create({name: 'Test2'}),
    Ember.Object.create({name: 'Test3'})
  ])

  this.render(hbs`{{side-bar groups=groups}}`)

  assert.equal(this.$('ul li').length, 3, 'Renders 3 groups when an array of 3 groups is passed in')
})

skip('calls toggleCreatingGroup action when Create Group button is clicked', function(assert) {
  assert.equal(1)

  this.set('internalAction', () => {
    assert.equal(true)
  })

  this.render(hbs`{{side-bar toggleCreatingGroup=(action internalAction)}}`)

})
