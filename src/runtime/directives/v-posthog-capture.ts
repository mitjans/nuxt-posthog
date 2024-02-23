import { useNuxtApp } from '#app';
import type { ObjectDirective, FunctionDirective } from 'vue';

const directive: FunctionDirective<HTMLElement, PostHogCaptureEvent | string> = (el, { value }) => {
  const { $clientPosthog } = useNuxtApp();
  el.addEventListener('click', () => {
    if (!$clientPosthog) return;

    if (typeof value === 'string') $clientPosthog.capture(value);
    else $clientPosthog.capture(value.name, value.properties);
  });
};

export const vPostHogCapture: ObjectDirective = {
  mounted: directive,
  updated: directive,
};
