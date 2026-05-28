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
        defineField({
          name: 'headingLine1', title: 'Heading Line 1', type: 'string',
          placeholder: 'e.g. Welcome to',
          initialValue: 'Welcome to',
        }),
        defineField({
          name: 'headingLine2', title: 'Heading Line 2 (shown in gold)', type: 'string',
          placeholder: 'e.g. Mikes Constructions',
          initialValue: 'Mikes Constructions',
        }),
        defineField({
          name: 'headingLine3', title: 'Heading Line 3', type: 'string',
          placeholder: 'e.g. Group Ltd',
          initialValue: 'Group Ltd',
        }),
        defineField({
          name: 'subtext', title: 'Subtext Paragraph', type: 'text', rows: 2,
          placeholder: 'e.g. Your Trusted Partner in Construction and Refurbishment across Crewe, Cheshire and the North West.',
          initialValue: 'Your Trusted Partner in Construction and Refurbishment across Crewe, Cheshire and the North West.',
        }),
        defineField({
          name: 'primaryButtonText', title: 'Primary Button Text', type: 'string',
          placeholder: 'e.g. Get a Free Quote',
          initialValue: 'Get a Free Quote',
        }),
        defineField({
          name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string',
          placeholder: 'e.g. View Services',
          initialValue: 'View Services',
        }),
        defineField({
          name: 'backgroundImage', title: 'Hero Background Image', type: 'image',
          description: 'Upload a high-quality landscape photo of your work. Recommended: at least 1400px wide.',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text', initialValue: 'Mikes Constructions project' })]
        }),
      ]
    }),

    // ── HERO BADGES ──
    defineField({
      name: 'heroBadges',
      title: '🏅 Trust Badges (bottom of hero)',
      type: 'array',
      description: 'The 4 trust badges at the bottom of the hero section. Keep to exactly 4.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string', placeholder: 'e.g. ✓ or ★ or 🏗', initialValue: '✓' }),
          defineField({ name: 'title', title: 'Bold Title', type: 'string', placeholder: 'e.g. Fully Licensed', initialValue: 'Fully Licensed' }),
          defineField({ name: 'subtitle', title: 'Subtitle', type: 'string', placeholder: 'e.g. Accredited & Insured', initialValue: 'Accredited & Insured' }),
        ],
        preview: { select: { title: 'title', subtitle: 'subtitle' } }
      }],
      initialValue: [
        { icon: '✓', title: 'Fully Licensed', subtitle: 'Accredited & Insured' },
        { icon: '★', title: '5-Star Rated', subtitle: 'Google Reviews' },
        { icon: '🏗', title: 'Expert Craftsmen', subtitle: 'Decades of Experience' },
        { icon: '💬', title: 'Client-Focused', subtitle: 'Your Vision, Our Mission' },
      ],
      validation: R => R.max(4)
    }),

    // ── STATS ──
    defineField({
      name: 'stats',
      title: '📊 Stats Bar (4 numbers)',
      type: 'array',
      description: 'The 4 animated number stats below the hero. Keep to exactly 4.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'number', title: 'Number', type: 'number', placeholder: 'e.g. 200' }),
          defineField({ name: 'prefix', title: 'Prefix (before number)', type: 'string', placeholder: 'e.g. ★ — leave blank if none' }),
          defineField({ name: 'suffix', title: 'Suffix (after number)', type: 'string', placeholder: 'e.g. + or %' }),
          defineField({ name: 'label', title: 'Label below number', type: 'string', placeholder: 'e.g. Projects Completed' }),
        ],
        preview: { select: { title: 'label' } }
      }],
      initialValue: [
        { number: 200, suffix: '+', label: 'Projects Completed' },
        { number: 15,  suffix: '+', label: 'Years of Experience' },
        { number: 100, suffix: '%', label: 'Client Satisfaction' },
        { number: 5, prefix: '★ ', label: 'Google Star Rating' },
      ],
      validation: R => R.max(4)
    }),

    // ── ABOUT SNIPPET ──
    defineField({
      name: 'aboutSnippet',
      title: '👷 About Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label (small gold text)', type: 'string', placeholder: 'e.g. Our Heritage', initialValue: 'Our Heritage' }),
        defineField({ name: 'headingMain', title: 'Heading (white part)', type: 'string', placeholder: 'e.g. About Our', initialValue: 'About Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold part)', type: 'string', placeholder: 'e.g. Craftsmanship', initialValue: 'Craftsmanship' }),
        defineField({ name: 'paragraph1', title: 'First Paragraph', type: 'text', rows: 3, placeholder: 'e.g. Mike\'s Constructions Group Ltd is built on a foundation of integrity...', initialValue: "Mike's Constructions Group Ltd is built on a foundation of integrity and architectural permanence. We specialise in high-end residential and commercial refurbishments across Crewe, Cheshire and the surrounding areas." }),
        defineField({ name: 'paragraph2', title: 'Second Paragraph', type: 'text', rows: 3, placeholder: 'e.g. From initial structural transformations...', initialValue: "From initial structural transformations to the final bespoke finish, our team ensures every detail reflects the quality and craftsmanship our clients expect. We don't just build spaces — we craft environments that stand the test of time." }),
        defineField({ name: 'highlights', title: 'Checklist Items', type: 'array', of: [{ type: 'string' }],
          initialValue: [
            'Residential Excellence — dream homes delivered to specification',
            'Commercial Fit-outs — professional spaces built right',
            'Full Project Management — from design to final handover',
            'Fully Licensed & Insured — total peace of mind',
          ],
          placeholder: 'Add a checklist item — e.g. Fully Licensed & Insured'
        }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', placeholder: 'e.g. Discover Our Story', initialValue: 'Discover Our Story' }),
        defineField({ name: 'yearsExperience', title: 'Years Experience (number only)', type: 'number', placeholder: 'e.g. 15', initialValue: 15 }),
        defineField({ name: 'mainImage', title: 'Main Team Photo', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text', initialValue: 'Mikes Constructions team' })] }),
        defineField({ name: 'accentImage', title: 'Accent Photo (smaller overlay image)', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text', initialValue: 'Construction work' })] }),
      ]
    }),

    // ── SERVICES SECTION HEADING ──
    defineField({
      name: 'servicesSection',
      title: '🔧 Services Section Heading',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', placeholder: 'e.g. What We Do', initialValue: 'What We Do' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', placeholder: 'e.g. Our', initialValue: 'Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', placeholder: 'e.g. Services', initialValue: 'Services' }),
        defineField({ name: 'subtext', title: 'Subtext below heading', type: 'text', rows: 2, placeholder: 'e.g. We offer a comprehensive range of construction and refurbishment services...', initialValue: 'We offer a comprehensive range of construction and refurbishment services tailored to every project and budget.' }),
        defineField({ name: 'buttonText', title: 'Button Text', type: 'string', placeholder: 'e.g. View All Services', initialValue: 'View All Services' }),
      ]
    }),

    // ── WHY CHOOSE ──
    defineField({
      name: 'whyChoose',
      title: '✅ Why Choose Us Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', placeholder: 'e.g. Why Us', initialValue: 'Why Us' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', placeholder: 'e.g. Why Choose', initialValue: 'Why Choose' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', placeholder: 'e.g. Mikes Constructions', initialValue: 'Mikes Constructions' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2, placeholder: "e.g. We know that choosing the right contractor is crucial...", initialValue: "We know that choosing the right contractor is crucial. Here's why hundreds of clients across Crewe trust us." }),
        defineField({
          name: 'cards', title: 'Reason Cards (4 cards)', type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Card Title', type: 'string', placeholder: 'e.g. Expertise & Experience' }),
              defineField({ name: 'body', title: 'Card Description', type: 'text', rows: 2, placeholder: 'e.g. Decades of combined industry leadership...' }),
            ],
            preview: { select: { title: 'title' } }
          }],
          initialValue: [
            { title: 'Expertise & Experience', body: 'Decades of combined industry leadership. Our team brings technical mastery and creative problem-solving to every project, large or small.' },
            { title: 'Quality Craftsmanship', body: 'We use premium materials and precision techniques on every square inch. Our pride in our work is reflected in the results we deliver.' },
            { title: 'Client-Centred Approach', body: 'Clear communication, transparent pricing and your satisfaction at every stage. Your vision and timeline are always our priority.' },
            { title: 'Fully Licensed & Insured', body: 'Accredited by leading industry bodies and fully insured. Every project is managed professionally for your complete peace of mind.' },
          ],
          validation: R => R.max(4)
        }),
      ]
    }),

    // ── PROJECTS SECTION ──
    defineField({
      name: 'projectsSection',
      title: '🏗 Projects Section Heading',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', placeholder: 'e.g. Portfolio', initialValue: 'Portfolio' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', placeholder: 'e.g. Our Recent', initialValue: 'Our Recent' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', placeholder: 'e.g. Projects', initialValue: 'Projects' }),
      ]
    }),

    // ── PROCESS ──
    defineField({
      name: 'process',
      title: '⚙️ Our Process Section',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', placeholder: 'e.g. How It Works', initialValue: 'How It Works' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', placeholder: 'e.g. Our Simple', initialValue: 'Our Simple' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', placeholder: 'e.g. Process', initialValue: 'Process' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2, placeholder: 'e.g. From first contact to final handover...', initialValue: 'From first contact to final handover, we make your experience seamless and stress-free.' }),
        defineField({
          name: 'steps', title: 'Process Steps (4 steps)', type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'title', title: 'Step Title', type: 'string', placeholder: 'e.g. Get in Touch' }),
              defineField({ name: 'description', title: 'Step Description', type: 'text', rows: 2, placeholder: 'e.g. Fill in our enquiry form or call us...' }),
            ],
            preview: { select: { title: 'title' } }
          }],
          initialValue: [
            { title: 'Get in Touch', description: 'Fill in our enquiry form or call us to tell us about your project — no obligation.' },
            { title: 'Free Site Visit', description: 'We visit to understand your goals, assess the space and discuss your vision in detail.' },
            { title: 'Detailed Quote', description: 'We provide a transparent, itemised quote with a clear timeline — no hidden costs.' },
            { title: 'We Build It', description: 'Our expert team gets to work, keeping you informed every step of the way until handover.' },
          ],
          validation: R => R.max(4)
        }),
      ]
    }),

    // ── TESTIMONIALS HEADING ──
    defineField({
      name: 'testimonialsSection',
      title: '⭐ Testimonials Section Heading',
      type: 'object',
      fields: [
        defineField({ name: 'label', title: 'Section Label', type: 'string', placeholder: 'e.g. Testimonials', initialValue: 'Testimonials' }),
        defineField({ name: 'headingMain', title: 'Heading (white)', type: 'string', placeholder: 'e.g. What Our', initialValue: 'What Our' }),
        defineField({ name: 'headingAccent', title: 'Heading (gold)', type: 'string', placeholder: 'e.g. Clients Say', initialValue: 'Clients Say' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2, placeholder: 'e.g. Rated 5 stars by homeowners...', initialValue: 'Rated 5 stars by homeowners and businesses across Crewe and Cheshire.' }),
      ]
    }),

    // ── CTA BANNER ──
    defineField({
      name: 'ctaBanner',
      title: '📣 CTA Banner (bottom call to action)',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', placeholder: 'e.g. Ready to Transform Your Space?', initialValue: 'Ready to Transform Your Space?' }),
        defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 2, placeholder: 'e.g. Get in touch today for a free, no-obligation quote.', initialValue: "Get in touch today for a free, no-obligation quote. We're excited to bring your ideas to life." }),
        defineField({ name: 'primaryButtonText', title: 'Primary Button Text', type: 'string', placeholder: 'e.g. Get a Free Quote', initialValue: 'Get a Free Quote' }),
        defineField({ name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string', placeholder: 'e.g. View Our Work', initialValue: 'View Our Work' }),
      ]
    }),

  ],
  preview: { prepare() { return { title: 'Homepage Content' } } }
})
