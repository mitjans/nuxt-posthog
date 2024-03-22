import { defineNuxtPlugin, useCookie, useRouter, useRuntimeConfig, useState } from '#app';
import { posthog, type JsonType, type PostHogConfig } from 'posthog-js';
import { defu } from 'defu';

export default defineNuxtPlugin({
  name: 'posthog',
  enforce: 'pre',
  setup: async () => {
    const config = useRuntimeConfig().public.posthog;

    const posthogFeatureFlags = useState<Record<string, boolean | string> | undefined>('ph-feature-flags');
    const posthogFeatureFlagPayloads = useState<Record<string, JsonType> | undefined>('ph-feature-flag-payloads');

    const clientOptions = defu<PostHogConfig, Partial<PostHogConfig>[]>(config.clientOptions ?? {}, {
      api_host: config.host,
      capture_pageview: false,
      bootstrap: {
        featureFlags: posthogFeatureFlags.value,
        featureFlagPayloads: posthogFeatureFlagPayloads.value,
      },
      loaded: (posthog) => {
        if (import.meta.env.MODE === 'development') posthog.debug();
      },
    });

    const posthogClient = posthog.init(config.publicKey, clientOptions);

    const identity = useCookie('ph-identify');
    identity.value = posthog.get_distinct_id();

    if (config.capturePageViews) {
      // Make sure that pageviews are captured with each route change
      const router = useRouter();
      router.afterEach((to) => {
        posthog.capture('$pageview', {
          current_url: to.fullPath,
        });
      });
    }

    posthog.onFeatureFlags((flags, featureFlags) => {
      posthogFeatureFlags.value = featureFlags;
      posthogFeatureFlagPayloads.value = flags.reduce<Record<string, JsonType>>((acc, flag) => {
        acc[flag] = posthog.getFeatureFlagPayload(flag);
        return acc;
      }, {});
    });

    return {
      provide: {
        clientPosthog: posthogClient,
        posthog: 'Deprecated: use $clientPosthog instead.' as const,
      },
    };
  },
});
