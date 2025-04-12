import { useRuntimeConfig } from '#imports';
import { defineNitroPlugin } from 'nitropack/runtime';
import { getCookie } from 'h3';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    const config = useRuntimeConfig().public.posthog;

    if (config.disabled) return;

    const distinctId = getCookie(event, 'ph-identify');
    event.context.posthogId = distinctId;
  });
});
