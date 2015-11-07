import Ember from 'ember'

let LetterToColor = [
  '#dd7788',
  '#667799',
  '#7a9460',
  '#dd9977',
  '#665566'
]

export default Ember.Component.extend({
  groupFirstLetter: function() {
    return this.get('group.name')[0]
  }.property('group.name'),

  groupLetterColor: function() {
    let random = Math.floor(Math.random() * (5 - 0 + 1)) + 0
    return LetterToColor[random]
  }.property('groupFirstLetter')
})
