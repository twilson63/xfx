var app = require('../')

module.exports = beep
beep.render = render

var actions = {
  click: function (state) { 
    state.name = state.name === 'bar' ? 'foo' : 'bar'
    app.update()
  }
}

function beep () {
  var state = {
    name: 'foo'
  }
  state.actions = app.bindState(actions, state)
  return state 
}

function render (state) {
  return app.h('button', { 
    'ev-click': app.sendClick(state.actions.click)
  }, state.name)
}