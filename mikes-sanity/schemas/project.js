
// mikes-sanity/schemas/project.js — Sanity schema for the project content of Mikes Constructions Group Ltd website
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  icon: () => '🏗',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ Completed', value: 'completed' },
          { title: '🔨 Ongoing', value: 'ongoing' },
          { title: '📋 Upcoming', value: 'upcoming' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Full Renovation', value: 'renovation' },
          { title: 'Bathroom', value: 'bathroom' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Structural', value: 'structural' },
          { title: 'Loft / Basement', value: 'loft' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Tiling', value: 'tiling' },
          { title: 'Electrical', value: 'electrical' },
          { title: 'Plumbing', value: 'plumbing' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Crewe, Cheshire"',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Project Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Additional Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' })
          ]
        }
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    { title: 'Newest First', name: 'dateDesc', by: [{ field: 'completedDate', direction: 'desc' }] },
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      const statusMap = { completed: '✅', ongoing: '🔨', upcoming: '📋' }
      return { title, subtitle: `${statusMap[subtitle] || ''} ${subtitle}`, media }
    },
  },
})
