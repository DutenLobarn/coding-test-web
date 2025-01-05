export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Include files in the "app" directory (Next.js App Router)
    './pages/**/*.{js,ts,jsx,tsx}', // Include files in the "pages" directory (if using Pages Router)
    './components/**/*.{js,ts,jsx,tsx}', // Include files in the "components" folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
