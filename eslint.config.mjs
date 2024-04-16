//@ts-check
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier/recommended';

export default [...tseslint.configs.recommended, prettier];
