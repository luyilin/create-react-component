#!/usr/bin/env node
const path = require('path')
const cac = require('cac')
const sao = require('sao')
const update = require('update-notifier')
const pkg = require('./package')

const cli = cac()

cli.command('*', 'Generate a new project', input => {
  const folderName = input[0] || '.'
  const targetPath = path.resolve(folderName)
  console.log(`> Generating React component in ${targetPath}`)

  const templatePath = __dirname

  return sao({
    template: templatePath,
    targetPath
  }).catch(err => {
    process.exitCode = 1
    if (err.name === 'SAOError') {
      sao.log.error(err.message)
    } else {
      console.error(err.stack)
    }
  })
})

cli.parse()

update({
  pkg
}).notify()
