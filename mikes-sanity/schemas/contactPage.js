import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: () => '📞',
  fields: [
    defineField({
      name: 'pageHero',
      title: '🎯 Page Header',
      type: 'object',
      fields: [
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Get in' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Touch' }),
      ]
    }),
    defineField({
      name: 'intro',
      title: '📝 Intro Text',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Contact Details' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: "Let's Discuss" }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Your Project' }),
        defineField({ name: 'paragraph', title: 'Intro Paragraph', type: 'text', rows: 3 }),
      ]
    }),
    defineField({
      name: 'contactDetails',
      title: '📋 Contact Details',
      type: 'object',
      fields: [
        defineField({ name: 'serviceArea', title: 'Service Area', type: 'string', initialValue: 'Crewe, Nantwich, Wistaston, Winsford, Sandbach, Congleton & across Cheshire' }),
        defineField({ name: 'email', title: 'Email Address', type: 'string' }),
        defineField({ name: 'workingHours', title: 'Working Hours Line 1', type: 'string', initialValue: 'Monday – Friday: 8am – 6pm' }),
        defineField({ name: 'workingHours2', title: 'Working Hours Line 2', type: 'string', initialValue: 'Saturday: 9am – 2pm (by appointment)' }),
      ]
    }),
    defineField({
      name: 'nextSteps',
      title: '✅ "What Happens Next" Steps',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'The numbered list of steps shown below the contact info',
    }),
    defineField({
      name: 'locations',
      title: '📍 Areas We Cover Cards',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string', initialValue: '🏘' }),
          defineField({ name: 'title', title: 'Area Name', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title' } }
      }]
    }),
    defineField({
      name: 'locationsSection',
      title: '📍 Locations Section Heading',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Coverage' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Areas We' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Cover' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
      ]
    }),
  ],
  preview: { prepare() { return { title: 'Contact Page' } } }
})
