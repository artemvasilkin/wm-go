module.exports = {
  getBlockCategory: blockName => {
    const categories = [
      'About',
      'Awards',
      'Blog',
      'Careers',
      'Contacts',
      'Cover',
      'CTA',
      'Events',
      'FAQ',
      'Footer',
      'Gallery',
      'Header',
      'Numbers',
      'Partners',
      'Pricing',
      'Process',
      'Projects',
      'Quote',
      'Services',
      'Schedule',
      'Follow-us',
      'Team',
      'Testimonials',
      'Text',
      'Why'
    ]

    blockName =
      blockName.split('_').length > 1 ? blockName.split('_')[0] : blockName

    for (var i = 0; i < categories.length; i++) {
      if (blockName.match(categories[i].toLowerCase())) {
        return categories[i].toLowerCase()
      }
    }
  }
}
