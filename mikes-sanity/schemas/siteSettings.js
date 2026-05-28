import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '🏢',
  fields: [

    // ── LOGO ──
    defineField({
      name: 'logo',
      title: '🖼 Logo Image',
      type: 'image',
      description: 'Upload your company logo. Best format: PNG with transparent background, at least 400px wide.',
      options: { hotspot: false },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text', initialValue: 'Mikes Constructions Logo' })]
    }),
    defineField({
      name: 'useLogo',
      title: 'Use Logo Image (instead of text)',
      type: 'boolean',
      description: 'Turn ON to show your logo image. Turn OFF to show the "M + Mikes Constructions" text.',
      initialValue: false,
    }),
    defineField({
      name: 'logoWidth',
      title: 'Logo Width (px)',
      type: 'number',
      description: 'How wide your logo appears in the navbar. Default: 140. Adjust if it looks too big or small.',
      initialValue: 140,
    }),

    // ── COMPANY ──
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      placeholder: 'e.g. Mikes Constructions Group Ltd',
      initialValue: 'Mikes Constructions Group Ltd',
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      type: 'string',
      placeholder: 'e.g. Your Trusted Partner in Construction and Refurbishment across Crewe',
      initialValue: 'Your Trusted Partner in Construction and Refurbishment across Crewe, Cheshire and the North West.',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      placeholder: 'e.g. +44 7700 900000 — this will show in the footer',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      placeholder: 'e.g. info@mikes-constructions.co.uk',
      initialValue: 'info@mikes-constructions.co.uk',
    }),
    defineField({
      name: 'address',
      title: 'Service Area',
      type: 'string',
      placeholder: 'e.g. Crewe, Cheshire & surrounding areas',
      initialValue: 'Crewe, Cheshire & surrounding areas',
    }),

    // ── SOCIAL MEDIA ──
    defineField({ name: 'facebook',  title: 'Facebook URL',   type: 'url', placeholder: 'e.g. https://www.facebook.com/YourPageName' }),
    defineField({ name: 'instagram', title: 'Instagram URL',  type: 'url', placeholder: 'e.g. https://www.instagram.com/YourHandle' }),
    defineField({ name: 'linkedin',  title: 'LinkedIn URL',   type: 'url', placeholder: 'e.g. https://www.linkedin.com/company/YourCompany' }),
    defineField({ name: 'tiktok',    title: 'TikTok URL',     type: 'url', placeholder: 'e.g. https://www.tiktok.com/@YourHandle' }),
    defineField({ name: 'youtube',   title: 'YouTube URL',    type: 'url', placeholder: 'e.g. https://www.youtube.com/@YourChannel' }),
    defineField({ name: 'x',         title: 'X (Twitter) URL',type: 'url', placeholder: 'e.g. https://www.x.com/YourHandle' }),

    // ── STATS ──
    defineField({
      name: 'projectsCompleted',
      title: 'Projects Completed (stat number)',
      type: 'number',
      placeholder: 'e.g. 200',
      initialValue: 200,
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience (stat number)',
      type: 'number',
      placeholder: 'e.g. 15',
      initialValue: 15,
    }),
  ],
  preview: { prepare() { return { title: '🏢 Site Settings' } } }
})
