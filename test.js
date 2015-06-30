'use strict'

var test = require('tape')
var Tree = require('./')

test('simple', function (t) {
  var tree = new Tree()
  var node = tree.at('foo.bar')
  t.equal(node.get().length, 0)
  function fn () {}
  node.add(fn)
  t.equal(node.get().length, 1)
  t.equal(node.get()[0], fn)
  node.clear()
  t.equal(node.get().length, 0)
  t.end()
})
