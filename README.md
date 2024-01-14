# Nuxt Posthog

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

> [Posthog](https://posthog.com/) module for [Nuxt](https://nuxt.com/)

- [✨ &nbsp;Release Notes](https://posthog.nuxtjs.org/changelog)
- [📖 &nbsp;Documentation](https://posthog.nuxtjs.org)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/@nuxtjs/posthog?file=playground%2Fapp.vue) -->

## Features

<!-- Highlight some of the features your module provide here -->

- Nuxt 3 ready
- Typescript support
- Automatic configuration
- Vue global directives for Posthog events

## Quick Setup

1. Add `@nuxtjs/posthog` dependency to your project

   ```bash
   # Using pnpm
   pnpm add -D @nuxtjs/posthog

   # Using yarn
   yarn add --dev @nuxtjs/posthog

   # Using npm
   npm install --save-dev @nuxtjs/posthog
   ```

2. Add `@nuxtjs/posthog` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@nuxtjs/posthog'],
});
```

That's it! You can now use Posthog in your Nuxt app ✨

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test
pnpm run test:watch

# Release new version
pnpm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nuxtjs/posthog/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@nuxtjs/posthog
[npm-downloads-src]: https://img.shields.io/npm/dm/@nuxtjs/posthog.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@nuxtjs/posthog
[license-src]: https://img.shields.io/npm/l/@nuxtjs/posthog.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@nuxtjs/posthog
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
