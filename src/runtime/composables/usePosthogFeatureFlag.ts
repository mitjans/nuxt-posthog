import { useNuxtApp } from '#app';

export default () => {
  const { $posthog } = useNuxtApp();

  const isFeatureEnabled = (feature: string) => {
    if (!$posthog) return;

    return $posthog.isFeatureEnabled(feature);
  };

  const getFeatureFlag = (feature: string) => {
    if (!$posthog) return;

    return {
      value: $posthog.getFeatureFlag(feature),
      payload: $posthog.getFeatureFlagPayload(feature),
    };
  };

  return {
    isFeatureEnabled,
    getFeatureFlag,
  };
};
