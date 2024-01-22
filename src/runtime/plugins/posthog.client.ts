import { defineNuxtPlugin, useRouter, useRuntimeConfig } from '#app';
import { posthog, type PostHogConfig } from 'posthog-js';
import { defu } from 'defu';

export default defineNuxtPlugin({
  name: 'posthog',
  enforce: 'pre',
  setup: async () => {
    const config = useRuntimeConfig().public.posthog;

    const clientOptions = defu<PostHogConfig, Partial<PostHogConfig>[]>(config.clientOptions ?? {}, {
      api_host: config.host,
      loaded: (posthog) => {
        if (import.meta.env.MODE === 'development') posthog.debug();
      },
    });

    const posthogClient = posthog.init(config.publicKey, clientOptions);

    if (config.capturePageViews) {
      // Make sure that pageviews are captured with each route change
      const router = useRouter();
      router.afterEach((to) => {
        posthog.capture('$pageview', {
          current_url: to.fullPath,
        });
      });
    }

    // Wait for feature flags to be loaded
    await new Promise((resolve) => posthog.onFeatureFlags(resolve));

    return {
      provide: {
        posthog: posthogClient,
      },
    };
  },
});
