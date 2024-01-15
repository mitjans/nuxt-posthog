import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import type { PostHogConfig } from 'posthog-js';
import { defu } from 'defu';

export interface ModuleOptions {
  /**
   * The Posthog API key
   * @default process.env.POSTHOG_API_KEY
   * @example 'phc_1234567890abcdef1234567890abcdef1234567890a'
   * @type string
   * @docs https://posthog.com/docs/api
   */
  publicKey: string;

  /**
   * The Posthog API host
   * @default process.env.POSTHOG_API_HOST
   * @example 'https://app.posthog.com'
   * @type string
   * @docs https://posthog.com/docs/api
   */
  host: string;

  /**
   * If set to true, the module will capture page views automatically
   * @default true
   * @type boolean
   * @docs https://posthog.com/docs/product-analytics/capture-events#single-page-apps-and-pageviews
   */
  capturePageViews?: boolean;

  /**
   * Posthog Client options
   * @default {
   *    api_host: process.env.POSTHOG_API_HOST,
   *    loaded: () => <enable debug mode if in development>
   * }
   * @type object
   * @docs https://posthog.com/docs/libraries/js#config
   */
  clientOptions?: PostHogConfig;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-posthog',
    configKey: 'posthog',
  },
  defaults: {
    publicKey: process.env.POSTHOG_API_KEY as string,
    host: process.env.POSTHOG_API_HOST as string,
    capturePageViews: true,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.posthog = defu<ModuleOptions, ModuleOptions[]>(
      nuxt.options.runtimeConfig.public.posthog,
      {
        publicKey: options.publicKey,
        host: options.host,
      },
    );

    // Make sure url and key are set
    if (!nuxt.options.runtimeConfig.public.posthog.publicKey) {
      console.warn('Missing Posthog API public key, set it either in `nuxt.config.ts` or via env variable');
    }
    if (!nuxt.options.runtimeConfig.public.posthog.host) {
      console.warn('Missing Posthog API host, set it either in `nuxt.config.ts` or via env variable');
    }

    addPlugin(resolve('./runtime/plugins/posthog.client'));
  },
});
