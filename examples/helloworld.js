var app = require('../')

main.render = render

// components
var foo = require('./foo')

function main () {
  return {
    component1: foo()
  }
}

function render (state) {
  return app.h('div', [
    app.h('h1', 'hello world'),
    foo.render(state.component1)
  ])
}

app(main)
