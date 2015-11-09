import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

moduleForComponent('currency-input', 'Integration | Component | currency input', {
  integration: true
})

test('it renders correct content', function(assert) {
  this.render(hbs`{{currency-input dollars=12 cents=10}}`)

  assert.equal(this.$('.input-dollar').val(), 12, 'value in input is the same as dollars prop sent in')
  assert.equal(this.$('.input-cent').val(), 10, 'value in input is the same as cents prop sent in')
})

test('it does not allow out of range input', function(assert) {

  this.render(hbs`{{currency-input dollars=10000 cents=100}}`)

  assert.equal(this.$('.input-dollar').val(), 9999, 'renders the highest allowed value in the dollars input even if dollars prop passed in is higher')
  assert.equal(this.$('.input-cent').val(), 99, 'renders the highest allowed value in the cents input even if cents prop passed in is higher')

  this.render(hbs`{{currency-input dollars=-10 cents=-10}}`)

  assert.equal(this.$('.input-dollar').val(), 10, 'turns negative dollars prop into it\'s positive equivalent')
  assert.equal(this.$('.input-cent').val(), 10, 'turns negative cents prop into it\'s positive equivalent')

})

skip('trigger keypress event and ensure dollars and cents are still valid', function(assert) {
  this.render(hbs`{{currency-input dollars=12 cents=10}}`)

  assert.equal(this.$('.input-dollar').val(), 12)
  assert.equal(this.$('.input-cent').val(), 10)

  const zeroKey = 48
  const oneKey = 49
  const twoKey = 50
  const nineKey = 57

  let zeroPress = Ember.$.Event("keypress")
  zeroPress.which = zeroKey

  this.$('.input-dollar').trigger(zeroPress)

  assert.equal(this.$('.input-dollar').val(), 120)

  this.$('.input-dollar').trigger(jQuery.Event('keypress', {which: zeroKey}))

  assert.equal(this.$('.input-dollar').val(), 1200)
})
