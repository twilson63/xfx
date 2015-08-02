var test = require('tape').test;
var app = require('../')

test('app should fail if no args', function (t) {
  try {
    app()
  } catch (e) {
    console.log(e.message)
    t.equals(e.message, 'main must be a function')
    t.end()
  }
})

test('app should fail if no render method on main method', function (t) {
  try {
    app(function () {})
  } catch (e) {
    console.log(e.message)
    t.equals(e.message, 'main must have a function render attached to it')
    t.end()
  }
})

test('app success', function (t) {
  var main = function (state, update) {
    return state
  }
  main.render = function () {
    return null
  }

  try {
    app(main)
  } catch (e) {
    console.log(e)
  } finally {
    t.end()
  }
})
