const path = require('node:path')

const uiPackageDistDir = path.dirname(require.resolve('@g-ai-ui/ui'))
const uiPackageDir = path.resolve(uiPackageDistDir, '..')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    path.join(uiPackageDir, 'src/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(uiPackageDistDir, '**/*.{js,mjs}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
