/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: ["Roboto", "sans-serif"],
			},
			backgroundImage: (theme) => ({
				"hero-pattern":
					"url('https://png.pngtree.com/illustration/20190226/ourlarge/pngtree-illustration-field-night-landscape-image_3503.jpg')",
			}),
		},
	},
	plugins: [],
};
