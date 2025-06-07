import React from 'react';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import useThemeStore from '../stores/themeStore';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative w-14 h-8 rounded-full p-1 transition-all duration-300 ease-in-out
        ${isDark 
          ? 'bg-dark-bg-tertiary border-luxury-gold' 
          : 'bg-luxury-gold-light border-luxury-gold'
        } border-2
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className={`
          w-6 h-6 rounded-full flex items-center justify-center
          ${isDark ? 'bg-luxury-gold' : 'bg-white'}
        `}
        animate={{
          x: isDark ? 20 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30
        }}
      >
        <motion.div
          animate={{ 
            rotate: isDark ? 180 : 0,
            scale: isDark ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <FaMoon className="text-dark-bg text-xs" />
          ) : (
            <FaSun className="text-luxury-gold text-xs" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Background icons */}
      <motion.div
        className="absolute inset-0 flex items-center justify-between px-2"
        initial={false}
      >
        <motion.div
          animate={{ 
            opacity: !isDark ? 0.3 : 0,
            scale: !isDark ? 0.8 : 0.6
          }}
        >
          <FaSun className="text-luxury-gold text-xs" />
        </motion.div>
        <motion.div
          animate={{ 
            opacity: isDark ? 0.3 : 0,
            scale: isDark ? 0.8 : 0.6
          }}
        >
          <FaMoon className="text-luxury-gold text-xs" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
