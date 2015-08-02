var document = require("global/document")
var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')

var Delegator = require('dom-delegator')
var reduce = require('reduce')

module.exports = app
app.send = require('value-event/event')
app.sendValue = require('value-event/value')
app.sendChange = require('value-event/change')
app.sendClick = require('value-event/click')
app.sendSubmit = require('value-event/submit')
app.sendKey = require('value-event/key')

var render = null

function model (main) {
  var state = main({ actions: {}}, update)

  // remap all actions events to add state
  state.actions = reduce(state.actions, function (m, fn, k) {
    m[k] = Delegator.allocateHandle(fn.bind(null, state))
    return m
  }, {})

  return state
}


function app (main) {
  // main must be a function
  if (typeof main !== 'function')
    throw new Error('main must be a function')
  // main must have a function called `render`
  if (!main.render && typeof main.render)
    throw new Error('main must have a function render attached to it')

  // set render function for app
  render = main.render

  // setup event delegation
  Delegator()

  // attach to body
  document.body.appendChild(
    update(model(main))
  )

}

var tree = {}
var rootNode = {}

// render when new state happens
function update(state) {
  // if first time then createElement
  if (!rootNode) rootNode = createElement(tree)

  var newTree = render(state)
  var patches = diff(tree, newTree)

  rootNode = patch(rootNode, patches)
  tree = newTree

  return rootNode

}
