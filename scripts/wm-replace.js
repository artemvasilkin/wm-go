#!/usr/bin/env node

console.time('wm-replace')

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
  for (var i = 0; i < replacings.length; i++) {
    while (replacings[i].test(fs.readFileSync(component).toString())) {
      fs.writeFileSync(
        component,
        fs
          .readFileSync(component)
          .toString()
          .replace(replacings[i], replacment[i])
      )
    }
  }
} else {
  error('no component')
}

console.timeEnd('wm-replace')
