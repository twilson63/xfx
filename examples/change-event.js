var app = require('../')
var h = app.h

main.render = render
app(main)

function main () {
  state = { title: 'Hello World' }
  state.actions = app.bindState(actions(), state)

  return state
}

function render (state) {

  return h('div', [
    h('h1', state.title),
    h('input', {
      name: 'greeting',
      type: 'text',
      'ev-event': app.sendChange(state.actions.handleChange),
      value: state.title
    }),
    h('button', { 'ev-click': app.sendClick(state.actions.handleClick) }, 'Click'),
    h('div', state.display)
  ])
}

function actions () {
  return {
    handleClick: function (state) {
      alert('click')
    },
    handleChange: function (state, data) {
      state.title = data.greeting
      app.update()
    }
  }
}