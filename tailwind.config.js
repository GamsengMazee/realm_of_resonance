module.exports = {
  theme: {
    extend: {
      animation: {
        'pulse-scale': 'pulseScale 2s infinite',
      },
      keyframes: {
        pulseScale: {
          '0%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.2)',  // You can adjust this scale factor as needed
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
};