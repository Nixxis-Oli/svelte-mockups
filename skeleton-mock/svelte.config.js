import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Static build: every route is prerendered to plain files, so the output can be
// served by any static host. BASE_PATH covers project pages served from a
// subdirectory (GitHub Pages: BASE_PATH=/repo-name npm run build).
const base = process.env.BASE_PATH ?? '';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html',
      precompress: false,
      strict: true
    }),
    // relative:false makes `base` a plain absolute string. The default (true)
    // rewrites links relative to each page, which double-counts a manual
    // `{base}` prefix in our markup.
    paths: { base, relative: false }
  }
};
