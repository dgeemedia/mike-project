import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: () => '🏠',
  fields: [

    // ── HERO ──
    defineField({
      name: 'hero',
      title: '🎯 Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow Text', type: 'string', description: 'Small text above headline e.g. "Established Excellence"' }),
        defineField({ name: 'headingLine1', title: 'Heading Line 1', type: 'string', description: 'e.g. "Welcome to"' }),
        defineField({ name: 'headingLine2', title: 'Heading Line 2 (gold)', type: 'string', description: 'e.g. "Mikes Constructions"' }),
        defineField({ name: 'headingLine3', title: 'Heading Line 3', type: 'string', description: 'e.g. "Group Ltd"' }),
        defineField({ name: 'subtext', title: 'Subtext Paragraph', type: 'text', rows: 2 }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'Get a Free Quote' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'View Services' }),
        defineField({
          name: 'backgroundImage',
          title: 'Hero Background Image',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })]
        }),
      ]
    }),

    // ── HERO BADGES ──
    defineField({
      name: 'heroBadges',
      title: '🏅 Hero Trust Badges',
      type: 'array',
      description: 'The 4 trust badges at the bottom of the hero',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
          defineField({ name: 'title', title: 'Bold Title', type: 'string' }),
          defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle' } }
      }],
      validation: R => R.max(4)
    }),

    // ── STATS ──
    defineField({
      name: 'stats',
      title: '📊 Stats Bar',
      type: 'array',
      description: 'The 4 number stats below the hero',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Number', type: 'number' }),
          defineField({ name: 'prefix', title: 'Prefix (before number)', type: 'string', description: 'e.g. "★ "' }),
          defineField({ name: 'suffix', title: 'Suffix (after number)', type: 'string', description: 'e.g. "+" or "%"' }),
          defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. "Projects Completed"' }),
        ],
        preview: { select: { title: 'label' } }
      }],
      validation: R => R.max(4)
    }),

    // ── ABOUT SNIPPET ──
    defineField({
      name: 'aboutSnippet',
      title: '👷 About Section (Homepage)',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', description: 'e.g. "Our Heritage"' }),
        defineField({ name: 'headingMain', title: 'Heading (white part)', type: 'string', description: 'e.g. "About Our"' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold part)', type: 'string', description: 'e.g. "Craftsmanship"' }),
        defineField({ name: 'paragraph1', title: 'First Paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'paragraph2', title: 'Second Paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'highlights', title: 'Checklist Items', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'Discover Our Story' }),
        defineField({ name: 'yearsExperience', title: 'Years Experience Badge', type: 'number', initialValue: 15 }),
        defineField({
          name: 'mainImage', title: 'Main Photo', type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })]
        }),
        defineField({
          name: 'accentImage', title: 'Accent Photo (small overlay)', type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })]
        }),
      ]
    }),

    // ── SERVICES SECTION ──
    defineField({
      name: 'servicesSection',
      title: '🔧 Services Section Heading',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'What We Do' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Services' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', initialValue: 'View All Services' }),
      ]
    }),

    // ── WHY CHOOSE ──
    defineField({
      name: 'whyChoose',
      title: '✅ Why Choose Us Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Why Us' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Why Choose' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Mikes Constructions' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({
          name: 'cards',
          title: 'Reason Cards',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Title', type: 'string' }),
              defineField({ name: 'body', title: 'Description', type: 'text', rows: 2 }),
            ],
            preview: { select: { title: 'title' } }
          }],
          validation: R => R.max(4)
        }),
      ]
    }),

    // ── PROJECTS SECTION HEADING ──
    defineField({
      name: 'projectsSection',
      title: '🏗 Projects Section Heading',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Portfolio' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Our Recent' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Projects' }),
      ]
    }),

    // ── PROCESS ──
    defineField({
      name: 'process',
      title: '⚙️ Our Process Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'How It Works' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'Our Simple' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Process' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({
          name: 'steps',
          title: 'Process Steps',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Step Title', type: 'string' }),
              defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 2 }),
            ],
            preview: { select: { title: 'title' } }
          }],
          validation: R => R.max(4)
        }),
      ]
    }),

    // ── TESTIMONIALS SECTION HEADING ──
    defineField({
      name: 'testimonialsSection',
      title: '⭐ Testimonials Section Heading',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', initialValue: 'Testimonials' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', initialValue: 'What Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', initialValue: 'Clients Say' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
      ]
    }),

    // ── CTA BANNER ──
    defineField({
      name: 'ctaBanner',
      title: '📣 CTA Banner',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Ready to Transform Your Space?' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2 }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', initialValue: 'Get a Free Quote' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', initialValue: 'View Our Work' }),
      ]
    }),

  ],

  preview: {
    prepare() { return { title: 'Homepage Content' } }
  }
})
