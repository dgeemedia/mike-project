// mikes-sanity/schemas/index.js

import homepage       from './homepage'
import aboutPage      from './aboutPage'
import servicesPage   from './servicesPage'
import projectsPage   from './projectsPage'
import contactPage    from './contactPage'
import faqPage        from './faqPage'
import careerPage     from './careerPage'
import project        from './project'
import post           from './post'
import service        from './service'
import testimonial    from './testimonial'
import siteSettings   from './siteSettings'
import designSettings from './designSettings'

export const schemaTypes = [
  // Pages
  homepage, aboutPage, servicesPage, projectsPage, contactPage, faqPage, careerPage,
  // Collections
  project, post, service, testimonial,
  // Settings
  siteSettings, designSettings,
]