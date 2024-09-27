module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        24: '24px',
      },
      screens: {
        'xs': '320px',
        'big': { 'raw': '(min-height: 750px)' },
        'small': { 'raw': '(max-height: 750px)' },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
