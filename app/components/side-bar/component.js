import Ember from 'ember'

export default Ember.Component.extend({
  classNameBindings: ['isToggleable:toggleable', 'isClosed:closed', 'isCreatingGroup:open-actionbar'],

  didInsertElement() {
    if (Ember.$(window).width() < 900) {
      // Allow toggling of sidebar
      this.set('isToggleable', true)
      this.set('isClosed', true)
    }

    Ember.$(window).on('resize', () => {
      if (Ember.$(window).width() < 900) {
        this.set('isToggleable', true)
        this.set('isClosed', true)
      } else if (Ember.$(window).width() > 900) {
        this.set('isToggleable', false)
        this.set('isClosed', false)
      }
    })
  },

  filterText: "",

  filteredFriendships: function() {
    return this.get('friendships').filter((item) => {
      var friendName = item.get('friend.name').toLowerCase()
      var filterText = this.get('filterText').toLowerCase()
      return friendName.indexOf(filterText) > -1
    })
  }.property('friendships.@each.friend.name', 'filterText'),

  isCreatingGroup: false,
  actions: {
    toggleCreatingGroup: function() {
      this.toggleProperty('isCreatingGroup')
    },
    toggleSidebar: function() {
      this.toggleProperty('isClosed')
    }
  }
})
