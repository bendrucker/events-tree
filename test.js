'use strict'

var test = require('tape')
var Tree = require('./')

test('at', function (t) {
  t.plan(3)
  var tree = new Tree()
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
    var tree = new Tree()
    var node = tree.at('foo.bar')
    tree.below(function (path, emitter) {
      t.equal(path, 'foo.bar')
      t.equal(emitter, node)
    })
  })

  t.test('from path', function (t) {
    t.plan(2)
    var tree = new Tree()
    var node = tree.at('foo.bar')
    tree.below('foo', function (path, emitter) {
      t.equal(path, 'foo.bar')
      t.equal(emitter, node)
    })
  })

  t.end()
})
