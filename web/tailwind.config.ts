import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        dbHelvethaicaX: ['DB Helvethaica X', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
