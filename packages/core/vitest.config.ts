import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'


export default defineConfig({
	test: {
		browser: {
			enabled: true,
			headless: false,
			name: "chrome",
		},
	},
  })