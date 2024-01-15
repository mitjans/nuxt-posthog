import { defineNuxtPlugin } from '#app';
import { vPosthogCapture } from '../directives/v-posthog-capture';

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.directive('posthog-capture', vPosthogCapture);
});
