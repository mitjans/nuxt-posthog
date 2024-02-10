<script setup lang="ts">
import { computed } from 'vue';
import usePostHogFeatureFlag from '../composables/usePostHogFeatureFlag';

const { name } = withDefaults(
  defineProps<{
    name: string;
    match?: boolean | string;
  }>(),
  { match: true },
);

const { getFeatureFlag } = usePostHogFeatureFlag();

const featureFlag = computed(() => {
  return getFeatureFlag(name);
});
</script>

<template>
  <ClientOnly>
    <slot v-if="featureFlag?.value === match" :payload="featureFlag.payload" />
  </ClientOnly>
</template>
