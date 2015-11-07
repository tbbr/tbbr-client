import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'input',
  attributeBindings: [
    'accept',
    'autocomplete',
    'autosave',
    'dir',
    'formaction',
    'formenctype',
    'formmethod',
    'formnovalidate',
    'formtarget',
    'height',
    'inputmode',
    'lang',
    'list',
    'max',
    'min',
    'multiple',
    'name',
    'pattern',
    'placeholder',
    'size',
    'step',
    'type',
    'value',
    'width'
  ],
  input(event) {
    if (this.get('onInput'))
      this.sendAction('onInput', event)
  },
  keyDown(event) {
    if (this.get('onKeyDown'))
      this.sendAction('onKeyDown', event)
  },
  focusOut(event) {
    if (this.get('onFocusOut'))
      this.sendAction('onFocusOut', event)
  }
})
