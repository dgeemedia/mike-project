// mikes-sanity/sanity.config.js — Sanity Studio configuration for Mikes Constructions Group Ltd
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'mikes-constructions',
  title: 'Mikes Constructions — CMS',
  projectId: '2ap09xp4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([

            // ── PAGES ──
            S.listItem().title('🏠 Homepage').child(
              S.document().schemaType('homepage').documentId('homepage')
            ),
            S.listItem().title('👷 About Us Page').child(
              S.document().schemaType('aboutPage').documentId('aboutPage')
            ),
            S.listItem().title('🔧 Services Page').child(
              S.document().schemaType('servicesPage').documentId('servicesPage')
            ),
            S.listItem().title('🏗 Projects Page').child(
              S.document().schemaType('projectsPage').documentId('projectsPage')
            ),
            S.listItem().title('📞 Contact Page').child(
              S.document().schemaType('contactPage').documentId('contactPage')
            ),
            S.listItem().title('❓ FAQ Page').child(
              S.document().schemaType('faqPage').documentId('faqPage')
            ),

            S.divider(),

            // ── COLLECTIONS ──
            S.listItem().title('🏗 Projects (Portfolio)').schemaType('project')
              .child(S.documentTypeList('project').title('All Projects')),
            S.listItem().title('📰 News & Blog Posts').schemaType('post')
              .child(S.documentTypeList('post').title('All Posts')),
            S.listItem().title('🔧 Services').schemaType('service')
              .child(S.documentTypeList('service').title('All Services')),
            S.listItem().title('⭐ Testimonials').schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('All Testimonials')),

            S.divider(),

            // ── SETTINGS ──
            S.listItem().title('🏢 Site Settings').child(
              S.document().schemaType('siteSettings').documentId('siteSettings')
            ),
            S.listItem().title('🎨 Design & Colours').child(
              S.document().schemaType('designSettings').documentId('designSettings')
            ),
          ])
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
