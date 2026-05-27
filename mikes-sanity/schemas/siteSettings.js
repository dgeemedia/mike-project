// mikes-sanity/schemas/siteSettings.js
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '🏢',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      initialValue: 'Mikes Constructions Group Ltd',
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'string',
      description: 'The paragraph under the main headline',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address / Area',
      type: 'string',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'x',
      title: 'X (Twitter) URL',
      type: 'url',
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Projects Completed (stat)',
      type: 'number',
      initialValue: 200,
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience (stat)',
      type: 'number',
      initialValue: 15,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
