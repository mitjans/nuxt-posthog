<script setup lang="ts">
import { computed } from 'vue';
import usePostHogFeatureFlag from '../composables/usePostHogFeatureFlag';

const { name, match } = defineProps({
  name: { type: String, required: true },
  match: { default: true, required: false, type: [String, Boolean] },
});

const { getFeatureFlag } = usePostHogFeatureFlag();

const featureFlag = computed(() => getFeatureFlag(name));
</script>

<template>
  <slot v-if="featureFlag?.value === match" :payload="featureFlag.payload" />
</template>
