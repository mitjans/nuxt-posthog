// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import prettier from 'eslint-plugin-prettier/recommended';

export default createConfigForNuxt(
  { features: { tooling: true } },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
);
