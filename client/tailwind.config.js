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
					"url('https://media.istockphoto.com/id/524804954/video/death-valley-milky-way-time-lapse-4k.jpg?s=640x640&k=20&c=OZPfQqytDwjg_P93L7vYUmfc0W6qBoTH8GtMvMx9ODc=')",
			}),
		},
	},
	plugins: [],
};
