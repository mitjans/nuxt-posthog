import { useState } from '#app';
import type { JsonType } from 'posthog-js';

export default () => {
  const posthogFeatureFlags = useState<Record<string, boolean | string> | undefined>('ph-feature-flags');
  const posthogFeatureFlagPayloads = useState<Record<string, JsonType> | undefined>('ph-feature-flag-payloads');

  const isFeatureEnabled = (feature: string) => {
    return posthogFeatureFlags.value?.[feature] ?? false;
  };

  const getFeatureFlag = (feature: string) => {
    return {
      value: posthogFeatureFlags.value?.[feature] ?? false,
      payload: posthogFeatureFlagPayloads.value?.[feature],
    };
  };

  return {
    isFeatureEnabled,
    getFeatureFlag,
  };
};
