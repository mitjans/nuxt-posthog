<script setup lang="ts">
import { computed } from 'vue';
import usePosthogFeatureFlag from '../composables/usePosthogFeatureFlag';

const { name } = withDefaults(
  defineProps<{
    name: string;
    match?: boolean | string;
  }>(),
  { match: true },
);

const { getFeatureFlag } = usePosthogFeatureFlag();

const featureFlag = computed(() => {
  return getFeatureFlag(name);
});
</script>

<template>
  <ClientOnly>
    <slot v-if="featureFlag?.value === match" :payload="featureFlag.payload" />
  </ClientOnly>
</template>
