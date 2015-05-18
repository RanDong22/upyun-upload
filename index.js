#!/usr/bin/env node

'use strict'

const version = require('./package').version
const Worker = require('./lib/worker')
const program = require('commander')
const util = require('./lib/util')

program
  .version(version)
  .option('-c, --config [config]', 'config file')
  .option('-v, --verbose', 'verbose')
  .parse(process.argv)

if (program.config) {
  let tasks = util.parseConfig(program.config)
  let workers = tasks.map(function(task) {
    task.verbose = !!program.verbose
    return new Worker(task)
  })

  Promise.all(workers.map(function(worker) {
    return worker.upload()
  })).then(function() {
    console.log('upload finished')
  })
  .catch(function(e) {
    throw e
  })
}
