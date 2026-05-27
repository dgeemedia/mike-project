import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'designSettings',
  title: 'Design & Colours',
  type: 'document',
  icon: () => '🎨',
  fields: [
    defineField({
      name: 'accentColor',
      title: 'Accent Colour (Gold)',
      type: 'string',
      description: 'The main gold colour used for highlights, buttons, icons. Default: #c8a96e',
      initialValue: '#c8a96e',
    }),
    defineField({
      name: 'accentDark',
      title: 'Accent Colour Dark (hover)',
      type: 'string',
      description: 'Darker version for hover states. Default: #a8893e',
      initialValue: '#a8893e',
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Colour (Navy)',
      type: 'string',
      description: 'The dark navy used for backgrounds, navbar. Default: #1a2332',
      initialValue: '#1a2332',
    }),
    defineField({
      name: 'textColor',
      title: 'Body Text Colour',
      type: 'string',
      description: 'Main paragraph text colour. Default: #2d3748',
      initialValue: '#2d3748',
    }),
    defineField({
      name: 'lightBg',
      title: 'Light Background Colour',
      type: 'string',
      description: 'Used for alternating sections. Default: #f8f6f2',
      initialValue: '#f8f6f2',
    }),
    defineField({
      name: 'headingFont',
      title: 'Heading Font',
      type: 'string',
      options: {
        list: [
          { title: 'Playfair Display (current)', value: 'Playfair Display' },
          { title: 'Cormorant Garamond (elegant)', value: 'Cormorant Garamond' },
          { title: 'Merriweather (traditional)', value: 'Merriweather' },
          { title: 'Montserrat (modern)', value: 'Montserrat' },
          { title: 'Georgia (classic)', value: 'Georgia' },
        ],
        layout: 'radio',
      },
      initialValue: 'Playfair Display',
    }),
    defineField({
      name: 'bodyFont',
      title: 'Body Font',
      type: 'string',
      options: {
        list: [
          { title: 'Raleway (current)', value: 'Raleway' },
          { title: 'Inter (clean)', value: 'Inter' },
          { title: 'Open Sans (readable)', value: 'Open Sans' },
          { title: 'Lato (modern)', value: 'Lato' },
          { title: 'Source Sans Pro (professional)', value: 'Source Sans Pro' },
        ],
        layout: 'radio',
      },
      initialValue: 'Raleway',
    }),
  ],
  preview: {
    prepare() { return { title: '🎨 Design & Colours' } }
  }
})
