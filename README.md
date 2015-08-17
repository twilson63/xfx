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
var app = require('xfx')
var h = app.h // virtual hyperscript
var bindState = app.bindState


module.exports = component
component.render = render

function component () {
  // define my state
  var state = {
    foo: 'baz'
  }

  // initialize actions
  state.actions = bindState(actions())
  return state
}

function actions () {
  return {
    foo: function (state) {
      state.foo = 'bar'
      // repaint
      app.update()
    }
  }
}

function render (state) {
  return h('div', [
    h('h1', 'Hello World'),
    h('button', {
      'ev-click': sendClick(state.actions.foo)
    }, state.foo)
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
app(main)
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

`virtual-hyperscript` is a simple javascript module that create `VTree` notation for the virtual dom engine, it is a very expressive api
to create markup, it also is very functional friendly.

``` js
function li (widget) {
  return h('li', widget.name)
})

return h('ul', widgets.map(li))
```

``` html
<ul>
  <li>foo</li>
  <li>bar</li>
</ul>
```

### app.update

The app.update command should be called when the state changes within the component actions or within the component initialization method. The update method will take the current state and apply it to the DOM calling the render method.

``` js
function actions () {
  return {
    click: function (state) {
      state.title = 'foo'
      app.update()
    }
  }
}
```

### app.bindState

bindState is a helper method that can be used to bind actions from your component to handle the components state when a click, or submit occurs.


``` js
function component () {
  var state = {}
  state.actions = bindState(actions())
  return state
}

function actions () {
  return {
    click: function (state) {
      // do stuff
    }
  }
}
```

---

These are `value-event` handlers that manage the event listen and removing for you so you don't have to worry about boilier plate code and the need to add and remove listeners.


### app.send

The `send` method is the generic event method, if you want to capture all of the events of a given component, then you can use the send method to `ev-event` object.

``` js
  h('div', { 'ev-event': send(fn) } )
```


### app.sendValue

The `sendValue` will send the value of an input element whenever the listener fires but it does not have special semantics of what's a valid event.

https://github.com/Raynos/value-event#example-value


### app.sendChange

The `sendChange` event happens when form elements change.

see: https://github.com/Raynos/value-event#example-change


### app.sendClick

The `sendClick` event fires whenever a click occurs on an element.

https://github.com/Raynos/value-event#example-event

### app.sendSubmit

The `sendSubmit` fires when a form is submitted.

https://github.com/Raynos/value-event#example-submit

### app.sendKey

The `sendKey` enables you to specify a key to listen for and then the event fires when that key is pressed.

``` js
  var UP = 38
  var DOWN = 40
  var ENTER = 13

  h('input', {
    'ev-keydown': [
      sendKey(state.actions.move, 'down', { key: DOWN}),
      sendKey(state.actions.move, 'up', { key: UP}),
      sendKey(state.actions.select, 'select', { key: ENTER })
      ]
  })
```

### app.delegator

The `delegator` helper is great for adding global event listeners.

## Examples

see `/examples`

## Contributors

## Support

## License

MIT
