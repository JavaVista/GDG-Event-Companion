// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://JavaVista.github.io',
  base: '/GDG-Event-Companion/',
  vite: {
    plugins: [tailwindcss()],
  },
});
