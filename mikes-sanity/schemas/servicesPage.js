import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: () => '🔧',
  fields: [
    defineField({
      name: 'pageHero',
      title: '🎯 Page Header',
      type: 'object',
      fields: [
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Services' }),
      ]
    }),
    defineField({
      name: 'introText',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 3,
      description: 'The paragraph shown at the top of the services page'
    }),
    defineField({
      name: 'services',
      title: '🔧 Individual Services',
      type: 'array',
      description: 'Each service becomes a full section on the page',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          defineField({ name: 'label', title: 'Service Number Label', type: 'string', description: 'e.g. "Service 01"' }),
          defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string' }),
          defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string' }),
          defineField({ name: 'paragraph1', title: 'First Paragraph', type: 'text', rows: 3 }),
          defineField({ name: 'paragraph2', title: 'Second Paragraph', type: 'text', rows: 3 }),
          defineField({
            name: 'mainImage', title: 'Main Image', type: 'image',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })]
          }),
          defineField({
            name: 'accentImage', title: 'Accent Image', type: 'image',
            options: { hotspot: true },
            fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })]
          }),
        ],
        preview: {
          select: { title: 'headingMain', subtitle: 'headingAccent', media: 'mainImage' },
          prepare({ title, subtitle, media }) {
            return { title: `${title} ${subtitle}`, media }
          }
        }
      }]
    }),
    defineField({
      name: 'ctaBanner',
      title: '📣 CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Ready to Transform Your Space?' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button', type: 'string', initialValue: 'Get a Free Quote' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button', type: 'string', initialValue: 'View Our Work' }),
      ]
    }),
  ],
  preview: { prepare() { return { title: 'Services Page' } } }
})
