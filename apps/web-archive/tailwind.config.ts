import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#13212f',
        clay: '#f6efe5',
        ember: '#c96a3c',
        moss: '#6d8d73',
        mist: '#edf4f7',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(19, 33, 47, 0.08)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(19, 33, 47, 0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
};

export default config;
