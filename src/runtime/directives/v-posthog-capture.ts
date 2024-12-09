import { useNuxtApp } from '#app';
import type { ObjectDirective, FunctionDirective } from 'vue';

const directive: FunctionDirective<HTMLElement, PostHogCaptureEvent | string> = (el, { value, arg }) => {
  const { $clientPosthog } = useNuxtApp();

  if (!el.hasAttribute('posthog-listener')) {
    el.setAttribute('posthog-listener', 'true');

    el.addEventListener(arg ?? 'click', () => {
      if (!$clientPosthog) return;

      if (typeof value === 'string') $clientPosthog.capture(value);
      else $clientPosthog.capture(value.name, value.properties);
    });
  }
};

export const vPostHogCapture: ObjectDirective = {
  mounted: directive,
  updated: directive,
};
