import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('user-card', 'Integration | Component | user card', {
  integration: true
})

test('it renders correct content', function(assert) {
  assert.expect(4)

  this.set('user', Ember.Object.create({
    id: '1',
    name: 'Test User',
  }))

  this.set('group', Ember.Object.create({
    id: '1',
    name: 'Test Group'
  }))

  this.render(hbs`{{user-card user=user group=group}}`)

  assert.equal(this.$('.content .primary .name').text().trim(), 'Test User', 'Renders user\'s name')
  assert.equal(this.$('button').length, 2, 'Renders two buttons')
  assert.equal(this.$('.btn--primary').text().trim(), 'Add Transaction', 'Renders button for adding transaction')
  assert.equal(this.$('button').eq(1).text().trim(), 'Show Transactions', 'Renders button with Show Transactions text')
})

skip('it changes button text to hide transactions when clicked', function(assert) {
  // assert.equal(2)

  this.set('user', Ember.Object.create({
    id: '1',
    name: 'Test User',
  }))

  this.set('group', Ember.Object.create({
    id: '1',
    name: 'Test Group'
  }))

  this.render(hbs`{{user-card user=user group=group}}`)

  assert.equal(this.$('button').eq(1).text().trim(), 'Show Transactions', 'Renders button with Show Transactions text')

  this.$('button').eq(2).click()


  this.on('toggleShowTransactions', () => {
    assert.equal(this.$('button').eq(1).text().trim(), 'Hide Transactions', 'Renders button with Hide Transactions text when button is clicked')
  })

})
