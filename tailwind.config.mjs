/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js'
	],
	theme: {
		extend: {
			colors: {
				primary: '#CE4E42',
				gray: {
					900: '#0D0D0D',
					800: '#262626',
					700: '#404040',
					600: '#595959',
					500: '#737373',
					400: '#8C8C8C',
					300: '#A6A6A6',
					200: '#BFBFBF',
					100: '#D9D9D9',
					50: '#F2F2F2',
				}
			},
		},
	},
	plugins: [
		require('flowbite/plugin'),
		require('@tailwindcss/typography'),
	],
}
