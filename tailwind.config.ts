import type { Config } from 'tailwindcss'

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
        black: '#00000',
        grey: '#acacac',
        primary_green: '#6eb900',
        secondary_green: '#adfe35',
        yellow: '#ffe500',
      },
    },
  },
  plugins: [],
}
export default config
