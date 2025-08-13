import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  darkMode: ['class'],
  content: [
    './client/index.html',
    './client/src/**/*.{ts,tsx,js,jsx}',
    './client/components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    container: { center: true, padding: '2rem', screens: { '2xl': '1400px' } },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        
        // Sage Brand Colors (direct hex values for proper compilation)
        sage: {
          50: '#F6F7F2',
          100: '#EDEEE5',
          200: '#DBDDCC',
          300: '#C9CBB2',
          400: '#A7AB80',
          500: '#8A9A5B', // Primary sage green
          600: '#6E7B49',
          700: '#525C37',
          800: '#373D25',
          900: '#1B1E12',
        },
        forest: {
          50: '#E6F2F0',
          100: '#CCE5E0',
          200: '#99CBC1',
          300: '#66B1A2',
          400: '#339783',
          500: '#007D64',
          600: '#006450',
          700: '#004B3C',
          800: '#003228',
          900: '#052D24', // Forest accent
        },
        cream: {
          50: '#F7F5EF', // Cream background
          100: '#F3F0E8',
          200: '#E7E1D1',
          300: 'var(--cream-300)',
          400: 'var(--cream-400)',
          500: 'var(--cream-500)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: { sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans] },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
