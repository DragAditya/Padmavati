import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaTimes, FaSearch, FaFilter, FaExpandArrowsAlt, FaHeart, FaShare } from 'react-icons/fa';
import useThemeStore from '../stores/themeStore';

// Gallery data with categories
const galleryData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1606623546924-a4f3ae5ea3e8",
    title: "Elegant Gold Ring",
    category: "rings",
    price: "₹45,000",
    description: "Handcrafted 22K gold ring with intricate detailing"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1588444650733-d0767b753fc8",
    title: "Diamond Stud Earrings",
    category: "earrings",
    price: "₹85,000",
    description: "Premium diamond halo earrings in 18K white gold"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1611107683227-e9060eccd846",
    title: "Gold Chain Necklace",
    category: "necklaces",
    price: "₹65,000",
    description: "Classic gold chain with contemporary design"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/32455915/pexels-photo-32455915.png",
    title: "Bridal Jewelry Set",
    category: "bridal",
    price: "₹2,50,000",
    description: "Complete traditional bridal collection"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1741071520895-47d81779c11e",
    title: "Gold Bangles",
    category: "bracelets",
    price: "₹55,000",
    description: "Set of elegant gold bangles with traditional patterns"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d",
    title: "Diamond Pendant",
    category: "necklaces",
    price: "₹75,000",
    description: "Heart-shaped diamond pendant in platinum"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1600143674013-a690b5d25104",
    title: "Luxury Diamond Ring",
    category: "rings",
    price: "₹1,25,000",
    description: "Solitaire diamond ring with brilliant cut"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1611409776165-6b37cd22fd91",
    title: "Designer Gold Ring",
    category: "rings",
    price: "₹35,000",
    description: "Contemporary designer gold ring"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1650455221359-3aebf920bcc5",
    title: "Gold Collection",
    category: "collections",
    price: "₹3,50,000",
    description: "Premium gold jewelry collection set"
  },
  {
    id: 10,
    image: "https://images.pexels.com/photos/32450646/pexels-photo-32450646.jpeg",
    title: "Diamond Studs",
    category: "earrings",
    price: "₹95,000",
    description: "Classic diamond stud earrings"
  },
  {
    id: 11,
    image: "https://images.pexels.com/photos/8182311/pexels-photo-8182311.jpeg",
    title: "Delicate Bracelets",
    category: "bracelets",
    price: "₹25,000",
    description: "Set of delicate gold bracelets"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1684616289806-caa847f47f0e",
    title: "Ring Collection",
    category: "rings",
    price: "₹1,80,000",
    description: "Assorted luxury ring collection"
  }
];

const categories = [
  { id: 'all', name: 'All Jewelry', count: galleryData.length },
  { id: 'rings', name: 'Rings', count: galleryData.filter(item => item.category === 'rings').length },
  { id: 'necklaces', name: 'Necklaces', count: galleryData.filter(item => item.category === 'necklaces').length },
  { id: 'earrings', name: 'Earrings', count: galleryData.filter(item => item.category === 'earrings').length },
  { id: 'bracelets', name: 'Bracelets', count: galleryData.filter(item => item.category === 'bracelets').length },
  { id: 'bridal', name: 'Bridal', count: galleryData.filter(item => item.category === 'bridal').length },
  { id: 'collections', name: 'Collections', count: galleryData.filter(item => item.category === 'collections').length }
];

