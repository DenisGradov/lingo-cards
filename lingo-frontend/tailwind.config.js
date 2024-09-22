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
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
