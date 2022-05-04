module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    colors: {
      'bg': {
        DEFAULT: '#282828',
        '50': '#848484',
        '100': '#7A7A7A',
        '200': '#656565',
        '300': '#515151',
        '400': '#3C3C3C',
        '500': '#282828',
        '600': '#0C0C0C',
        '700': '#000000',
        '800': '#000000',
        '900': '#000000'
      },
      'header': '#fe8019',
      'list': '#458588'
    },
    fontFamily: {
      'sans': 'Fantasque Sans Mono'
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}
