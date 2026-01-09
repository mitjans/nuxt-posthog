<template>
  <NuxtLayout>
    <NuxtPage />

    <Transition name="fade">
      <div v-if="consentStatus === 'pending'">
        <div>
          <p>We use cookies to analyze site usage and improve your experience.</p>
          <div>
            <button @click="handleAccept">Accept</button>
            <button @click="handleReject">Reject</button>
          </div>
        </div>
      </div>
    </Transition>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { optIn, optOut, consentStatus } = usePostHogConsent();

const handleAccept = () => {
  optIn();
};

const handleReject = () => {
  optOut();
};

watch(consentStatus, (newStatus) => {
  console.log('Consent status changed to:', newStatus);
});
</script>
