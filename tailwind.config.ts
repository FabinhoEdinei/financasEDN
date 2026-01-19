import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0a0e27',
        'cyber-dark-2': '#1a1f3a',
        'cyber-purple': '#c800ff',
        'cyber-cyan': '#00f0ff',
        'cyber-pink': '#ff00ff',
        'cyber-green': '#00ff41',
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
        'gradient-neon': 'linear-gradient(135deg, rgba(200, 0, 255, 0.1) 0%, rgba(0, 240, 255, 0.1) 100%)',
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(200, 0, 255, 0.5), 0 0 40px rgba(200, 0, 255, 0.3)',
        'neon-cyan': '0 0 20px rgba(0, 240, 255, 0.5), 0 0 40px rgba(0, 240, 255, 0.3)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)',
      },
      fontFamily: {
        'mono': ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
export default config
