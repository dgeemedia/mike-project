import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  icon: () => '🏗',
  fields: [
    defineField({
      name: 'pageHero',
      title: '🎯 Page Header',
      type: 'object',
      fields: [
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Our Recent' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Projects' }),
      ]
    }),
    defineField({
      name: 'ctaBanner',
      title: '📣 CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Like What You See?' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Get a Free Quote' }),
      ]
    }),
  ],
  preview: { prepare() { return { title: 'Projects Page' } } }
})
