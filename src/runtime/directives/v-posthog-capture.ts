import { useNuxtApp } from '#app';
import type { ObjectDirective, FunctionDirective } from 'vue';

const directive: FunctionDirective<HTMLElement, PostHogCaptureEvent | string> = (el, { value }) => {
  const { $posthog } = useNuxtApp();
  el.addEventListener('click', () => {
    if (!$posthog) return;

    if (typeof value === 'string') $posthog.capture(value);
    else $posthog.capture(value.name, value.properties);
  });
};

export const vPostHogCapture: ObjectDirective = {
  mounted: directive,
  updated: directive,
};
