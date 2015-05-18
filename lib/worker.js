'use strict'

const read = require('fs-readdir-recursive')
const upyun = require('upyun.io')
const assert = require('assert')
const util = require('./util')
const path = require('path')

class Worker {
  constructor(opts) {
    assert(typeof opts === 'object', 'opts required')
    assert(typeof opts.directory === 'string', 'directory required')

    this.verbose = opts.verbose
    this. directory = path.resolve(opts.directory)
    this.prefix = opts.prefix || ''
    this.rename = typeof opts.rename === 'function' ? opts.rename : util.normalize
    this.upyun = upyun(opts)
  }
  upload() {
    let self = this

    let files = read(this.directory).map(function(p) {
      return {
        filename: p,
        filepath: path.resolve(self.directory, p)
      }
    })

    return Promise.all(files.map(function(file) {
      let dest = self.prefix + self.rename(file.filename)
      if (self.verbose) {
        util.log('PUT file: %s, to: %s', file.filepath, dest)
      }
      return self.upyun.putFile(file.filepath, dest)
    }))
  }
}

module.exports = Worker
