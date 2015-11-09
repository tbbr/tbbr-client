import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('group-create', 'Integration | Component | group create', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(4)
  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })

  this.render(hbs`{{group-create}}`)

  assert.equal(this.$('input').length, 2, 'has correct number of inputs')
  assert.equal(this.$('button').length, 2, 'has correct number of buttons')

  assert.equal(this.$('button.btn--primary').text(), 'Create Group', 'has a button with Create Group text')
  assert.equal(this.$('button.btn--secondary').text(), 'Cancel', 'has a button with Cancel text')
})

test('it calls cancelAction when close btn is clicked', function(assert) {
  assert.expect(1)

  this.set('cancelAction', () => {
    assert.equal(true, true, 'calls external cancelAction action')
  })

  this.render(hbs`{{group-create cancelCreateAction=(action cancelAction)}}`)

  this.$('button.btn--secondary').click()
})
