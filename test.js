'use strict'

var test = require('tape')
var Tree = require('./')

test('at', function (t) {
  t.plan(3)
  var tree = Tree()
  var node = tree.at('foo.bar')
  t.equal(node, tree.at('foo.bar'))
  t.ok(node.emit)
  node.on('e', function (a) {
    t.equal(a, 1)
  })
  node.emit('e', 1)
})

test('below', function (t) {
  t.test('from root', function (t) {
    t.plan(2)
    var tree = Tree()
    var node = tree.at('foo.bar')
    tree.below(function (path, emitter) {
      t.equal(path, 'foo.bar')
      t.equal(emitter, node)
    })
  })

  t.test('from path', function (t) {
    t.plan(2)
    var tree = Tree()
    var node = tree.at('foo.bar')
    tree.below('foo', function (path, emitter) {
      t.equal(path, 'foo.bar')
      t.equal(emitter, node)
    })
  })

  t.end()
})

test('above', function (t) {
  t.test('from root', function (t) {
    t.plan(0)
    var tree = Tree()
    tree.above(function () {
      t.fail('Should not be called')
    })
    t.end()
  })

  t.test('from path', function (t) {
    t.plan(4)
    var tree = Tree()
    var root = tree.root()
    var node = tree.at('foo')
    var i = 0
    tree.above('foo.bar', function (path, emitter) {
      if (!i) {
        // first time is foo
        t.equal(path, 'foo')
        t.equal(emitter, node)
      } else {
        // next time is root
        t.equal(path, '')
        t.equal(emitter, root)
      }
      i++
    })
  })

  t.end()
})
