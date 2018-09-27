module.exports = {
  getHost: domain => {
    let host = ''

    switch (domain) {
      case 'co':
        host = 'https://api.weblium.'
        break
      default:
        host = 'https://weblium.'
    }

    return host
  }
}
