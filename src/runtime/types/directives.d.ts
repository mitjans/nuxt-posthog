import type { ObjectDirective } from 'vue';

declare global {
  export interface PosthogCaptureEvent {
    name: string;
    properties?: Record<string, any>;
  }
}

declare module 'vue' {
  export interface ComponentCustomProperties {
    vPosthogCapture: ObjectDirective<HTMLElement, PosthogCaptureEvent | string>;
  }
}
export {};
