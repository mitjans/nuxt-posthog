import { defineNuxtPlugin, useCookie, useRouter, useRuntimeConfig, useState } from '#app';
import { posthog, type PostHog, type JsonType, type PostHogConfig } from 'posthog-js';
import { defu } from 'defu';

export default defineNuxtPlugin({
  name: 'posthog',
  enforce: 'pre',
  setup: async () => {
    const config = useRuntimeConfig().public.posthog;

    if (config.disabled)
      return {
        provide: {
          posthog: 'Deprecated: use $clientPosthog instead.' as const,
          clientPosthog: null as PostHog | null,
        },
      };

    const posthogFeatureFlags = useState<Record<string, boolean | string> | undefined>('ph-feature-flags');
    const posthogFeatureFlagPayloads = useState<Record<string, JsonType> | undefined>('ph-feature-flag-payloads');

    const clientOptions = defu<PostHogConfig, Partial<PostHogConfig>[]>(config.clientOptions ?? {}, {
      api_host: config.host,
      capture_pageview: false,
      capture_pageleave: false,
      bootstrap: {
        featureFlags: posthogFeatureFlags.value,
        featureFlagPayloads: posthogFeatureFlagPayloads.value,
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
    if (config.capturePageLeaves) {
      // Make sure that pageleaves are captured with each route change
      const router = useRouter();

      router.beforeEach((from) => {
        posthog.capture('$pageleave', {
          current_url: from.fullPath,
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
        clientPosthog: (posthogClient ? posthogClient : null) as PostHog | null,
        posthog: 'Deprecated: use $clientPosthog instead.' as const,
      },
    };
  },
});
