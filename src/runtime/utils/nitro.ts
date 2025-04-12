import { useRuntimeConfig } from '#imports';
import { PostHog } from 'posthog-node';

export const usePostHog = () => {
  const config = useRuntimeConfig().public.posthog;

  if (config.disabled || config.publicKey.length === 0) return;

  return new PostHog(config.publicKey, { host: config.host });
};
