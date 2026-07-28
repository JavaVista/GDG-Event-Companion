// @ts-check
import process from 'node:process';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://JavaVista.github.io',
  base:
    process.env.NODE_ENV === 'production' || process.env.CI
      ? '/GDG-Event-Companion'
      : '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
