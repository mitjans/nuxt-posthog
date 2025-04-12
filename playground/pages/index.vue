<template>
  <PostHogFeatureFlag v-slot="{ payload }" name="ab" match="var2">
    <div>This content is under a feature flag</div>
    <div
      v-posthog-capture="{
        name: 'event',
        properties: {
          color: 'red',
        },
      }"
    >
      This is the feature flag payload: {{ payload }}
    </div>
  </PostHogFeatureFlag>
  <button @click="testBackendIdentity">Test backend</button>
</template>

<script setup lang="ts">
const testBackendIdentity = async () => {
  await $fetch('/api/test');
};
</script>
