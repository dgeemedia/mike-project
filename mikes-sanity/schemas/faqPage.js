// mikes-sanity/schemas/contactPage.js — Sanity schema for the "Contact" page content of Mikes Constructions Group Ltd website
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqPage',
  title: 'FAQ Page',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'pageHero',
      title: '🎯 Page Header',
      type: 'object',
      fields: [
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Frequently Asked' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Questions' }),
      ]
    }),
    defineField({
      name: 'sideLabel',
      title: 'Side Label Text',
      type: 'string',
      initialValue: 'Got Questions?'
    }),
    defineField({
      name: 'sideHeadingMain',
      title: 'Side Heading (white)',
      type: 'string',
      initialValue: "We've Got"
    }),
    defineField({
      name: 'sideHeadingAccent',
      title: 'Side Heading (gold)',
      type: 'string',
      initialValue: 'Answers'
    }),
    defineField({
      name: 'sideParagraph',
      title: 'Side Paragraph',
      type: 'text',
      rows: 2,
      initialValue: "Can't find what you're looking for? Get in touch directly and we'll be happy to help."
    }),
    defineField({
      name: 'faqs',
      title: '❓ FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string', validation: R => R.required() }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: R => R.required() }),
        ],
        preview: { select: { title: 'question' } }
      }]
    }),
    defineField({
      name: 'ctaBanner',
      title: '📣 CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Still Have Questions?' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Contact Us Today' }),
      ]
    }),
  ],
  preview: { prepare() { return { title: 'FAQ Page' } } }
})
