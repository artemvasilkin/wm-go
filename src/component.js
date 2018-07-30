import $editor from 'weblium/editor'

class Wireframe extends React.Component {
  static propTypes = {
    components: PropTypes.object.isRequired,
    $block: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired
  }

  getModifierValue = path => _.get(['modifier', path], this.props.$block)

  getOptionValue = (path, defaultValue = false) =>
    _.getOr(defaultValue, ['options', path], this.props.$block)

  setStylesForBody = (reset = false) => {
    const { opened } = this.state
    const nodes = [document.getElementsByTagName('html')[0]]

    if (!reset && opened) {
      nodes.forEach(setStyleProperties([['overflow-y', 'hidden']]))
    } else {
      nodes.forEach(resetStyleProperties(['overflow-y']))
    }
  }

  collectionItem = ({ index, children, className }) => {
    const {
      components: { Image, Text },
      style
    } = this.props

    return (
      <div className={classNames(style.item, className)}>
        {children}
        <Text
          bind={`collection[${index}].item_time`}
          className={classNames(style.item__time, 'wt-heading')}
          tagName="p"
        />
        {this.getModifierValue('item_image') && (
          <Image
            wrapperClassName={classNames(
              style['item__picture-wrapper'],
              'wt-picture-wrapper'
            )}
            pictureClassName={classNames(style.item__picture, 'wt-picture')}
            imgClassName={classNames(style.item__image, 'wt-picture__image')}
            bind={`collection[${index}].item_image`}
          />
        )}
        <div className={style.item__info}>
          {this.getModifierValue('item_heading') && (
            <Text
              bind={`collection[${index}].item_heading`}
              className={classNames(style.item__heading, 'wt-heading')}
              tagName="p"
            />
          )}
          {this.getModifierValue('item_person') && (
            <Text
              bind={`collection[${index}].item_person`}
              className={classNames(style.item__person, 'wt-body')}
              tagName="p"
            />
          )}
        </div>
      </div>
    )
  }

  render() {
    const {
      components: { Text, Button, Collection },
      style
    } = this.props

    const noImage = !this.getModifierValue('item_image')
    const noHeading = !this.getModifierValue('item_heading')

    return (
      <section
        className={classNames(
          style.section,
          'section',
          noImage && style['section--no-image'],
          noHeading && style['section--no-heading']
        )}
      >
        <div className={classNames(style.section__inner, 'section__inner')}>
          <header
            className={classNames(style.section__header, 'section__header')}
          >
            <Text
              bind="title"
              className={classNames(style.title, 'title', 'text-center')}
              className={classNames(style.title, 'wt-title', 'wt-text-center')}
              className={classNames(style.title, 'wt-title', 'wt-text-center')}
              className={classNames(style.title, 'wt-title', 'wt-text-center')}
              className={classNames(style.title, 'wt-title', 'wt-text-center')}
              className={classNames(
                style.title,
                'wt-title',
                'wt-text-left',
                'wt-text-md-right'
              )}
              className={classNames(
                style.title,
                'wt-text-center',
                'wt-text-md-right',
                'wt-title',
                'wt-text-center'
              )}
              className={classNames(style.title, 'wt-title', 'wt-text-center')}
              tagName="h2"
            />
            {this.getModifierValue('subtitle') && (
              <Text
                bind="subtitle"
                className={classNames(
                  style.subtitle,
                  'wt-subtitle',
                  'wt-text-center'
                )}
                tagName="p"
              />
            )}
          </header>
          <div className={classNames('section__content')}>
            <Collection
              className={style['items-wrapper']}
              bind="collection"
              Item={this.collectionItem}
            />
          </div>
          {(this.getModifierValue('button') ||
            this.getModifierValue('button_additional')) && (
            <footer
              className={classNames(style.section__footer, 'section__footer')}
            >
              <div className={classNames(style['btns-group'], 'btns-group')}>
                <div
                  className={classNames(
                    style['btns-group__inner'],
                    'btns-group__inner'
                  )}
                >
                  {this.getModifierValue('button') && (
                    <Button
                      className={classNames(
                        style['btns-group__item'],
                        'btns-group__item'
                      )}
                      bind="button"
                    />
                  )}
                  {this.getModifierValue('button_additional') && (
                    <Button
                      className={classNames(
                        style['btns-group__item'],
                        'btns-group__item'
                      )}
                      bind="button_additional"
                    />
                  )}
                </div>
              </div>
            </footer>
          )}
        </div>
      </section>
    )
  }
}

Wireframe.components = _.pick(['Text', 'Button', 'Collection', 'Image'])(
  $editor.components
)

Wireframe.defaultContent = {
  title: {
    content: 'Online Learning Academy',
    type: 'blockTitle'
  },
  subtitle: {
    content:
      'Learn how to promote your business even in the most competitive market! Our pros share their knowledge and expertise in our Online Learning Academy:',
    type: 'subtitle'
  },
  collection: {
    items: [
      {
        item_time: {
          type: 'heading',
          content: '12:30 PM - 1:15 PM'
        },
        item_image: {
          src:
            'https://www.vms.ro/wp-content/uploads/2015/04/mobius-placeholder-2.png'
        },
        item_heading: {
          type: 'heading',
          content: 'Leadership skills<br>for business owners'
        },
        item_person: {
          type: 'text',
          content: 'Ester King '
        }
      },
      {
        item_time: {
          type: 'heading',
          content: '12:30 PM - 1:15 PM'
        },
        item_image: {
          src:
            'https://www.vms.ro/wp-content/uploads/2015/04/mobius-placeholder-2.png'
        },
        item_heading: {
          type: 'heading',
          content: 'How to launch a best-selling product: step-by-step guide'
        },
        item_person: {
          type: 'text',
          content: 'Ester King '
        }
      },
      {
        item_time: {
          type: 'heading',
          content: '12:30 PM - 1:15 PM'
        },
        item_image: {
          src:
            'https://www.vms.ro/wp-content/uploads/2015/04/mobius-placeholder-2.png'
        },
        item_heading: {
          type: 'heading',
          content: 'How to find new markets for your products'
        },
        item_person: {
          type: 'text',
          content: 'Ester King '
        }
      },
      {
        item_time: {
          type: 'heading',
          content: '12:30 PM - 1:15 PM'
        },
        item_image: {
          src:
            'https://www.vms.ro/wp-content/uploads/2015/04/mobius-placeholder-2.png'
        },
        item_heading: {
          type: 'heading',
          content: 'How to build long-term relationships with clients'
        },
        item_person: {
          type: 'text',
          content: 'Ester King '
        }
      }
    ]
  },
  button: {
    textValue: 'Book a class'
  },
  button_additional: {
    type: 'secondary',
    textValue: 'Download a schedule'
  }
}

Wireframe.modifierScheme = {
  subtitle: {
    defaultValue: true,
    label: 'Block description',
    type: 'checkbox'
  },
  item_time: { defaultValue: true, label: 'Time', type: 'checkbox' },
  item_image: { defaultValue: true, label: 'Event image', type: 'checkbox' },
  item_heading: { defaultValue: true, label: 'Event name', type: 'checkbox' },
  item_person: { defaultValue: true, label: 'Person', type: 'checkbox' },
  button: { defaultValue: true, label: 'Button (link)', type: 'checkbox' },
  button_additional: {
    defaultValue: true,
    label: 'Additional Button (link)',
    type: 'checkbox'
  }
}

export default Wireframe
