var document = require("global/document")
var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

var Delegator = require('dom-delegator')
var reduce = require('reduce')

var state = {}

module.exports = app

// provide hyperscript to components
app.h = require('virtual-dom/h')

// provide value-event to components
app.send = require('value-event/event')
app.sendValue = require('value-event/value')
app.sendChange = require('value-event/change')
app.sendClick = require('value-event/click')
app.sendSubmit = require('value-event/submit')
app.sendKey = require('value-event/key')

// provide extend to components
app.xtend = require('xtend')
// bind state to actions
app.bindState = bindState
// init delegator
app.delegator = Delegator()
// update
app.update = update

var render = null

function model (main) {
  var state = main(update)

  return state
}

// bindState
//
// uses the delegator to bind state to each
// action handler
function bindState (actions, state) {
  return reduce(actions, function (m, fn, k) {
    m[k] = Delegator.allocateHandle(fn.bind(null, state))
    return m
  }, {})
}


function app (main, target) {
  if (!target) target = document.body
  // main must be a function
  if (typeof main !== 'function')
    throw new Error('main must be a function')
  // main must have a function called `render`
  if (!main.render && typeof main.render)
    throw new Error('main must have a function render attached to it')

  // set render function for app
  render = main.render

  state = main()
  // attach to body
  target.appendChild(update())

}

var tree = {}
var rootNode = {}


// render when new state happens
function update() {
  // if first time then createElement
  if (!rootNode) rootNode = createElement(tree)

  var newTree = render(state)
  var patches = diff(tree, newTree)

  rootNode = patch(rootNode, patches)
  tree = newTree

  return rootNode

}
