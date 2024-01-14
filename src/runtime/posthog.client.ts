import { defineNuxtPlugin, useRouter } from '#app';
import { posthog, type PostHogConfig } from 'posthog-js';
import { defu } from 'defu';

export default defineNuxtPlugin({
  name: 'posthog',
  enforce: 'pre',
  setup: () => {
    const config = useRuntimeConfig().public.posthog;

    const clientOptions = defu<PostHogConfig, Partial<PostHogConfig>[]>(config.clientOptions ?? {}, {
      api_host: config.host,
      loaded: (posthog) => {
        if (import.meta.env.MODE === 'development') posthog.debug();
      },
    });

    const posthogClient = posthog.init(config.publicKey, clientOptions);

    // Make sure that pageviews are captured with each route change
    const router = useRouter();
    router.afterEach((to) => {
      posthog.capture('$pageview', {
        current_url: to.fullPath,
      });
    });

    return {
      provide: {
        posthog: posthogClient,
      },
    };
  },
});
