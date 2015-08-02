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

## API

### app [default function]

This function takes in the main or root component, this component should have a default handler that receives the state and update objects and returns a state object.

``` js
var app = require('xfx')
var h = app.h

main.render = render
app(main)

function main (state, update) {
  return state
}

function render (state) {
  return h('h1', 'Hello World')
}
```

### app.h [hyperscript]

The `h` method is an alias to `virtual-hyperscript`

### app.xtend

The `xtend` method is an alias to the xtend library, the method is included as
a convience feature to extend the actions attribute of your state object. This attribute is used to associate handlers with domEvents.

### app.send, app.sendValue, app.sendChange, app.sendClick, app.sendSubmit

These are `value-event` handlers that manage the event listen and removing for you so you don't have to worry about boilier plate code and the need to add and remove listeners.





## Examples

see `/examples`

## Contributors

## Support

## License

MIT
