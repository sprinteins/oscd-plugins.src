import { build, defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const isDevelopment = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte({
		compilerOptions:{
			customElement:true,
		}
	})],
	build:{
		lib:{
			entry: "src/plugin.svelte",
			formats: ['es'],
			fileName: "index",
		},
		sourcemap: isDevelopment ? "inline" : false,
	}
})
