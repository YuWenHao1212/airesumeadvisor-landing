/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary Blue (aligned with Bubble App)
        primary: {
          DEFAULT: '#0183FF',
          hover: '#0170E0',
          light: '#E2F1FF',
          selected: '#EBF5FF',
        },
        // Text colors
        text: {
          primary: '#1D2125',
          body: '#6A6C6E',
          caption: '#8A8C8E',
          placeholder: '#9CA3AF',
        },
        // Background colors
        surface: '#E5E5E5',
        background: '#F5F5F5',
        // Semantic colors
        success: '#38A169',
        alert: '#F59E0B',
        destructive: '#E53E3E',
      },
      fontFamily: {
        display: [
          'Cabinet Grotesk',
          'Plus Jakarta Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(180deg, #FFFFFF 0%, #EBF5FF 100%)',
        'gradient-cta': 'linear-gradient(135deg, #0183FF 0%, #0170E0 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1D2125 0%, #2D3748 100%)',
      },
      boxShadow: {
        'primary': '0 4px 14px 0 rgb(1 131 255 / 0.25)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'card-hover': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
