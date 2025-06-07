import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaGem, 
  FaAward, 
  FaUsers, 
  FaHeart, 
  FaHandHoldingHeart,
  FaCrown,
  FaStar,
  FaHistory
} from 'react-icons/fa';
import useThemeStore from '../stores/themeStore';

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

// Timeline data
const timelineData = [
  {
    year: "1975",
    title: "Foundation",
    description: "Padmavati Jewellers was established in Amalner with a vision to create timeless jewelry pieces."
  },
  {
    year: "1985",
    title: "Traditional Expansion", 
    description: "Expanded our collection to include traditional Maharashtrian jewelry and bridal sets."
  },
  {
    year: "1995",
    title: "Craftsmanship Recognition",
    description: "Received state recognition for exceptional craftsmanship and design innovation."
  },
  {
    year: "2005",
    title: "Modern Collections",
    description: "Introduced contemporary designs while maintaining our traditional roots."
  },
  {
    year: "2015",
    title: "Digital Presence",
    description: "Embraced digital platforms to reach jewelry enthusiasts across Maharashtra."
  },
  {
    year: "2025",
    title: "Legacy Continues",
    description: "Three generations of excellence, continuing to craft jewelry that tells stories."
  }
];

// Values data
const values = [
  {
    icon: <FaGem />,
    title: "Quality Craftsmanship",
    description: "Every piece is meticulously handcrafted by skilled artisans with decades of experience."
  },
  {
    icon: <FaHeart />,
    title: "Emotional Connection",
    description: "We believe jewelry should capture emotions and create lasting memories for generations."
  },
  {
    icon: <FaAward />,
    title: "Excellence",
    description: "Committed to delivering the highest standards in design, quality, and customer service."
  },
  {
    icon: <FaUsers />,
    title: "Family Tradition",
    description: "Three generations of jewelry making expertise passed down through our family."
  }
];

// Stats data
const stats = [
  { number: "50+", label: "Years of Excellence", icon: <FaHistory /> },
  { number: "10,000+", label: "Happy Customers", icon: <FaUsers /> },
  { number: "500+", label: "Unique Designs", icon: <FaGem /> },
  { number: "25+", label: "Master Craftsmen", icon: <FaHandHoldingHeart /> }
];

