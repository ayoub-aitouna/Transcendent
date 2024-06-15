import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: "#FF3D00",
				secondary: {
					100: "#878787",
					200: "#444444",
					300: "#373737",
					400: "#292929",
					500: "#161616",
					600: "#0D0D0D",
					700: "#000000",
				},
			},
			screens: {
				"2xl": "1536px",
				"3xl": "1680px",
				"4xl": "2200px",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
  plugins: [],
};
export default config;
