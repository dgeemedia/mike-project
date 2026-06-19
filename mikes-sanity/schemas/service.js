// mikes-sanity/schemas/service.js
// UPDATED: This schema now contains all the fields needed to render a full
// service section on services.html. Content.js fetches from this collection
// via getServices() in sanity.js.
//
// ⚠️  DO NOT add services via the "Services Page" singleton in the CMS.
//     That section is now deprecated. Add and edit services HERE instead.
//     Order is controlled by the "Display Order" field (lower = first).

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  icon: () => '🔧',
  fields: [

    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'e.g. "Full Property Renovation"',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'icon',
      title: 'Icon (emoji)',
      type: 'string',
      description: 'e.g. 🏠 🚿 🍳 🏗 🏢 🧱',
      validation: (R) => R.required(),
    }),

    // ── Section heading (split into white + gold parts) ──
    defineField({
      name: 'headingMain',
      title: 'Section Heading (white part)',
      type: 'string',
      description: 'e.g. "Full Property"',
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'headingAccent',
      title: 'Section Heading (gold part)',
      type: 'string',
      description: 'e.g. "Renovation"',
      validation: (R) => R.required(),
    }),

    // ── Body copy ──
    defineField({
      name: 'paragraph1',
      title: 'First Paragraph',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'paragraph2',
      title: 'Second Paragraph',
      type: 'text',
      rows: 4,
    }),

    // ── Images ──
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
      validation: (R) => R.required(),
    }),

    defineField({
      name: 'accentImage',
      title: 'Accent Image (smaller overlay)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
    }),

    // ── Ordering ──
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first on the page. Start at 1.',
      validation: (R) => R.required().integer().positive(),
    }),

  ],

  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'order', media: 'mainImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `Service ${subtitle || '?'} — edit order to reposition`, media }
    },
  },
})