// Gallery Item Component
const GalleryItem = memo(({ item, onImageClick, index }) => {
  const { isDark } = useThemeStore();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={() => onImageClick(item)}
    >
      <div className={`
        relative overflow-hidden rounded-3xl 
        ${isDark ? 'bg-dark-bg-secondary' : 'bg-white'} 
        shadow-luxury group-hover:shadow-luxury-xl transition-all duration-500
      `}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-gold/80 transition-colors"
            >
              <FaHeart size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-gold/80 transition-colors"
            >
              <FaShare size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-luxury-gold/80 transition-colors"
            >
              <FaExpandArrowsAlt size={16} />
            </motion.button>
          </div>

          {/* Price Tag */}
          <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
            <div className="bg-luxury-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
              {item.price}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`
            font-playfair text-xl font-bold mb-2
            ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
          `}>
            {item.title}
          </h3>
          <p className={`
            font-inter text-sm leading-relaxed
            ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/70'}
          `}>
            {item.description}
          </p>
          
          {/* Category Badge */}
          <div className="mt-4">
            <span className={`
              inline-block px-3 py-1 rounded-full text-xs font-medium capitalize
              ${isDark 
                ? 'bg-dark-bg-tertiary text-luxury-gold border border-luxury-gold/20' 
                : 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/20'
              }
            `}>
              {item.category}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Lightbox Modal Component
const Lightbox = ({ item, isOpen, onClose }) => {
  const { isDark } = useThemeStore();
  
  if (!isOpen || !item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
        
        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className={`
            relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl
            ${isDark ? 'bg-dark-bg-secondary' : 'bg-white'}
            shadow-luxury-xl
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            <FaTimes size={20} />
          </button>
          
          {/* Image */}
          <div className="aspect-video overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className={`
                  font-playfair text-3xl font-bold mb-4
                  ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
                `}>
                  {item.title}
                </h2>
                <p className={`
                  font-inter text-lg leading-relaxed mb-6
                  ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/70'}
                `}>
                  {item.description}
                </p>
                <div className="text-2xl font-bold text-luxury-gold mb-6">
                  {item.price}
                </div>
              </div>
              
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-gold text-white font-semibold rounded-2xl hover:shadow-gold-lg transition-all duration-300"
                >
                  Inquire Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-4 border-2 border-luxury-gold font-semibold rounded-2xl transition-all duration-300
                    ${isDark
                      ? 'text-luxury-gold hover:bg-luxury-gold hover:text-dark-bg'
                      : 'text-luxury-gold hover:bg-luxury-gold hover:text-white'
                    }
                  `}
                >
                  Custom Design
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Main Gallery Component
const Gallery = () => {
  const { isDark } = useThemeStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = galleryData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleImageClick = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return (
    <div className={`
      min-h-screen py-24 transition-colors duration-300
      ${isDark ? 'bg-dark-bg' : 'bg-luxury-cream-light'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className={`
            font-playfair text-5xl md:text-6xl font-bold mb-6
            ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
          `}>
            Jewelry Gallery
          </h1>
          <p className={`
            font-inter text-xl max-w-3xl mx-auto leading-relaxed
            ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
          `}>
            Explore our exquisite collection of handcrafted jewelry, where each piece tells a story of tradition and elegance.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className={`
                absolute left-4 top-1/2 transform -translate-y-1/2
                ${isDark ? 'text-dark-text-muted' : 'text-luxury-charcoal/50'}
              `} />
              <input
                type="text"
                placeholder="Search jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`
                  w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300
                  ${isDark
                    ? 'bg-dark-bg-secondary border-dark-bg-tertiary text-dark-text focus:border-luxury-gold'
                    : 'bg-white border-luxury-gold/20 text-luxury-charcoal focus:border-luxury-gold'
                  }
                  focus:outline-none focus:ring-2 focus:ring-luxury-gold/20
                `}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`
                flex items-center space-x-2 px-6 py-4 rounded-2xl border-2 transition-all duration-300
                ${isDark
                  ? 'bg-dark-bg-secondary border-dark-bg-tertiary text-dark-text hover:border-luxury-gold'
                  : 'bg-white border-luxury-gold/20 text-luxury-charcoal hover:border-luxury-gold'
                }
              `}
            >
              <FaFilter />
              <span className="font-medium">Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Category Filters */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12 overflow-hidden"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-6 py-3 rounded-full font-medium transition-all duration-300
                      ${selectedCategory === category.id
                        ? 'bg-luxury-gold text-white shadow-gold'
                        : isDark
                          ? 'bg-dark-bg-secondary text-dark-text border border-dark-bg-tertiary hover:border-luxury-gold'
                          : 'bg-white text-luxury-charcoal border border-luxury-gold/20 hover:border-luxury-gold'
                      }
                    `}
                  >
                    {category.name} ({category.count})
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <GalleryItem
                key={item.id}
                item={item}
                index={index}
                onImageClick={handleImageClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <h3 className={`
              font-playfair text-2xl font-bold mb-4
              ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
            `}>
              No jewelry found
            </h3>
            <p className={`
              font-inter
              ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/70'}
            `}>
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Gallery;
