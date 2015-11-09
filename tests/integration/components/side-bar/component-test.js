import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('side-bar', 'Integration | Component | side bar', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(5)

  this.set('groups', [])

  this.render(hbs`{{side-bar groups=groups}}`)

  assert.equal(this.$('.side-headers').length, 1)
  assert.equal(this.$('.side-headers').text().trim(), 'Your Groups')
  assert.equal(this.$('ul li').length, 0)
  assert.equal(this.$('.status-text').text().trim(), 'No Groups Found')
  assert.equal(this.$('button').text().trim(), 'Create Group')
})

test('it renders a list of groups', function(assert) {
  assert.expect(1)

  this.set('groups', [
    Ember.Object.create({name: 'Test1'}),
    Ember.Object.create({name: 'Test2'}),
    Ember.Object.create({name: 'Test3'})
  ])

  this.render(hbs`{{side-bar groups=groups}}`)

  assert.equal(this.$('ul li').length, 3)
})

// test('calls toggleCreatingGroup action when Create Group button is clicked', function(assert) {
//   assert.equal(1)
//
//   this.set('externalAction', () => {
//     assert.equal(true)
//   })
//
//   this.render(hbs`{{side-bar toggleCreatingGroup=(action externalAction)}}`)
//
// })
