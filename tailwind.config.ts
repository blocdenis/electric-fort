import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: '#000000',
        grey: '#acacac',
        primary_green: '#9CEC25',
        secondary_green: '#69AF00',
        dark_green: '#2A4700',
        yellow: '#ffe500',
        backdrop: 'rgba(33, 89, 0, 0.9)',
      },
    },
  },
  plugins: [],
};
export default config;
