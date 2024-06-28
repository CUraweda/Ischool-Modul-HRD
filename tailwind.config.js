/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['INTER'],
			},
			colors: {
				sky: '#DBEAFF',
			},
		},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#416AC0',
					secondary: '#B8FFD5',
				},
			},
		],
	},
};
