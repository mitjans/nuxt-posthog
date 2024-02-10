<template>
  <PostHogFeatureFlag v-slot="{ payload }" name="test" match="variant">
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
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
runtimeConfig.public.posthogApiKey;
</script>
