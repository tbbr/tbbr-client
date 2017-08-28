import Ember from 'ember'

export function formatCurrency([value, ...rest]) {
  let dollars = Math.floor(value / 100)
  let cents = value % 100
  let sign = '$'

  if (cents.toString().length === 1) { cents = '0' + cents; }
  return `${sign}${dollars}.${cents}`
}

export default Ember.Helper.helper(formatCurrency)
