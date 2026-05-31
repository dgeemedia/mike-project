// mikes-sanity/schemas/aboutPage.js — Sanity schema for the "About Us" page content of Mikes Constructions Group Ltd website
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  icon: () => '👷',
  fields: [

    // Page Hero
    defineField({
      name: 'pageHero',
      title: '🎯 Page Header',
      type: 'object',
      fields: [
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'About' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Mikes Constructions' }),
      ]
    }),

    // Our Story
    defineField({
      name: 'story',
      title: '📖 Our Story Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Our Story' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Built on' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Integrity' }),
        defineField({ name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 4 }),
        defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 4 }),
        defineField({ name: 'paragraph3', title: 'Paragraph 3', type: 'text', rows: 4 }),
        defineField({ name: 'yearsExperience', title: 'Years Experience Badge', type: 'number', initialValue: 15 }),
        defineField({
          name: 'mainImage', title: 'Main Team Photo', type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })]
        }),
        defineField({
          name: 'accentImage', title: 'Accent Photo', type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })]
        }),
      ]
    }),

    // Commitment
    defineField({
      name: 'commitment',
      title: '🤝 Our Commitment Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Our Commitment' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Your Satisfaction Is' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Our Priority' }),
        defineField({ name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 3 }),
        defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 3 }),
      ]
    }),

    // Why Choose Us
    defineField({
      name: 'whyChoose',
      title: '✅ Why Choose Us',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Why Choose Us' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Seven Reasons to' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: "Choose Mike's" }),
        defineField({
          name: 'reasons',
          title: 'Reason Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'body', title: 'Description', type: 'text', rows: 2 }),
            ],
            preview: { select: { title: 'title' } }
          }]
        }),
      ]
    }),

    // Featured Testimonial
    defineField({
      name: 'featuredTestimonial',
      title: '⭐ Featured Testimonial (big quote)',
      type: 'object',
      fields: [
        defineField({ name: 'quote', title: 'Quote Text', type: 'text', rows: 5 }),
        defineField({ name: 'name', title: 'Client Name', type: 'string' }),
        defineField({ name: 'location', title: 'Location & Note', type: 'string', description: 'e.g. "Wistaston, Cheshire — Long-standing client"' }),
      ]
    }),

    // CTA Banner
    defineField({
      name: 'ctaBanner',
      title: '📣 CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Ready to Start Your Project?' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button', type: 'string', initialValue: 'Get a Free Quote' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button', type: 'string', initialValue: 'View Our Work' }),
      ]
    }),
  ],
  preview: { prepare() { return { title: 'About Us Page' } } }
})
