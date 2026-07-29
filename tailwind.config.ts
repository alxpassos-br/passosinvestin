// tailwind.config.ts
import type { Config } from 'tailwindcss'
import { designTokens } from './design-system/tokens'

const config: Config = {
  content: [
    './presentation/**/*.{ts,tsx}',
    './shared/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: designTokens.colors.primary,
        gold: designTokens.colors.gold,
        neutral: designTokens.colors.neutral,
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...designTokens.typography.fontFamily.sans],
        display: ['var(--font-cal-sans)', ...designTokens.typography.fontFamily.display],
        mono: designTokens.typography.fontFamily.mono,
      },
      fontSize: designTokens.typography.fontSize,
      fontWeight: designTokens.typography.fontWeight,
      spacing: designTokens.spacing,
      borderRadius: designTokens.radius,
      boxShadow: {
        ...designTokens.shadows,
      },
      transitionDuration: designTokens.transitions.duration,
      transitionTimingFunction: {
        ...designTokens.transitions.easing,
      },
      zIndex: designTokens.zIndex,
      // Animações personalizadas
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.6)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

export default config
