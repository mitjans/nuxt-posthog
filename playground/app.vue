<template>
  <div>Nuxt module playground!</div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
runtimeConfig.public.posthogApiKey;
</script>
