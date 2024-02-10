import { defineNuxtPlugin } from '#app';
import { vPostHogCapture } from '../directives/v-posthog-capture';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('posthog-capture', vPostHogCapture);
});
