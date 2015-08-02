# xfx -> No Framework

[![Build Status](https://travis-ci.org/twilson63/xfx.svg?branch=master)](https://travis-ci.org/twilson63/xfx)

This is a simple abstraction over the virtual-dom to make it easy to build component architected applications:

A component architecture uses composable components to build sophisticated applications, this module, only enables this ability, it pushes other opinions
like routing and transitions to other libraries.

## What is a component?

A component is a composable module that consists of the following:

* init function (Model)
* render function (View)
* actions object (Update)

This structure makes it very easy to create tree like structures of these composable components and weave together a very sophisticated application.

### main.js component

``` js
var h = require('xfx/h') // virtual hyperscript
var xtend = require('xtend')

module.exports = component
component.render = render
component.actions = actions

function component (state, update) {
  // do init stuff

  // initialize actions
  xtend(state.actions, actions(update))

  return state
}

function actions (update) {
  foo: function (state) {
    alert('Ping!')
  }
}

function render (state) {
  return h('div', [
    h('h1', 'Hello World'),
    h('button', { 'ev-click': sendClick(state.actions.foo) }, 'FooBar')
  ])
}
```

### index.js

``` js
// vdom-arc
var app = require('xfx')

// always start with root component
var main = require('./components/main')
// run app
app(main, main.render)
```

## Examples

see `/examples`

## Contributors

## Support

## License

MIT
