# events-tree [![Build Status](https://travis-ci.org/bendrucker/events-tree.svg?branch=master)](https://travis-ci.org/bendrucker/events-tree)

> A tree structure for storing and accessing hierarchical event emitters


## Install

```
$ npm install --save events-tree
```


## Usage

```js
var Tree = require('events-tree')
var tree = new Tree()
var node = tree.at('foo.bar.baz')

node.on('event', function (value) {
  //=> hello world
})

tree.at('foo.bar.baz').emit('event', 'hello world')

tree.below('foo.bar', function (path, emitter) {
  if (path === 'foo.bar.baz') {
    emitter.emit('event', 'hello world')
  }
})
```

## API

#### `new Tree()` -> `tree`

Creates a new event tree.

#### `tree.at(path)` -> `eventEmitter`

Access the EventEmitter at the given path. If no emitter is present, one will be created.

##### path

Type: `string`  
Default: `''`

A property path in dot syntax.

#### `tree.root()` -> `eventEmitter`

Gets/creates the root emitter. Identical to `tree.at()`.

#### `tree.below([path], callback)` -> `undefined`

Traverse downwards through child nodes below the specified path.

##### path

Type: `string`  
Default: `''`

If a callback is passed as the first argument, traversal will begin at the root.

##### callback

*Required*  
Type: `function`
Arguments: `path, emitter`

A callback to be called at each child node with the node path (relative to the root) and the emitter. Nodes without an emitter attached will be ignored.

```js
var baz = tree.at('foo.bar.baz')
tree.below('foo', function (path, emitter) {
  // only called once
  // path === 'foo.bar.baz'
  // emitter === baz
})
```

#### `tree.above(path, callback)` -> `undefined`

Traverse upwards through child nodes above the specified path.

##### path

Type: `string`
Default: `''`

If no path is provided, `above` is a noop.

##### callback

*Required*  
Type: `function`
Arguments: `path, emitter`

A callback to be called at each child node with the node path (relative to the root) and the emitter. Nodes without an emitter attached will be ignored.

## License

MIT © [Ben Drucker](http://bendrucker.me)
