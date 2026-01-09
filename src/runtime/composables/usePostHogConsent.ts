import { ref, computed, nextTick } from 'vue';
import { type PostHog, posthog } from 'posthog-js';

export type ConsentStatus = 'pending' | 'granted' | 'denied';

export default () => {
  /**
   * Get the initial consent status from PostHog
   * @returns 'pending' | 'granted' | 'denied'
   */
  const getInitialStatus = (): ConsentStatus => {
    if (typeof window === 'undefined') {
      return 'denied';
    }

    if (typeof (posthog as PostHog).get_explicit_consent_status === 'function') {
      return (posthog as PostHog).get_explicit_consent_status() as ConsentStatus;
    }

    return 'granted';
  };

  const consentStatus = ref<ConsentStatus>(getInitialStatus());

  /**
   * Sync consent status from PostHog
   */
  const syncConsentStatus = () => {
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof (posthog as PostHog).get_explicit_consent_status === 'function') {
      consentStatus.value = (posthog as PostHog).get_explicit_consent_status() as ConsentStatus;
    }
  };

  /**
   * Opt in to tracking
   */
  const optIn = (): void => {
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof (posthog as PostHog).opt_in_capturing === 'function') {
      (posthog as PostHog).opt_in_capturing();
      consentStatus.value = 'granted';
      nextTick(syncConsentStatus);
    }
  };

  /**
   * Opt out of tracking
   */
  const optOut = (): void => {
    if (typeof window === 'undefined') {
      return;
    }

    if (typeof (posthog as PostHog).opt_out_capturing === 'function') {
      (posthog as PostHog).opt_out_capturing();
      consentStatus.value = 'denied';
      nextTick(syncConsentStatus);
    }
  };

  return {
    consentStatus,
    optIn,
    optOut,
  };
};
