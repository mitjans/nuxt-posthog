import type { ModuleOptions } from '../../module';
import type { PostHog } from 'posthog-js';

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    posthog: ModuleOptions;
  }
}

type NuxtPosthogPluginInjections = {
  $clientPosthog: PostHog | null;
  $serverPosthog: PostHog | null;
  $posthog: 'Deprecated: use $clientPosthog instead.';
};

declare module '#app' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface NuxtApp extends NuxtPosthogPluginInjections {}
}

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ComponentCustomProperties extends NuxtPosthogPluginInjections {}
}
