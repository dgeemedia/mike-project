// mikes-sanity/schemas/careerPage.js — Sanity schema for the "Careers" page
// of Mikes Constructions Group Ltd website
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'careerPage',
  title: 'Careers Page',
  type: 'document',
  icon: () => '👷',
  fields: [

    // ── PAGE HERO ──
    defineField({
      name: 'pageHero',
      title: '🎯 Page Header',
      type: 'object',
      fields: [
        defineField({ name: 'headingMain',   title: 'Heading (white)', type: 'string', initialValue: 'Join Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)',  type: 'string', initialValue: 'Team' }),
        defineField({ name: 'subtext',       title: 'Hero Subtext',    type: 'text', rows: 2, initialValue: 'We are always on the lookout for skilled, passionate tradespeople who take pride in their work.' }),
      ]
    }),

    // ── INTRO SECTION ──
    defineField({
      name: 'intro',
      title: '📝 Intro Section',
      type: 'object',
      fields: [
        defineField({ name: 'label',         title: 'Section Label',   type: 'string', initialValue: 'Work With Us' }),
        defineField({ name: 'headingMain',   title: 'Heading (white)', type: 'string', initialValue: 'Build Your' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)',  type: 'string', initialValue: 'Career With Us' }),
        defineField({ name: 'paragraph',     title: 'Intro Paragraph', type: 'text',   rows: 3,
          initialValue: 'Mikes Constructions Group Ltd is growing and we want experienced, reliable professionals to grow with us. We offer ongoing work for tradespeople who care about quality and take pride in what they build.' }),
      ]
    }),

    // ── WHY WORK WITH US ──
    defineField({
      name: 'perks',
      title: '✅ Why Work With Us (perks/benefits)',
      type: 'array',
      description: 'Cards shown in the "Why Work With Us" section. Recommended: 3–4 cards.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon',        title: 'Icon (emoji)',   type: 'string', initialValue: '🏗' }),
          defineField({ name: 'title',       title: 'Perk Title',    type: 'string' }),
          defineField({ name: 'description', title: 'Description',   type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title', subtitle: 'description' } }
      }],
      initialValue: [
        { icon: '📅', title: 'Ongoing Work',       description: 'No chasing for the next job. We provide consistent, long-term project pipelines across Cheshire and beyond.' },
        { icon: '🤝', title: 'Fair Pay',            description: 'Competitive rates paid promptly. We respect the skill you bring and price it accordingly.' },
        { icon: '🏆', title: 'Quality Projects',    description: 'Work on projects you can be proud of — residential renovations and commercial builds to a high standard.' },
        { icon: '🔧', title: 'Supportive Team',     description: 'A professional, no-nonsense team environment where your experience is valued from day one.' },
      ]
    }),

    // ── JOB LISTINGS ──
    defineField({
      name: 'jobListings',
      title: '💼 Job Listings',
      description: 'Each job posting appears as a card on the careers page. Add, remove, or edit listings here.',
      type: 'array',
      of: [{
        type: 'object',
        name: 'jobListing',
        title: 'Job Listing',
        fields: [
          defineField({
            name: 'title',
            title: 'Job Title',
            type: 'string',
            description: 'e.g. "Multi-Trade Construction Workers Required"',
            validation: R => R.required(),
          }),
          defineField({
            name: 'location',
            title: 'Location / Area',
            type: 'string',
            initialValue: 'Crewe Area',
            description: 'e.g. "Crewe Area", "Cheshire & North West"',
          }),
          defineField({
            name: 'employmentType',
            title: 'Employment Type',
            type: 'string',
            options: {
              list: [
                { title: 'Ongoing / Freelance', value: 'Ongoing / Freelance' },
                { title: 'Full-Time',           value: 'Full-Time' },
                { title: 'Part-Time',           value: 'Part-Time' },
                { title: 'Contract',            value: 'Contract' },
              ],
              layout: 'radio',
            },
            initialValue: 'Ongoing / Freelance',
          }),
          defineField({
            name: 'status',
            title: 'Listing Status',
            type: 'string',
            options: {
              list: [
                { title: '✅ Active',  value: 'active' },
                { title: '⏸ Paused', value: 'paused' },
                { title: '🔒 Closed', value: 'closed' },
              ],
              layout: 'radio',
            },
            initialValue: 'active',
            validation: R => R.required(),
          }),
          defineField({
            name: 'trades',
            title: 'Trades / Roles Listed',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List each trade or role on a separate line.',
            initialValue: [],
          }),
          defineField({
            name: 'workingHours',
            title: 'Working Hours',
            type: 'object',
            fields: [
              defineField({ name: 'days',      title: 'Days',        type: 'string', initialValue: 'Monday to Friday' }),
              defineField({ name: 'startTime', title: 'Start Time',  type: 'string', initialValue: '8:00 AM' }),
              defineField({ name: 'endTime',   title: 'End Time',    type: 'string', initialValue: '5:00 PM' }),
              defineField({ name: 'lunchBreak',title: 'Lunch Break', type: 'string', initialValue: '1-hour lunch break' }),
            ]
          }),
          defineField({
            name: 'requirements',
            title: 'Requirements',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List each requirement on a separate line.',
            initialValue: [],
          }),
          defineField({
            name: 'description',
            title: 'Role Description',
            type: 'text',
            rows: 4,
            description: 'A short overview of the role shown on the listing card.',
          }),
          defineField({
            name: 'applyUrl',
            title: 'Application Link (URL)',
            type: 'url',
            description: 'Link to the application form (e.g. Google Form, Typeform, etc.)',
            initialValue: 'https://forms.gle/tNPrrWRNBVfbWzUP9',
          }),
          defineField({
            name: 'applyButtonText',
            title: 'Apply Button Text',
            type: 'string',
            initialValue: 'Apply Now',
          }),
          defineField({
            name: 'publishedAt',
            title: 'Date Posted',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
          }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'status', location: 'location' },
          prepare({ title, subtitle, location }) {
            const badge = subtitle === 'active' ? '✅' : subtitle === 'paused' ? '⏸' : '🔒'
            return { title: `${badge} ${title}`, subtitle: location }
          }
        }
      }],
    }),

    // ── CTA BANNER ──
    defineField({
      name: 'ctaBanner',
      title: '📣 Bottom CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading',         title: 'Heading',             type: 'string', initialValue: "Don't See Your Trade Listed?" }),
        defineField({ name: 'subtext',         title: 'Subtext',             type: 'text', rows: 2, initialValue: "We're always interested in hearing from skilled tradespeople. Send us your details and we'll be in touch when a suitable project comes up." }),
        defineField({ name: 'primaryButtonText', title: 'Button Text',       type: 'string', initialValue: 'Get in Touch' }),
        defineField({ name: 'primaryButtonUrl', title: 'Button Link (URL)',  type: 'string', initialValue: 'contact.html' }),
      ]
    }),

  ],
  preview: { prepare() { return { title: '👷 Careers Page' } } }
})