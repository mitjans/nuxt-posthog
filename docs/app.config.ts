export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'slate',
    footer: {
      bottom: {
        left: 'text-sm text-gray-500 dark:text-gray-400',
        wrapper: 'border-t border-gray-200 dark:border-gray-800',
      },
    },
  },
  seo: {
    siteName: 'Nuxt PostHog module',
  },
  header: {
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/mitjans/nuxt-posthog',
        target: '_blank',
        'aria-label': 'Docs template on GitHub',
      },
    ],
  },
  footer: {
    credits: 'Copyright © 2024',
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-nuxtdotjs',
        to: 'https://nuxt.com',
        target: '_blank',
        'aria-label': 'Nuxt Website',
      },
      {
        icon: 'i-simple-icons-discord',
        to: 'https://discord.com/invite/ps2h6QT',
        target: '_blank',
        'aria-label': 'Nuxt UI on Discord',
      },
      {
        icon: 'i-simple-icons-x',
        to: 'https://x.com/nuxt_js',
        target: '_blank',
        'aria-label': 'Nuxt on X',
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/mitjans/nuxt-posthog',
        target: '_blank',
        'aria-label': 'Nuxt UI on GitHub',
      },
    ],
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/mitjans/nuxt-posthog/edit/main/docs/content',
      links: [
        {
          icon: 'i-heroicons-star',
          label: 'Star on GitHub',
          to: 'https://github.com/mitjans/nuxt-posthog',
          target: '_blank',
        },
        {
          icon: 'i-heroicons-book-open',
          label: 'Nuxt docs',
          to: 'https://nuxt.com/docs',
          target: '_blank',
        },
        {
          icon: 'i-simple-icons-posthog',
          label: 'PostHog docs',
          to: 'https://posthog.com/docs',
          target: '_blank',
        },
      ],
    },
  },
});
