const chalk = require('chalk')

module.exports = {
  gratz: message => {
    console.log(chalk.green(message))
  },
  alert: message => {
    console.log(chalk.yellow(message))
  },
  error: message => {
    console.log(chalk.red(message))
  },
  default: message => {
    console.log(chalk.cyan(message))
  }
}
