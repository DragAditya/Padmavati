import React, { useState, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  FaInstagram, 
  FaWhatsapp, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaBars, 
  FaTimes,
  FaGem,
  FaRing,
  FaHeart,
  FaCrown,
  FaArrowRight,
  FaPlay,
  FaShoppingBag
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import useThemeStore from './stores/themeStore';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Enhanced Loading Screen Component
const LoadingScreen = ({ isLoading }) => {
  const { isDark } = useThemeStore();
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`
            fixed inset-0 z-50 flex items-center justify-center
            ${isDark ? 'bg-dark-bg' : 'bg-luxury-cream'}
          `}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            {/* Modern Loading Animation */}
            <motion.div className="relative mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto"
              >
                <div className="w-full h-full border-4 border-luxury-gold/20 rounded-full">
                  <div className="w-full h-full border-t-4 border-luxury-gold rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <FaCrown className="text-luxury-gold text-3xl" />
              </motion.div>
            </motion.div>
            
            <motion.h2 
              className={`
                font-playfair text-3xl font-bold text-luxury-gold mb-3
              `}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Padmavati Jewellers
            </motion.h2>
            <motion.p 
              className={`
                font-inter
                ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
              `}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Crafting Excellence Since Generations
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Header Component
const Header = () => {
  const { isDark } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ to, children, onClick }) => (
    <Link 
      to={to} 
      onClick={onClick}
      className={`
        font-inter font-medium transition-all duration-300 relative group py-2
        ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
      `}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-500
        ${scrolled || isDark
          ? isDark 
            ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-luxury-gold/10 shadow-dark' 
            : 'bg-luxury-cream/90 backdrop-blur-xl border-b border-luxury-gold/10 shadow-luxury'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <FaCrown className="text-luxury-gold text-2xl" />
              <motion.div
                className="absolute inset-0 bg-luxury-gold rounded-full opacity-0 group-hover:opacity-20"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            <span className={`
              font-playfair text-2xl font-bold transition-colors duration-300
              ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
            `}>
              Padmavati Jewellers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className={`
                w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300
                ${isDark 
                  ? 'text-dark-text hover:bg-dark-bg-tertiary' 
                  : 'text-luxury-charcoal hover:bg-luxury-gold/10'
                }
              `}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`
                md:hidden py-6 border-t overflow-hidden
                ${isDark ? 'border-luxury-gold/10' : 'border-luxury-gold/10'}
              `}
            >
              <div className="flex flex-col space-y-4">
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// Modern Button Component
const ModernButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  href, 
  className = '',
  icon,
  ...props 
}) => {
  const navigate = useNavigate();
  
  const handleClick = useCallback(() => {
    if (href) {
      navigate(href);
    } else if (onClick) {
      onClick();
    }
  }, [href, onClick, navigate]);

  const baseClasses = `
    relative group inline-flex items-center justify-center font-inter font-semibold rounded-full 
    transition-all duration-300 ease-out overflow-hidden
  `;
  
  const variants = {
    primary: `
      bg-gradient-primary text-white shadow-gold hover:shadow-gold-lg 
      hover:scale-105 active:scale-95
    `,
    secondary: `
      border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold 
      hover:text-white hover:scale-105 active:scale-95
    `,
    ghost: `
      bg-transparent text-luxury-gold hover:bg-luxury-gold/10 
      hover:scale-105 active:scale-95
    `
  };
  
  const sizes = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg'
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      
      <span className="relative flex items-center space-x-2">
        {children}
        {icon && <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>}
      </span>
    </motion.button>
  );
};

