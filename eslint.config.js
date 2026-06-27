import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  // Base JS configuration
  js.configs.recommended,

  // TypeScript configurations
  ...tseslint.configs.recommended,

  // Astro configurations
  ...eslintPluginAstro.configs['flat/recommended'],

  // Disable formatting rules that conflict with Prettier
  eslintConfigPrettier,

  // General settings & ignore patterns
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'package-lock.json'],
  }
);
