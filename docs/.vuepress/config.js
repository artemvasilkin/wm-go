module.exports = {
  base: '/wm-go/',
  title: 'wm-go',
  description: 'Weblium API command line client',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }, { text: 'Guide', link: '/guide/' }],
    repo: 'artemvasilkin/wm-go',
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: ['', 'getting-started', 'codebase', 'database']
        }
      ]
    }
  }
}
