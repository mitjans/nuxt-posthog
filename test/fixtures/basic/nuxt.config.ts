import { resolve } from 'path';

export default defineNuxtConfig({
  alias: {
    '@nuxtjs/posthog': resolve(__dirname, '../../../src/module.ts'),
  },
  modules: ['@nuxtjs/posthog'],
});
