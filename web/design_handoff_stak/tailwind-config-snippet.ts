// tailwind.config.ts — snippet pronto. Mescle com sua config existente.
// Requer: @import url google fonts no globals.css, ou inclua no <head>.

import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:            '#fafaf7',
        surface:       '#ffffff',
        'surface-subtle': '#f5f3ee',
        'surface-hover': '#f0eee9',
        border:        '#e8e4dc',
        'border-strong': '#d4cfc4',
        divider:       '#eeeae2',

        text:          '#1a1816',
        'text-muted':  '#6b6862',
        'text-faint':  '#9a968e',
        'text-inverse':'#fafaf7',

        primary: {
          DEFAULT: '#c8633f',
          hover:   '#b15633',
          soft:    '#fbece4',
        },

        // Semantic tag palette
        red:    { DEFAULT: '#d05646', soft: '#fae6e1' },
        amber:  { DEFAULT: '#c98a2a', soft: '#fbf0d8' },
        green:  { DEFAULT: '#5a8a3a', soft: '#e6f0d8' },
        blue:   { DEFAULT: '#3a6a9a', soft: '#dde8f3' },
        purple: { DEFAULT: '#7a5a9a', soft: '#ebe3f3' },
        slate:  { DEFAULT: '#6b6862', soft: '#ececea' },
      },

      fontFamily: {
        sans: ['Geist', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },

      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }]
        xs:   ['11px', { lineHeight: '1.45', letterSpacing: '0',         fontWeight: '500' }],
        sm:   ['12px', { lineHeight: '1.45', letterSpacing: '-0.005em',  fontWeight: '400' }],
        base: ['13px', { lineHeight: '1.45', letterSpacing: '-0.005em',  fontWeight: '400' }],
        md:   ['14px', { lineHeight: '1.45', letterSpacing: '-0.005em',  fontWeight: '400' }],
        lg:   ['15px', { lineHeight: '1.4',  letterSpacing: '-0.01em',   fontWeight: '500' }],
        xl:   ['17px', { lineHeight: '1.2',  letterSpacing: '-0.02em',   fontWeight: '600' }],
        '2xl':['20px', { lineHeight: '1.2',  letterSpacing: '-0.02em',   fontWeight: '600' }],
        '3xl':['22px', { lineHeight: '1.2',  letterSpacing: '-0.02em',   fontWeight: '600' }],
        '4xl':['26px', { lineHeight: '1.15', letterSpacing: '-0.02em',   fontWeight: '600' }],
        '5xl':['32px', { lineHeight: '1.15', letterSpacing: '-0.02em',   fontWeight: '600' }],
        '6xl':['36px', { lineHeight: '1.05', letterSpacing: '-0.02em',   fontWeight: '600' }],
      },

      borderRadius: {
        '4':  '4px',
        '6':  '6px',
        '8':  '8px',
        '10': '10px',
        '12': '12px',
        '16': '16px',
      },

      boxShadow: {
        sm:      '0 1px 2px rgba(20,16,12,0.04), 0 0 0 1px rgba(20,16,12,0.04)',
        md:      '0 4px 12px rgba(20,16,12,0.06), 0 1px 3px rgba(20,16,12,0.04)',
        lg:      '0 24px 60px rgba(20,16,12,0.18), 0 8px 24px rgba(20,16,12,0.10)',
        card:    '0 1px 0 rgba(20,16,12,0.04), 0 1px 2px rgba(20,16,12,0.06)',
        primary: '0 1px 0 rgba(255,255,255,0.15) inset, 0 1px 2px rgba(200,99,63,0.30)',
      },

      ringColor: {
        primary: 'rgba(200,99,63,0.20)',
      },
    },
  },
  plugins: [],
} satisfies Config;