// Timeline Component
const Timeline = () => {
  const { isDark } = useThemeStore();
  
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className={`
        absolute left-8 top-0 bottom-0 w-0.5 
        ${isDark ? 'bg-luxury-gold/30' : 'bg-luxury-gold/40'}
      `} />
      
      <div className="space-y-12">
        {timelineData.map((item, index) => {
          const [ref, inView] = useInView({
            threshold: 0.3,
            triggerOnce: true
          });
          
          return (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-start space-x-8"
            >
              {/* Timeline Dot */}
              <div className={`
                relative z-10 w-16 h-16 rounded-full flex items-center justify-center
                ${isDark ? 'bg-dark-bg-secondary' : 'bg-white'}
                border-4 border-luxury-gold shadow-gold
              `}>
                <span className="font-playfair font-bold text-luxury-gold">
                  {item.year.slice(-2)}
                </span>
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className={`
                  p-6 rounded-2xl 
                  ${isDark ? 'bg-dark-bg-secondary' : 'bg-white'}
                  shadow-luxury hover:shadow-luxury-lg transition-all duration-500
                `}>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-2xl font-bold text-luxury-gold">{item.year}</span>
                    <h3 className={`
                      font-playfair text-xl font-bold
                      ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
                    `}>
                      {item.title}
                    </h3>
                  </div>
                  <p className={`
                    font-inter leading-relaxed
                    ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
                  `}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Stats Section Component
const StatsSection = () => {
  const { isDark } = useThemeStore();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <motion.section
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`
        py-20 rounded-3xl
        ${isDark ? 'bg-dark-bg-secondary' : 'bg-luxury-gold/5'}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className={`
            font-playfair text-4xl md:text-5xl font-bold mb-6
            ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
          `}>
            Our Legacy in Numbers
          </h2>
          <p className={`
            font-inter text-xl max-w-2xl mx-auto
            ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
          `}>
            Half a century of excellence and countless moments of joy
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`
                text-center p-8 rounded-3xl transition-all duration-500
                ${isDark ? 'bg-dark-bg hover:bg-dark-bg-tertiary' : 'bg-white hover:bg-luxury-cream'}
                shadow-luxury hover:shadow-luxury-lg
              `}
            >
              <div className="text-luxury-gold text-4xl mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-luxury-gold mb-2">
                {stat.number}
              </div>
              <div className={`
                font-inter font-medium
                ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
              `}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Main About Component
const About = () => {
  const { isDark } = useThemeStore();

  return (
    <div className={`
      min-h-screen py-24 transition-colors duration-300
      ${isDark ? 'bg-dark-bg' : 'bg-luxury-cream-light'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-luxury-gold text-6xl"
            >
              <FaCrown />
            </motion.div>
          </div>
          
          <h1 className={`
            font-playfair text-5xl md:text-7xl font-bold mb-8
            ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
          `}>
            Our Story
          </h1>
          <p className={`
            font-inter text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed
            ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
          `}>
            For over five decades, Padmavati Jewellers has been crafting dreams into reality, 
            one exquisite piece at a time. Our journey began in the heart of Amalner, Maharashtra, 
            with a simple vision: to create jewelry that captures the essence of tradition while 
            embracing the beauty of modern design.
          </p>
        </motion.div>

        {/* Founder Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`
                font-playfair text-4xl md:text-5xl font-bold mb-8
                ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
              `}>
                Founded on
                <span className="text-luxury-gold block">Passion & Precision</span>
              </h2>
              <div className="space-y-6">
                <p className={`
                  font-inter text-lg leading-relaxed
                  ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
                `}>
                  Our founder, Late Shri Ramesh Patil, started this journey in 1975 with just a small workshop 
                  and an unwavering commitment to quality. His philosophy was simple yet profound: every piece 
                  of jewelry should tell a story and carry the emotions of its wearer.
                </p>
                <p className={`
                  font-inter text-lg leading-relaxed
                  ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
                `}>
                  Today, his legacy continues through three generations of skilled craftsmen who share the 
                  same passion for excellence. We blend traditional techniques passed down through generations 
                  with contemporary designs that resonate with modern sensibilities.
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <FaStar className="text-luxury-gold text-xl" />
                  <span className={`
                    font-inter font-medium
                    ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
                  `}>
                    "Excellence is not a skill, it's an attitude." - Our Founder's Motto
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-3xl shadow-luxury-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338"
                  alt="Heritage Craftsmanship"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/30 to-transparent" />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 right-8 w-16 h-16 bg-luxury-gold/20 backdrop-blur-md rounded-full flex items-center justify-center"
                >
                  <FaGem className="text-luxury-gold text-2xl" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-16">
            <h2 className={`
              font-playfair text-4xl md:text-5xl font-bold mb-6
              ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
            `}>
              Our Core Values
            </h2>
            <p className={`
              font-inter text-xl max-w-3xl mx-auto
              ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
            `}>
              The principles that guide every decision and every creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`
                  text-center p-8 rounded-3xl transition-all duration-500
                  ${isDark ? 'bg-dark-bg-secondary hover:bg-dark-bg-tertiary' : 'bg-white hover:bg-luxury-cream'}
                  shadow-luxury hover:shadow-luxury-lg
                `}
              >
                <div className="text-luxury-gold text-4xl mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className={`
                  font-playfair text-xl font-bold mb-4
                  ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
                `}>
                  {value.title}
                </h3>
                <p className={`
                  font-inter leading-relaxed
                  ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
                `}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <StatsSection />

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-16">
            <h2 className={`
              font-playfair text-4xl md:text-5xl font-bold mb-6
              ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
            `}>
              Our Journey Through Time
            </h2>
            <p className={`
              font-inter text-xl max-w-3xl mx-auto
              ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
            `}>
              Milestones that shaped our legacy and defined our commitment to excellence
            </p>
          </div>

          <Timeline />
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className={`
            p-12 rounded-3xl
            ${isDark ? 'bg-dark-bg-secondary' : 'bg-luxury-gold/5'}
            shadow-luxury
          `}>
            <h2 className={`
              font-playfair text-3xl md:text-4xl font-bold mb-6
              ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
            `}>
              Ready to Begin Your Journey?
            </h2>
            <p className={`
              font-inter text-lg mb-8 max-w-2xl mx-auto
              ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
            `}>
              Let us help you find the perfect piece that tells your unique story
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-gold text-white font-inter font-semibold rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300"
              >
                Explore Our Collection
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-8 py-4 border-2 border-luxury-gold font-inter font-semibold rounded-full transition-all duration-300
                  ${isDark
                    ? 'text-luxury-gold hover:bg-luxury-gold hover:text-dark-bg'
                    : 'text-luxury-gold hover:bg-luxury-gold hover:text-white'
                  }
                `}
              >
                Visit Our Store
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
