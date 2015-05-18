'use strict'

const util = require('../lib/util')
const assert = require('assert')
const path = require('path')

describe('## util', function() {
  describe('# normalize', function() {
    it('success', function() {
      assert.equal(util.normalize('/a/b/c'), 'a-b-c')
      assert.equal(util.normalize('\\a/b\\c'), 'a-b-c')
      assert.equal(util.normalize('\\a\\b\\c'), 'a-b-c')
    })
  })

  describe('# parseConfig', function() {
    it('success', function() {
      let task1 = {
        prefix: 'static1/',
        endpoint: '',
        bucket: 'bucket1',
        directory: 'directory1',
        operator: 'operator1',
        password: 'password1'
      }
      let task2 = {
        operator: 'operator2',
        password: 'password2',
        prefix: 'static2/',
        endpoint: '',
        bucket: 'bucket2',
        directory: 'directory2'
      }
      let tasks = util.parseConfig(path.join(__dirname, 'fixture/task.js'))
      assert.deepEqual(tasks[0], task1)
      assert.deepEqual(tasks[1], task2)
    })
  })

  describe('# log', function() {
    it('success', function() {
      util.log('name: %s', 'hello')
      util.log('name: %s', 'hello')
      util.log('name: %s', 'hello')
    })
  })
})