// Enhanced Hero Section
const HeroSection = () => {
  const { isDark } = useThemeStore();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section 
      ref={ref}
      className={`
        relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500
        ${isDark 
          ? 'bg-gradient-to-br from-dark-bg via-dark-bg-secondary to-dark-bg-tertiary' 
          : 'bg-gradient-to-br from-luxury-cream via-luxury-cream-light to-luxury-gold-bright'
        }
      `}
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Mesh Gradient */}
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-luxury-gold"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 6 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6"
            >
              <span className={`
                inline-block px-4 py-2 rounded-full text-sm font-medium mb-4
                ${isDark 
                  ? 'bg-dark-bg-tertiary text-luxury-gold border border-luxury-gold/20' 
                  : 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20'
                }
              `}>
                ✨ Premium Jewelry Collection
              </span>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className={`
                font-playfair text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6
                ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
              `}
            >
              Exquisite
              <motion.span 
                className="block bg-gradient-to-r from-luxury-gold to-luxury-gold-accent bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                Craftsmanship
              </motion.span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className={`
                font-inter text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl
                ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
              `}
            >
              Discover timeless elegance with our handcrafted jewelry collection, 
              where tradition meets contemporary design.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <ModernButton 
                variant="primary" 
                size="lg"
                href="/gallery"
                icon={<FaArrowRight />}
              >
                Explore Collection
              </ModernButton>
              <ModernButton 
                variant="secondary" 
                size="lg"
                href="/contact"
                icon={<FaHeart />}
              >
                Custom Design
              </ModernButton>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
            >
              {[
                { number: "50+", label: "Years Legacy" },
                { number: "10K+", label: "Happy Clients" },
                { number: "500+", label: "Unique Designs" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-luxury-gold">{stat.number}</div>
                  <div className={`
                    text-sm font-medium
                    ${isDark ? 'text-dark-text-muted' : 'text-luxury-charcoal/60'}
                  `}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Right Content */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-6xl overflow-hidden shadow-luxury-xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"
                  alt="Luxury Jewelry Collection"
                  className="w-full h-96 lg:h-[600px] object-cover"
                />
                
                {/* Modern Overlay */}
                <div className={`
                  absolute inset-0 
                  ${isDark 
                    ? 'bg-gradient-to-t from-dark-bg/60 to-transparent' 
                    : 'bg-gradient-to-t from-luxury-charcoal/30 to-transparent'
                  }
                `} />
                
                {/* Play Button for Virtual Tour */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-gold/80 transition-colors duration-300"
                  >
                    <FaPlay className="text-2xl ml-1" />
                  </motion.button>
                </motion.div>
              </motion.div>
              
              {/* Floating Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: -30 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
                className="absolute -bottom-8 -left-8 hidden lg:block"
              >
                <div className={`
                  backdrop-blur-xl rounded-4xl p-6 border
                  ${isDark 
                    ? 'bg-dark-bg-secondary/80 border-luxury-gold/20' 
                    : 'bg-white/80 border-white/20'
                  }
                  shadow-luxury-lg
                `}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center">
                      <FaCrown className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className={`
                        font-playfair text-lg font-bold
                        ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
                      `}>
                        Heritage Collection
                      </h3>
                      <p className={`
                        font-inter text-sm
                        ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
                      `}>
                        Timeless pieces crafted with precision
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-8 -right-8 w-20 h-20 border-4 border-luxury-gold border-dashed rounded-full opacity-40"
              />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 w-16 h-16 bg-luxury-gold rounded-full opacity-60"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Featured Collections
const FeaturedCollections = memo(() => {
  const { isDark } = useThemeStore();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const collections = [
    {
      id: 1,
      title: "Gold Rings",
      image: "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8",
      icon: <FaRing />,
      description: "Elegant gold rings crafted with precision",
      price: "₹35,000+",
      items: "120+ Designs"
    },
    {
      id: 2,
      title: "Necklaces",
      image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
      icon: <FaGem />,
      description: "Stunning necklaces for every occasion",
      price: "₹65,000+",
      items: "80+ Designs"
    },
    {
      id: 3,
      title: "Bridal Collection",
      image: "https://images.pexels.com/photos/32455915/pexels-photo-32455915.png",
      icon: <FaHeart />,
      description: "Traditional bridal jewelry sets",
      price: "₹2,50,000+",
      items: "50+ Sets"
    },
    {
      id: 4,
      title: "Ring Sets",
      image: "https://images.unsplash.com/photo-1684616289806-caa847f47f0e",
      icon: <FaCrown />,
      description: "Complete ring collections",
      price: "₹1,80,000+",
      items: "30+ Collections"
    }
  ];

  return (
    <section 
      ref={ref}
      className={`
        py-32 transition-colors duration-500
        ${isDark ? 'bg-dark-bg' : 'bg-luxury-cream-light'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6"
          >
            <span className={`
              inline-block px-4 py-2 rounded-full text-sm font-medium
              ${isDark 
                ? 'bg-dark-bg-tertiary text-luxury-gold border border-luxury-gold/20' 
                : 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20'
              }
            `}>
              Our Collections
            </span>
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className={`
              font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6
              ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
            `}
          >
            Featured Collections
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`
              font-inter text-xl leading-relaxed max-w-3xl mx-auto
              ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
            `}
          >
            Discover our handpicked selection of exquisite jewelry pieces, 
            each telling a unique story of craftsmanship and elegance.
          </motion.p>
        </motion.div>

        {/* Collections Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              variants={scaleIn}
              whileHover={{ y: -20, scale: 1.03 }}
              className="group cursor-pointer"
            >
              <div className={`
                relative overflow-hidden rounded-6xl transition-all duration-700
                ${isDark 
                  ? 'bg-dark-bg-secondary shadow-dark hover:shadow-dark-lg' 
                  : 'bg-white shadow-luxury hover:shadow-luxury-xl'
                }
              `}>
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square">
                  <motion.img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    loading="lazy"
                  />
                  
                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Price Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 bg-luxury-gold text-white px-3 py-2 rounded-full text-sm font-bold shadow-gold"
                  >
                    {collection.price}
                  </motion.div>

                  {/* Items Count */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className={`
                      absolute top-4 left-4 px-3 py-2 rounded-full text-xs font-medium
                      ${isDark ? 'bg-dark-bg/80 text-dark-text' : 'bg-white/80 text-luxury-charcoal'}
                      backdrop-blur-md
                    `}
                  >
                    {collection.items}
                  </motion.div>

                  {/* Center Action Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ModernButton 
                      variant="primary" 
                      size="sm"
                      href="/gallery"
                      icon={<FaShoppingBag />}
                    >
                      View Collection
                    </ModernButton>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-luxury-gold text-2xl">{collection.icon}</span>
                    <h3 className={`
                      font-playfair text-xl font-bold
                      ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
                    `}>
                      {collection.title}
                    </h3>
                  </div>
                  <p className={`
                    font-inter leading-relaxed mb-6
                    ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
                  `}>
                    {collection.description}
                  </p>
                  
                  {/* Explore Link */}
                  <motion.div
                    className="flex items-center text-luxury-gold font-medium cursor-pointer group-hover:translate-x-2 transition-transform duration-300"
                  >
                    <span className="mr-2">Explore More</span>
                    <FaArrowRight className="text-sm" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <ModernButton 
            variant="primary" 
            size="lg"
            href="/gallery"
            icon={<FaArrowRight />}
          >
            View All Collections
          </ModernButton>
        </motion.div>
      </div>
    </section>
  );
});

// Enhanced Footer
const Footer = () => {
  const { isDark } = useThemeStore();

  const socialLinks = [
    { icon: <FaInstagram />, href: "https://instagram.com/padmavatijewellers", label: "Instagram" },
    { icon: <FaWhatsapp />, href: "https://wa.me/919876543210", label: "WhatsApp" },
  ];

  return (
    <footer className={`
      py-20 transition-colors duration-500
      ${isDark ? 'bg-dark-bg-tertiary' : 'bg-luxury-charcoal'}
      text-white
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaCrown className="text-luxury-gold text-3xl" />
              </motion.div>
              <span className="font-playfair text-3xl font-bold">
                Padmavati Jewellers
              </span>
            </Link>
            <p className="font-inter text-lg leading-relaxed text-white/80 mb-6 max-w-md">
              Crafting exquisite jewelry for generations. Our legacy of excellence 
              continues with each handcrafted piece, bringing dreams to life.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center hover:bg-luxury-gold-dark transition-colors duration-300 shadow-lg hover:shadow-gold"
                  aria-label={social.label}
                >
                  <span className="text-white text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-xl font-bold mb-6">Quick Links</h3>
            <div className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link, index) => (
                <motion.div key={index} whileHover={{ x: 5 }}>
                  <Link 
                    to={link.href}
                    className="font-inter text-white/80 hover:text-luxury-gold transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="font-playfair text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <motion.div 
                className="flex items-start space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FaMapMarkerAlt className="text-luxury-gold text-lg mt-1 group-hover:scale-110 transition-transform" />
                <span className="font-inter text-white/80">
                  123 Main Market Street<br />
                  Amalner, Maharashtra 424401
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <FaPhone className="text-luxury-gold group-hover:scale-110 transition-transform" />
                <span className="font-inter text-white/80">+91 98765 43210</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="font-inter text-white/60 text-center md:text-left">
            © 2025 Padmavati Jewellers. All rights reserved.
          </p>
          <p className="font-inter text-white/60 text-center md:text-right mt-4 md:mt-0">
            Crafted with ❤️ for jewelry lovers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

// Home Page Component
const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <FeaturedCollections />
    </div>
  );
};

// Main App Component with Router Context
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDark, setTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme
    if (typeof isDark === 'undefined') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemPrefersDark);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDark, setTheme]);

  return (
    <div className={`App transition-colors duration-500 ${isDark ? 'dark' : ''}`}>
      <CustomCursor />
      <LoadingScreen isLoading={isLoading} />
      
      <Header />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;