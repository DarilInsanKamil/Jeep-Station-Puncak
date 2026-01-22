import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import path from 'path'

export default defineConfig({
	plugins: [tailwindcss(), , sveltekit(), enhancedImages()],
	resolve: {
		alias: {
			$lib: path.resolve("./src/lib"),
		},
	},
});
