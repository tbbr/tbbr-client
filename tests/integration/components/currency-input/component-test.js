import { moduleForComponent, test } from 'ember-qunit'
import { skip } from 'qunit'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

moduleForComponent('currency-input', 'Integration | Component | currency input', {
  integration: true
})

test('it renders correct content', function(assert) {
  this.render(hbs`{{currency-input dollars=12 cents=10}}`)

  assert.equal(this.$('.input-dollar').val(), 12)
  assert.equal(this.$('.input-cent').val(), 10)
})

test('it does not allow out of range input', function(assert) {

  this.render(hbs`{{currency-input dollars=10000 cents=100}}`)

  assert.equal(this.$('.input-dollar').val(), 9999)
  assert.equal(this.$('.input-cent').val(), 99)

  this.render(hbs`{{currency-input dollars=-10 cents=-10}}`)

  assert.equal(this.$('.input-dollar').val(), 10)
  assert.equal(this.$('.input-cent').val(), 10)

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
