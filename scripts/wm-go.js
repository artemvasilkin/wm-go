#!/usr/bin/env node

console.time('wm-go')

const program = require('commander')

const { figlet } = require('../src/utils/figlet')
const { getBranches } = require('../src/utils/getBranches')

const { goRound: go } = require('../src/goRound')
const { kill } = require('../src/kill')
const { init } = require('../src/init')
const { republish } = require('../src/republish')
const { open } = require('../src/open')
const { save } = require('../src/save')

const fs = require('fs')
const { gratz, error } = require('../src/utils/out')

const [, , ...args] = process.argv
const pattern = args.length ? args[0] : false

program
  .option('-i, --init [server]', 'init', '')
  .option('-r, --republish [server]', 'republish', '')
  .option('-k, --kill [server]', 'kill', '')
  .parse(process.argv)

// const branches = getBranches(pattern).filter(branch => branch.match(/^(w)(\/)(series-\d+|zapdos|lucario)(\/)([a-zA-Z0-9_-]*)(\/)(dev)$/))
const branches = [
  'w/series-2/team/dev',
  'w/series-2/testimonials/dev',
  'w/series-2/text/dev',
  'w/series-2/why/dev',
  'w/series-3/about/dev',
  'w/series-3/contacts/dev',
  'w/series-3/cover/dev',
  'w/series-3/cta/dev',
  'w/series-3/faq/dev',
  'w/series-3/footer/dev',
  'w/series-3/gallery/dev',
  'w/series-3/header/dev',
  'w/series-3/pricing/dev',
  'w/series-3/projects/dev',
  'w/series-3/schedule/dev',
  'w/series-3/services/dev',
  'w/series-3/testimonials/dev',
  'w/series-3/text/dev',
  'w/series-3/why/dev',
  'w/series-4/blog/dev',
  'w/series-4/careers/dev',
  'w/series-4/contacts/dev',
  'w/series-4/cover/dev',
  'w/series-4/events/dev',
  'w/series-4/faq/dev',
  'w/series-4/footer/dev',
  'w/series-4/gallery/dev',
  'w/series-4/pricing/dev',
  'w/series-4/text/dev',
  'w/series-4/why/dev',
  'w/series-5/contacts/dev',
  'w/series-5/cover/dev',
  'w/series-5/cta/dev',
  'w/series-5/footer/dev',
  'w/series-5/gallery/dev',
  'w/series-5/header/dev',
  'w/series-5/numbers/dev',
  'w/series-5/pricing/dev',
  'w/series-5/quote/dev',
  'w/series-5/text/dev',
  'w/series-6/blog/dev',
  'w/series-6/contacts/dev',
  'w/series-6/cover/dev',
  'w/series-6/cta/dev',
  'w/series-6/footer/dev',
  'w/series-6/gallery/dev',
  'w/series-6/header/dev',
  'w/series-6/history/dev',
  'w/series-6/services/dev',
  'w/series-6/team/dev',
  'w/series-6/testimonials/dev',
  'w/series-7/awards/dev',
  'w/series-7/cta/dev',
  'w/series-7/header/dev',
  'w/series-7/why/dev',
  'w/series-8/careers/dev',
  'w/series-8/cta/dev',
  'w/series-8/header/dev',
  'w/series-8/services/dev',
  'w/series-8/why/dev',
  'w/series-9/cover/dev',
  'w/series-9/events/dev',
  'w/series-9/header/dev',
  'w/series-9/partners/dev',
  'w/series-9/team/dev',
  'w/series-9/testimonials/dev',
  'w/zapdos/about/dev',
  'w/zapdos/awards/dev',
  'w/zapdos/blog/dev',
  'w/zapdos/careers/dev',
  'w/zapdos/contacts/dev',
  'w/zapdos/cover/dev',
  'w/zapdos/cta/dev',
  'w/zapdos/events/dev',
  'w/zapdos/faq/dev',
  'w/zapdos/footer/dev',
  'w/zapdos/gallery/dev',
  'w/zapdos/header/dev',
  'w/zapdos/numbers/dev',
  'w/zapdos/pricing/dev',
  'w/zapdos/process/dev',
  'w/zapdos/projects/dev',
  'w/zapdos/services/dev',
  'w/zapdos/team/dev',
  'w/zapdos/testimonials/dev',
  'w/zapdos/text/dev',
  'w/zapdos/why/dev'
]
const branchesLength = branches.length

const component = 'src/component.js'

const replacings = [
  // typography
  /className={classNames\((.*)? '(hero-title|title|subtitle|heading-lg|heading|subheading|body|small|quote|caption')'(.*)?\)}/g,
  // alignment
  /className={classNames\((.*)? 'text-(sm-|md-|lg-|xl-)?(left|center|right)'(.*)?\)}/g,
  // images
  /(wrapperClassName|pictureClassName|imgClassName)={classNames\((.*)? '(picture-wrapper|picture|picture__image)'(.*)?\)}/g,
  // icons
  /className={classNames\((.*)? 'icon'(.*)?\)}/g,
  // buttons
  /className={classNames\((.*)? 'btns-group'(.*)?\)}/g,
  /className={classNames\((.*)? 'btns-group__inner'(.*)?\)}/g,
  /butttton/g
]

const replacment = [
  // typography
  "className={classNames($1'wt-$2'$3)}",
  // alignment
  "className={classNames($1'wt-text-$2$3'$4)}",
  // images
  "$1={classNames($2'wt-$3'$4)}",
  // icons
  "className={classNames($1'wt-icon'$2)}",
  // buttons
  "className={classNames($1'wt-btns-group'$2)}",
  "className={classNames($1'wt-btns-group__inner'$2)}",
  'wt-btns-group__item'
]

figlet(`${branchesLength} branches found`)

go(branches, (branch, index) => {
  figlet(`${index + 1} of ${branchesLength}`)
  open(branch)

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
      save('add wt-components')

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
})

console.timeEnd('wm-go')
