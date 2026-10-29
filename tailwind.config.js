export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#26332e', pine: '#3a4a43', cream: '#ffffff',
        stone: '#f4f4f3', sand: '#e6e6e3', brass: '#8a5a2b', gold: '#e3c48f', lamp: '#f4c872',
      },
      fontFamily: {
        serif: ['"Geist Variable"', 'Geist', 'system-ui', 'sans-serif'],
        sans: ['"Geist Variable"', 'Geist', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
