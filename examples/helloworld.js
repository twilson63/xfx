var app = require('../')
var h = require('../h')

main.render = render
app(main)

function main (state, update) {
  return state
}

function render (state) {
  return h('h1', 'hello world')
}
