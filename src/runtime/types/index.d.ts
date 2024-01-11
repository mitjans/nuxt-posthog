import type { ModuleOptions } from '../../module';

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    posthog: ModuleOptions;
  }
}
