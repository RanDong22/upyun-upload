'use strict'

const path = require('path')

module.exports = {
  parseConfig: parseConfig,
  normalize: normalize,
  log: log
}

/**
 * @param {String} p
 */
function normalize(p) {
  return p.replace(/\\|\//g, '-').replace(/^-/, '').toLowerCase()
}

/**
 * @param {String} filepath
 * @return {Array - tasks} task - {Object}
 */
function parseConfig(filepath) {
  filepath = path.resolve(filepath)
  let data

  data = require(filepath)

  if (!(data && Array.isArray(data.tasks))) {
    throw new Error('invalid config: no tasks')
  }

  let tasks = data.tasks.map(function(task) {
    task = task || {}
    if (!task.operator) task.operator = data.operator
    if (!task.password) task.password = data.password

    return task
  })

  return tasks
}

const colors = ['\x1b[31m', '\x1b[32m', '\x1b[33m']
let flag = 0

function log() {
  let args = [].slice.apply(arguments)
  if (typeof args[0] === 'string') {
    flag = (flag + 1) % colors.length
    args[0] = colors[flag] + args[0]
    console.log.apply(console, args)
  } else {
    console.log.apply(console, args)
  }
}
