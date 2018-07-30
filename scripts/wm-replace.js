#!/usr/bin/env node

console.time('wm-replace')

const program = require('commander')

const { kill } = require('../src/kill')
const { init } = require('../src/init')
const { republish } = require('../src/republish')
const { save } = require('../src/save')

const fs = require('fs')
const { gratz, error } = require('../src/utils/out')

const component = 'src/component.js'

const replacings = [
  /const nodes = \[document\.getElementsByTagName\('html'\)\[0\], document\.body\]/g,
  /nodes\.forEach\(setStyleProperties\(\[\['overflow-y', 'hidden'\], \['height', '100%'\]\]\)\)/g,
  /nodes\.forEach\(resetStyleProperties\(\['overflow-y', 'height'\]\)\)/g
]

const replacment = [
  "const nodes = [document.getElementsByTagName('html')[0]]",
  "nodes.forEach(setStyleProperties([['overflow-y', 'hidden']]))",
  "nodes.forEach(resetStyleProperties(['overflow-y']))"
]

if (fs.existsSync(component)) {
  let shouldRepublish = false

  gratz('exists')

  for (var i = 0; i < replacings.length; i++) {
    gratz('for loop started')

    while (replacings[i].test(fs.readFileSync(component).toString())) {
      gratz('while loop started')

      fs.writeFileSync(
        component,
        fs
          .readFileSync(component)
          .toString()
          .replace(replacings[i], replacment[i])
      )

      shouldRepublish = true
    }
  }

  if (shouldRepublish) {
    save('fix sticky header')

    if (program.kill && program.kill.length > 0) {
      kill(program.kill, 'y')
    }

    if (program.init && program.init.length > 0) {
      init(program.init)
    }

    if (program.republish && program.republish.length > 0) {
      republish(program.republish)
    }
  }
} else {
  error('no component')
}

console.timeEnd('wm-replace')