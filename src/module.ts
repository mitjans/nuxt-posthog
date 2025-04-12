import {
  defineNuxtModule,
  addComponent,
  addPlugin,
  createResolver,
  addTypeTemplate,
  addServerPlugin,
  addServerImports,
} from '@nuxt/kit';
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
   * If set to true, the module will capture page leaves automatically
   * @default true
   * @type boolean
   * @docs https://posthog.com/docs/product-analytics/capture-events#single-page-apps-and-pageviews
   */
  capturePageLeaves?: boolean;

  /**
   * PostHog Client options
   * @default {
   *    api_host: process.env.POSTHOG_API_HOST,
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

  /**
   * If set to true, PostHog will be proxied through the Nuxt server.
   * @default false
   * @type boolean
   * @docs https://posthog.com/docs/advanced/proxy/nuxt
   */
  proxy?: boolean;
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
    capturePageLeaves: true,
    disabled: false,
    proxy: false,
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
        capturePageLeaves: options.capturePageLeaves,
        clientOptions: options.clientOptions,
        disabled: options.disabled,
        proxy: options.proxy,
      },
    );

    const config = nuxt.options.runtimeConfig.public.posthog;

    // Make sure url and key are set
    const enabled = !config.disabled;
    if (enabled && !config.publicKey) {
      console.warn('Missing PostHog API public key, set it either in `nuxt.config.ts` or via env variable');
    }
    if (enabled && !config.host) {
      console.warn('Missing PostHog API host, set it either in `nuxt.config.ts` or via env variable');
    }

    // Setup proxy
    if (enabled && config.proxy && config.host) {
      const url = new URL(config.host);
      const region = url.hostname.split('.')[0];

      if (!['eu', 'us'].includes(region)) {
        throw new Error(`Invalid PostHog API host when setting proxy, expected 'us' or 'eu', got '${region}'`);
      }

      nuxt.options.routeRules = nuxt.options.routeRules || {};

      nuxt.options.routeRules['/ingest/ph/static/**'] = {
        proxy: `https://${region}-assets.i.posthog.com/static/**`,
      };
      nuxt.options.routeRules['/ingest/ph/**'] = {
        proxy: `https://${region}.i.posthog.com/**`,
      };
    }

    nuxt.hook('imports:dirs', (dirs) => {
      dirs.push(resolve('./runtime/composables'));
    });

    addPlugin(resolve('./runtime/plugins/directives'));
    addPlugin(resolve('./runtime/plugins/posthog.client'));
    addPlugin(resolve('./runtime/plugins/posthog.server'));

    addComponent({
      filePath: resolve('./runtime/components/PostHogFeatureFlag.vue'),
      name: 'PostHogFeatureFlag',
    });
    addTypeTemplate({
      filename: 'types/posthog-directives.d.ts',
      src: resolve('./runtime/types/directives.d.ts'),
    });

    addServerPlugin(resolve('./runtime/plugins/nitro'));
    addServerImports([
      {
        from: resolve('./runtime/utils/nitro'),
        name: 'usePostHog',
      },
    ]);

    addTypeTemplate(
      {
        filename: 'types/posthog-nitro.d.ts',
        src: resolve('./runtime/types/nitro.d.ts'),
      },
      { nitro: true },
    );
  },
});
