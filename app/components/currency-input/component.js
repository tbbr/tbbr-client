import Ember from 'ember'

export default Ember.Component.extend({
  cents: null,
  dollars: null,

  willInsertElement() {
    let dollars = this.get('dollars')
    let cents = this.get('cents')

    if (dollars) {
      dollars = Math.abs(parseInt(dollars))

      if (dollars > 9999) {
        dollars = 9999
      }

      this.set('dollars', dollars)
    }

    if (cents) {
      if (cents != "0" && cents != "00") {
        cents = Math.abs(parseInt(cents))
      }

      if (cents > 99) {
        cents = 99
      }

      this.set('cents', cents)
    }
  },
  actions: {
    checkDollars: function(event) {
      let prevDollars = this.get('dollars')
      let d = event.target.value
      let dot = (d.lastIndexOf(".") > -1) ? true : false
      let dollars = Math.abs(parseInt(d))

      if (dollars > 9999) {
        dollars = prevDollars
      }

      this.set('dollars', dollars)
      this.$('.input-dollar').val(dollars)

      if (dot) {
        this.$('.input-cent').focus()
      }
    },
    keyDownDollarInput: function(event) {
      if (event.which === 190) {
        this.$('.input-cent').focus()
      }
    },
    checkCents: function(event) {
      let prevCents = this.get('cents')
      let c = event.target.value
      let cents = c

      if (c != "0" && c != "00") {
        cents = Math.abs(parseInt(c))
      }

      if (cents > 99) {
        cents = prevCents
      }

      if (c[0] == "0" && parseInt(c[1]) < 10 && parseInt(c[1]) > 0 ) {
        cents = c
      }

      if (c.toString().length > 2) {
        cents = prevCents
      }


      this.set('cents', cents)
      this.$('.input-cent').val(cents)
    },
    keyDownCentInput: function(event) {
      let prevCents = this.get('cents')

      // When backspace is pressed
      if (event.which === 8 && !prevCents && prevCents !== 0) {
        this.$('.input-dollar').focus()
        event.preventDefault()
      } else if (event.which === 38 || event.which === 40) {
        event.preventDefault() // Disable up and down arrow keys
      }
    },
    focusOutCentInput: function(event) {
      let cents = this.get('cents')
      if (!cents) {
        return
      }
      cents = cents.toString()

      if (cents.length === 1 && cents < 10 && cents > 0) {
        cents = parseInt(cents)*10
      } else if (cents == 0) {
        cents = "00"
      }

      this.set('cents', cents)
      this.$('.input-cent').val(cents)
    }
  }
})
