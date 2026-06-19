// mikes-sanity/sanity.cli.js
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2ap09xp4',
    dataset: 'production',
  },
  deployment: {
    appId: 'lfvtuk51kewbaip522eni9bt',
  },
})