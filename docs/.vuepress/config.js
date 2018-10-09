module.exports = {
  base: '/wm-go/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'WM-GO'
    },
    '/ru/': {
      lang: 'ru-RU',
      title: 'WM-GO'
    }
  },
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }, { text: 'Guide', link: '/guide/' }],
    repo: 'artemvasilkin/wm-go',
    search: false,
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['', 'getting-started', 'codebase', 'database']
        }
      ]
    },
    locales: {
      '/': {
        selectText: 'Language',
        label: 'English'
      },
      '/ru/': {
        selectText: 'Язык',
        label: 'Русский'
      }
    }
  }
}
