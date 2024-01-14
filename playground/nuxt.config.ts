export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  posthog: {
    publicKey: process.env.POSTHOG_API_KEY,
    host: process.env.POSTHOG_API_HOST,
  },
});
