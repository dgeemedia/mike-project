// mikes-sanity/schemas/testimonial.js — Sanity schema for the testimonial content of Mikes Constructions Group Ltd website
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  icon: () => '⭐',
  fields: [
    defineField({
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location & Service',
      type: 'string',
      description: 'e.g. "Crewe, Cheshire — Kitchen Renovation"',
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      options: {
        list: [
          { title: '⭐⭐⭐⭐⭐ 5 Stars', value: 5 },
          { title: '⭐⭐⭐⭐ 4 Stars', value: 4 },
          { title: '⭐⭐⭐ 3 Stars', value: 3 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Show on Homepage?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `⭐ ${subtitle}` }
    },
  },
})
