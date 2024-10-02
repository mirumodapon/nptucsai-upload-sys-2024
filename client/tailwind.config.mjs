import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [daisyui],
  daisyui: {
    themes: false
  },
  darkMode: ['class', '[data-theme="dark"]'],
  safelist: [
    'bg-info',
    'bg-success',
    'bg-warning',
    'bg-error',
    'text-info-content',
    'text-success-content',
    'text-warning-content',
    'text-error-content'
  ]
};
