// mikes-sanity/schemas/post.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'News & Blog',
  type: 'document',
  icon: () => '📰',
  fields: [
    defineField({
      name: 'title',
      title: 'Post Title',
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
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: '✅ Published', value: 'published' },
          { title: '📝 Draft', value: 'draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tips & Advice', value: 'tips' },
          { title: 'Bathroom', value: 'bathroom' },
          { title: 'Kitchen', value: 'kitchen' },
          { title: 'Conversions', value: 'conversions' },
          { title: 'News', value: 'news' },
          { title: 'Company Update', value: 'company' },
        ],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' })
      ],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Excerpt',
      type: 'text',
      rows: 2,
      description: 'Shown on the blog listing page',
      validation: (R) => R.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Post Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ]
        }
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Mikes Constructions',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (optional)',
      type: 'string',
      description: 'Leave blank to use post title',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (optional)',
      type: 'text',
      rows: 2,
    }),
  ],
  orderings: [
    { title: 'Newest First', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'coverImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle === 'published' ? '✅ Published' : '📝 Draft', media }
    },
  },
})
