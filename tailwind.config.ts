import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modals/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['greycliff-cf', "Open Sans", "sans-serif"]
    },
    extend: {

      colors: {
        gradient: "radial-gradient(circle at 60% 20%, rgb(48, 66, 93) 0%, rgb(2, 1, 3) 100%) fixed rgb(20, 21, 23);",
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
