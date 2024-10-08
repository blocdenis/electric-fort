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
        dark_grey: '#3C3C3C',
        primary_green: '#9CEC25',
        secondary_green: '#69AF00',
        dark_green: '#2A4700',
        yellow: '#ffe500',
        backdrop_green: 'rgba(33, 89, 0, 0.9)',
        backdrop_black: 'rgba(17, 22, 22, 0.85)',
        backgroung: '#1e1e1e',
        error_red: '#FF0000',
      },
      screens: {
        mobile: '425px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1440px',
      },
      fontSize: {
        xs: ['12px', '1.4'],
        sm: ['14px', '1.4'],
        base: ['16px', '1.4'],
        md: ['18px', '1.4'],
        mid: ['20px', '1.4'],
        lg: ['24px', '1.4'],
        xl: ['36px', '1.4'],
        xxl: ['48px', '1.4'],
      },
    },
  },
  plugins: [],
};
export default config;
