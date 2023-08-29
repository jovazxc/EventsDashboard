import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modals/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['greycliff-cf', "Open Sans", "sans-serif"]
    },
    extend: {
      colors: {
        palette1: '#1A1B1E',
        palette2: '#141517',
        palette3: '#127BAD',
        palette4: '#909286',
        palette5: '#D21E2B'
      }
    }
  },
  plugins: [],
}
export default config
