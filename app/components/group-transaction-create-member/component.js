import Ember from 'ember'

export default Ember.Component.extend({
  tagName: 'li',

  normalAmount: '',
  isMemberDisabled: false,

  setup: function() {
    this.set('memberShares', 1)
  }.on('init'),

  calculatedAmount: function() {
    let value = this.get('shareSplitAmounts')[this.get('member').get('id')]
    let dollars = Math.floor(value / 100);
    let cents = value % 100;
    let sign = '$';

    if (cents.toString().length === 1) { cents = '0' + cents; }
    return `${sign}${dollars}.${cents}`;
  }.property('shareSplitAmounts'),

  isSplitTypeShare: function() {
    return this.get('splitType') === 'Share'
  }.property('splitType'),

  isSplitTypeNormal: function() {
    return this.get('splitType') === 'Normal'
  }.property('splitType'),

  memberSharesUpdate: function() {
    if (this.get('isSplitTypeNormal')) {
      this.sendAction('updateAmountPerMember', this.get('member').get('id'), this.get('normalAmount'))
    }
  }.observes('normalAmount'),

  actions: {
    memberSharesUpdate: function(e) {
      this.sendAction('updateShareSplitsPerMember', this.get('member').get('id'), Number(event.target.value))
      this.set('memberShares', event.target.value)
    },

    toggleMemberDisable: function() {
      this.toggleProperty('isMemberDisabled')
      this.sendAction('toggleMemberDisabled', this.get('member').get('id'))
    }
  }
})
