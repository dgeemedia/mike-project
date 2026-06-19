// mikes-sanity/schemas/servicesPage.js
//
// ⚠️  IMPORTANT FOR EDITORS:
//     The "Individual Services" array below is DEPRECATED and no longer used
//     by the website. Adding or editing services here will have NO effect on
//     the live site.
//
//     To add, edit or reorder services go to:
//       🔧 Services  (the collection in the left sidebar)
//
//     The page hero, intro text, and CTA banner below are still active.

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
        defineField({ name: 'headingMain',   title: 'Heading (white)', type: 'string', initialValue: 'Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)',  type: 'string', initialValue: 'Services' }),
      ]
    }),

    defineField({
      name: 'introText',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 3,
      description: 'The paragraph shown at the top of the services page, above the individual services.',
    }),

    // ── DEPRECATED — kept in schema so existing data is not lost ──
    // The website no longer reads this field. Use the 🔧 Services collection.
    defineField({
      name: 'services',
      title: '⚠️ Individual Services — DEPRECATED (no longer used by the website)',
      type: 'array',
      description: '🚫 Do not edit this. Add services via the "🔧 Services" collection in the sidebar instead.',
      readOnly: true,
      hidden: false, // visible so editors can see why it exists, but read-only
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon',          title: 'Icon',            type: 'string' }),
          defineField({ name: 'label',          title: 'Label',           type: 'string' }),
          defineField({ name: 'headingMain',    title: 'Heading (white)', type: 'string' }),
          defineField({ name: 'headingAccent',  title: 'Heading (gold)',  type: 'string' }),
          defineField({ name: 'paragraph1',     title: 'Paragraph 1',     type: 'text', rows: 3 }),
          defineField({ name: 'paragraph2',     title: 'Paragraph 2',     type: 'text', rows: 3 }),
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
          prepare({ title, subtitle, media }) { return { title: `${title} ${subtitle}`, media } }
        }
      }]
    }),

    defineField({
      name: 'ctaBanner',
      title: '📣 CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading',             title: 'Heading',          type: 'string', initialValue: 'Ready to Transform Your Space?' }),
        defineField({ name: 'subtext',             title: 'Subtext',          type: 'text', rows: 2 }),
        defineField({ name: 'primaryButtonText',   title: 'Primary Button',   type: 'string', initialValue: 'Get a Free Quote' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button', type: 'string', initialValue: 'View Our Work' }),
      ]
    }),

  ],
  preview: { prepare() { return { title: 'Services Page' } } }
})