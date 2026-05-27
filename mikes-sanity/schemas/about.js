// mikes-sanity/schemas/about.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Us',
  type: 'document',
  icon: () => '🏠',
  fields: [
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      description: 'e.g. "About Our Craftsmanship"',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction Paragraph',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'body',
      title: 'Main Body Paragraph',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      description: 'Shown in the "15+ Years" badge',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Team Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ]
    }),
    defineField({
      name: 'accentImage',
      title: 'Accent Photo (smaller overlay)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ]
    }),
    defineField({
      name: 'highlights',
      title: 'Key Highlights (checklist)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'The bullet points under the text',
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'mainImage' },
  },
})
