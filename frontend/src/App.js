import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
  FaCrown
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
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// Loading Screen Component
const LoadingScreen = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 bg-luxury-cream flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="font-playfair text-2xl text-luxury-gold">Padmavati Jewellers</h2>
          <p className="font-inter text-luxury-charcoal mt-2">Crafting Excellence Since Generations</p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Header Component
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

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-500
        ${scrolled || isDark
          ? isDark 
            ? 'bg-dark-bg/95 backdrop-blur-xl border-b border-luxury-gold/20' 
            : 'bg-luxury-cream-light/95 backdrop-blur-xl border-b border-luxury-gold/20'
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FaCrown className="text-luxury-gold text-2xl" />
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
            <Link 
              to="/" 
              className={`
                font-inter transition-all duration-300 relative group
                ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
              `}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              to="/gallery" 
              className={`
                font-inter transition-all duration-300 relative group
                ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
              `}
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              to="/about" 
              className={`
                font-inter transition-all duration-300 relative group
                ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
              `}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link 
              to="/contact" 
              className={`
                font-inter transition-all duration-300 relative group
                ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
              `}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                transition-colors duration-300
                ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
              `}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`
                md:hidden py-4 border-t
                ${isDark ? 'border-luxury-gold/20' : 'border-luxury-gold/20'}
              `}
            >
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`
                    font-inter transition-colors duration-300
                    ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/gallery" 
                  className={`
                    font-inter transition-colors duration-300
                    ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  to="/about" 
                  className={`
                    font-inter transition-colors duration-300
                    ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`
                    font-inter transition-colors duration-300
                    ${isDark ? 'text-dark-text hover:text-luxury-gold' : 'text-luxury-charcoal hover:text-luxury-gold'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-luxury-cream via-luxury-cream-light to-luxury-gold-light">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-luxury-pattern opacity-30" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-luxury-gold rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 w-2 h-2 bg-luxury-gold rounded-full opacity-40"
        />
        <motion.div
          animate={{ y: [-30, 30, -30] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-luxury-gold rounded-full opacity-50"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-luxury-charcoal leading-tight"
            >
              Exquisite
              <span className="text-luxury-gold block">Craftsmanship</span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="font-inter text-xl md:text-2xl text-luxury-charcoal/80 mt-6 leading-relaxed"
            >
              Discover timeless elegance with our handcrafted jewelry collection, 
              where tradition meets contemporary design.
            </motion.p>
            
            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-gold text-white font-inter font-semibold rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300"
              >
                Explore Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-luxury-gold text-luxury-gold font-inter font-semibold rounded-full hover:bg-luxury-gold hover:text-white transition-all duration-300"
              >
                Custom Design
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"
                alt="Luxury Jewelry Collection"
                className="w-full h-96 lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/30 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute bottom-8 left-8 right-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6"
                >
                  <h3 className="font-playfair text-xl font-bold text-luxury-charcoal">
                    Heritage Collection
                  </h3>
                  <p className="font-inter text-luxury-charcoal/80 mt-2">
                    Timeless pieces crafted with precision
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-12 h-12 border-4 border-luxury-gold border-dashed rounded-full opacity-60"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-luxury-gold rounded-full opacity-80"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Featured Collections Section
const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      title: "Gold Rings",
      image: "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8",
      icon: <FaRing />,
      description: "Elegant gold rings crafted with precision"
    },
    {
      id: 2,
      title: "Necklaces",
      image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
      icon: <FaGem />,
      description: "Stunning necklaces for every occasion"
    },
    {
      id: 3,
      title: "Bridal Collection",
      image: "https://images.pexels.com/photos/32455915/pexels-photo-32455915.png",
      icon: <FaHeart />,
      description: "Traditional bridal jewelry sets"
    },
    {
      id: 4,
      title: "Ring Sets",
      image: "https://images.unsplash.com/photo-1684616289806-caa847f47f0e",
      icon: <FaCrown />,
      description: "Complete ring collections"
    }
  ];

  return (
    <section className="py-24 bg-luxury-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-playfair text-4xl md:text-5xl font-bold text-luxury-charcoal"
          >
            Featured Collections
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-inter text-xl text-luxury-charcoal/80 mt-4 max-w-2xl mx-auto"
          >
            Discover our handpicked selection of exquisite jewelry pieces
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-luxury group-hover:shadow-luxury-lg transition-all duration-500">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-luxury-gold text-xl">{collection.icon}</span>
                    <h3 className="font-playfair text-xl font-bold text-white">
                      {collection.title}
                    </h3>
                  </div>
                  <p className="font-inter text-white/90 text-sm">
                    {collection.description}
                  </p>
                </div>

                {/* Card Background */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <div className="flex items-center space-x-3">
                    <span className="text-luxury-gold text-lg">{collection.icon}</span>
                    <div>
                      <h3 className="font-playfair text-lg font-bold text-luxury-charcoal">
                        {collection.title}
                      </h3>
                      <p className="font-inter text-luxury-charcoal/80 text-sm">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-luxury-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <FaCrown className="text-luxury-gold text-2xl" />
              <span className="font-playfair text-2xl font-bold">
                Padmavati Jewellers
              </span>
            </div>
            <p className="font-inter text-white/80 leading-relaxed">
              Crafting exquisite jewelry for generations. Our legacy of excellence 
              continues with each handcrafted piece.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-luxury-gold" />
                <span className="font-inter text-white/80">Amalner, Maharashtra</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-luxury-gold" />
                <span className="font-inter text-white/80">+91 98765 43210</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center hover:bg-luxury-gold-dark transition-colors"
              >
                <FaInstagram className="text-white text-xl" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center hover:bg-luxury-gold-dark transition-colors"
              >
                <FaWhatsapp className="text-white text-xl" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="font-inter text-white/60">
            © 2025 Padmavati Jewellers. All rights reserved.
          </p>
        </div>
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

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <LoadingScreen isLoading={isLoading} />
      
      <BrowserRouter>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<div className="min-h-screen flex items-center justify-center"><h1 className="font-playfair text-4xl text-luxury-gold">Gallery Coming Soon</h1></div>} />
            <Route path="/about" element={<div className="min-h-screen flex items-center justify-center"><h1 className="font-playfair text-4xl text-luxury-gold">About Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="font-playfair text-4xl text-luxury-gold">Contact Coming Soon</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;