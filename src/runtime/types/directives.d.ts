import type { ObjectDirective } from 'vue';
import type { Property } from 'posthog-js';

declare global {
  export interface PostHogCaptureEvent {
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
    properties?: Record<string, Property>;
  }
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    vPosthogCapture: ObjectDirective<HTMLElement, PostHogCaptureEvent | string>;
  }
}
export {};
