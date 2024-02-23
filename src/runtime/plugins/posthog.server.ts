import { defineNuxtPlugin, useCookie, useRuntimeConfig, useState } from '#app';
import { PostHog } from 'posthog-node';
import type { JsonType } from 'posthog-js';

export default defineNuxtPlugin({
  name: 'posthog-server',
  enforce: 'pre',
  setup: async () => {
    const config = useRuntimeConfig().public.posthog;

    if (config.publicKey.length === 0) {
      // PostHog public key is not defined. Skipping PostHog setup.
      // User has already been warned on dev startup
      return {};
    }

    const posthog = new PostHog(config.publicKey, { host: config.host });
    await posthog.reloadFeatureFlags();

    const identity = useCookie('ph-identify', { default: () => '' });

    const { featureFlags, featureFlagPayloads } = await posthog.getAllFlagsAndPayloads(identity.value);

    useState<Record<string, boolean | string> | undefined>('ph-feature-flags', () => featureFlags);
    useState<Record<string, JsonType> | undefined>('ph-feature-flag-payloads', () => featureFlagPayloads);

    return {
      provide: {
        serverPosthog: posthog,
      },
    };
  },
});
