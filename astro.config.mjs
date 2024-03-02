import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: 'https://stargazers.club',
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
        purge: [],
      },
    }),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
    }), 
    vue()]
});