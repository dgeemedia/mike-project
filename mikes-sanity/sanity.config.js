import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'mikes-constructions',
  title: 'Mikes Constructions — CMS',

  // ⚠️ Replace with your actual project ID and dataset after setup
  projectId: '2ap09xp4',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('🏠 About Us')
              .child(
                S.document()
                  .schemaType('about')
                  .documentId('about')
              ),
            S.divider(),
            S.listItem()
              .title('🏗 Projects')
              .schemaType('project')
              .child(S.documentTypeList('project').title('All Projects')),
            S.listItem()
              .title('🔧 Services')
              .schemaType('service')
              .child(S.documentTypeList('service').title('All Services')),
            S.listItem()
              .title('📰 News & Blog')
              .schemaType('post')
              .child(S.documentTypeList('post').title('All Posts')),
            S.listItem()
              .title('⭐ Testimonials')
              .schemaType('testimonial')
              .child(S.documentTypeList('testimonial').title('All Testimonials')),
            S.divider(),
            S.listItem()
              .title('🏢 Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
