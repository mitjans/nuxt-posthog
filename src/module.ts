import { defineNuxtModule, addImports, addComponent, addPlugin, createResolver, addTypeTemplate } from '@nuxt/kit';
import type { PostHogConfig } from 'posthog-js';
import { defu } from 'defu';

export interface ModuleOptions {
  /**
   * The PostHog API key
   * @default process.env.POSTHOG_API_KEY
   * @example 'phc_1234567890abcdef1234567890abcdef1234567890a'
   * @type string
   * @docs https://posthog.com/docs/api
   */
  publicKey: string;

  /**
   * The PostHog API host
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
   * PostHog Client options
   * @default {
   *    api_host: process.env.POSTHOG_API_HOST,
   *    loaded: () => <enable debug mode if in development>
   * }
   * @type object
   * @docs https://posthog.com/docs/libraries/js#config
   */
  clientOptions?: Partial<PostHogConfig>;

  /**
   * If set to true, the module will be disabled (no events will be sent to PostHog).
   * This is useful for development environments. Directives and components will still be available for you to use.
   * @default false
   * @type boolean
   */
  disabled?: boolean;
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
    disabled: false,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.posthog = defu<ModuleOptions, ModuleOptions[]>(
      nuxt.options.runtimeConfig.public.posthog,
      {
        publicKey: options.publicKey,
        host: options.host,
        capturePageViews: options.capturePageViews,
        clientOptions: options.clientOptions,
        disabled: options.disabled,
      },
    );

    // Make sure url and key are set
    if (!nuxt.options.runtimeConfig.public.posthog.publicKey) {
      console.warn('Missing PostHog API public key, set it either in `nuxt.config.ts` or via env variable');
    }
    if (!nuxt.options.runtimeConfig.public.posthog.host) {
      console.warn('Missing PostHog API host, set it either in `nuxt.config.ts` or via env variable');
    }

    addPlugin(resolve('./runtime/plugins/directives'));
    addPlugin(resolve('./runtime/plugins/posthog.client'));
    addPlugin(resolve('./runtime/plugins/posthog.server'));
    addImports({
      from: resolve('./runtime/composables/usePostHogFeatureFlag'),
      name: 'usePostHogFeatureFlag',
    });
    addComponent({
      filePath: resolve('./runtime/components/PostHogFeatureFlag.vue'),
      name: 'PostHogFeatureFlag',
    });
    addTypeTemplate({
      filename: 'types/posthog-directives.d.ts',
      src: resolve('./runtime/types/directives.d.ts'),
    });
  },
});
