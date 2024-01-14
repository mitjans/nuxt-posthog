import { resolve } from 'path';

export default defineNuxtConfig({
  alias: {
    'nuxt-posthog': resolve(__dirname, '../../../src/module.ts'),
  },
  modules: ['nuxt-posthog'],
});
