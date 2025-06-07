/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Modern Luxury Color System
        luxury: {
          // Primary Gold Palette
          gold: '#C9A961',        // Softer, more sophisticated gold
          'gold-light': '#E8D4A0', // Warm champagne
          'gold-dark': '#A8904C',  // Deep antique gold
          'gold-bright': '#F4E4BC', // Light cream gold
          'gold-accent': '#D4B56A', // Medium gold for accents
          
          // Neutral Palette
          cream: '#FAF8F5',        // Warm white
          'cream-light': '#FEFCFA', // Pure warm white
          'cream-dark': '#F5F2EE',  // Soft beige
          
          // Charcoal Palette
          charcoal: '#2A2724',     // Warm dark brown
          'charcoal-light': '#3D3832', // Medium warm brown
          'charcoal-dark': '#1A1815',  // Deep chocolate
          
          // Accent Colors
          'rose-gold': '#E8C4A0',  // Warm rose gold
          'platinum': '#E8E6E3',   // Cool silver
          'copper': '#D49B7A',     // Warm copper accent
        },
        
        // Dark Theme Colors
        dark: {
          bg: '#0F0E0D',           // Deep warm black
          'bg-secondary': '#1A1816', // Dark warm brown
          'bg-tertiary': '#252219',  // Medium dark brown
          'bg-accent': '#2F2B24',    // Lighter dark brown
          text: '#F5F3F0',         // Warm white text
          'text-secondary': '#D0CCC7', // Light warm gray
          'text-muted': '#9A9590',   // Medium warm gray
          'text-accent': '#C9A961',  // Gold accent text
        },
        
        // Gradient Colors
        gradient: {
          'primary': ['#C9A961', '#E8D4A0'],
          'secondary': ['#E8C4A0', '#F4E4BC'],
          'dark': ['#1A1815', '#2A2724'],
          'accent': ['#D49B7A', '#E8C4A0']
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter Variable', 'Inter', 'sans-serif'],
        'dancing': ['Dancing Script', 'cursive']
      },
      animation: {
        // Smooth modern animations
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-left': 'slideLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-right': 'slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-bounce': 'scaleBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'magnetic': 'magnetic 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        scaleBounce: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '60%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(201, 169, 97, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(201, 169, 97, 0.6)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        magnetic: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.02)' }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #C9A961 0%, #E8D4A0 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #E8C4A0 0%, #F4E4BC 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1A1815 0%, #2A2724 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'luxury-pattern': 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23C9A961" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'mesh-gradient': 'linear-gradient(135deg, #C9A961 0%, #E8D4A0 50%, #F4E4BC 100%)'
      },
      boxShadow: {
        'luxury': '0 20px 40px -12px rgba(42, 39, 36, 0.15)',
        'luxury-lg': '0 30px 60px -15px rgba(42, 39, 36, 0.2)',
        'luxury-xl': '0 40px 80px -20px rgba(42, 39, 36, 0.25)',
        'gold': '0 10px 30px rgba(201, 169, 97, 0.3)',
        'gold-lg': '0 20px 40px rgba(201, 169, 97, 0.4)',
        'gold-xl': '0 30px 60px rgba(201, 169, 97, 0.5)',
        'glow': '0 0 20px rgba(201, 169, 97, 0.4)',
        'glow-lg': '0 0 40px rgba(201, 169, 97, 0.6)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 15px 50px 0 rgba(31, 38, 135, 0.5)',
        'inner': 'inset 0 2px 4px 0 rgba(201, 169, 97, 0.2)',
        'dark': '0 20px 40px -12px rgba(0, 0, 0, 0.4)',
        'dark-lg': '0 30px 60px -15px rgba(0, 0, 0, 0.6)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem'
      },
      backdropBlur: {
        'xs': '2px',
        '4xl': '72px',
        '5xl': '96px'
      }
    },
  },
  plugins: [],
};
