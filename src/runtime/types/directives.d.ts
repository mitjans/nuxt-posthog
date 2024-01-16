import type { ObjectDirective } from 'vue';

declare global {
  export interface PosthogCaptureEvent {
    /**
     * Event name
     *
     * @docs https://posthog.com/docs/product-analytics/capture-events
     */
    name: string;

    /**
     * Event properties
     *
     * @docs https://posthog.com/docs/product-analytics/capture-events#setting-event-properties
     */
    properties?: Record<string, any>;
  }
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    vPosthogCapture: ObjectDirective<HTMLElement, PosthogCaptureEvent | string>;
  }
}
export {};
