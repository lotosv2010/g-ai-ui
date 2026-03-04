import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const uiPackageDistDir = path.dirname(require.resolve('@g-ai-ui/ui'))
const uiPackageDir = path.resolve(uiPackageDistDir, '..')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/**/*.{md,mdx,tsx,ts,jsx,js}',
    './docs/theme/**/*.{tsx,ts,jsx,js}',
    path.join(uiPackageDir, 'src/**/*.{tsx,ts,jsx,js,mdx}'),
    path.join(uiPackageDistDir, '**/*.{js,mjs}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
