import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaPaperPlane,
  FaUser,
  FaComment
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

// Contact information
const contactInfo = [
  {
    icon: <FaPhone />,
    title: "Phone",
    details: ["+91 98765 43210", "+91 87654 32109"],
    description: "Call us during business hours"
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    details: ["info@padmavatijewellers.com", "orders@padmavatijewellers.com"],
    description: "Send us your queries anytime"
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    details: ["123 Main Market Street", "Amalner, Maharashtra 424401"],
    description: "Visit our showroom"
  },
  {
    icon: <FaClock />,
    title: "Business Hours",
    details: ["Mon - Sat: 10:00 AM - 8:00 PM", "Sunday: 11:00 AM - 6:00 PM"],
    description: "We're here to serve you"
  }
];

// Social links
const socialLinks = [
  {
    icon: <FaWhatsapp />,
    name: "WhatsApp",
    url: "https://wa.me/919876543210",
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    icon: <FaInstagram />,
    name: "Instagram",
    url: "https://instagram.com/padmavatijewellers",
    color: "bg-pink-500 hover:bg-pink-600"
  },
  {
    icon: <FaFacebook />,
    name: "Facebook",
    url: "https://facebook.com/padmavatijewellers",
    color: "bg-blue-500 hover:bg-blue-600"
  }
];

// Contact Form Component
const ContactForm = () => {
  const { isDark } = useThemeStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <motion.form
      variants={scaleIn}
      onSubmit={handleSubmit}
      className={`
        p-8 rounded-3xl shadow-luxury
        ${isDark ? 'bg-dark-bg-secondary' : 'bg-white'}
      `}
    >
      <h3 className={`
        font-playfair text-2xl font-bold mb-6
        ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
      `}>
        Send us a Message
      </h3>
      
      <div className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <FaUser className={`
              absolute left-4 top-4
              ${isDark ? 'text-dark-text-muted' : 'text-luxury-charcoal/50'}
            `} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className={`
                w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300
                ${isDark
                  ? 'bg-dark-bg border-dark-bg-tertiary text-dark-text focus:border-luxury-gold'
                  : 'bg-luxury-cream border-luxury-gold/20 text-luxury-charcoal focus:border-luxury-gold'
                }
                focus:outline-none focus:ring-2 focus:ring-luxury-gold/20
              `}
            />
          </div>
          
          <div className="relative">
            <FaEnvelope className={`
              absolute left-4 top-4
              ${isDark ? 'text-dark-text-muted' : 'text-luxury-charcoal/50'}
            `} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className={`
                w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300
                ${isDark
                  ? 'bg-dark-bg border-dark-bg-tertiary text-dark-text focus:border-luxury-gold'
                  : 'bg-luxury-cream border-luxury-gold/20 text-luxury-charcoal focus:border-luxury-gold'
                }
                focus:outline-none focus:ring-2 focus:ring-luxury-gold/20
              `}
            />
          </div>
        </div>

        {/* Phone and Subject Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <FaPhone className={`
              absolute left-4 top-4
              ${isDark ? 'text-dark-text-muted' : 'text-luxury-charcoal/50'}
            `} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              className={`
                w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300
                ${isDark
                  ? 'bg-dark-bg border-dark-bg-tertiary text-dark-text focus:border-luxury-gold'
                  : 'bg-luxury-cream border-luxury-gold/20 text-luxury-charcoal focus:border-luxury-gold'
                }
                focus:outline-none focus:ring-2 focus:ring-luxury-gold/20
              `}
            />
          </div>
          
          <div>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={`
                w-full px-4 py-4 rounded-2xl border-2 transition-all duration-300
                ${isDark
                  ? 'bg-dark-bg border-dark-bg-tertiary text-dark-text focus:border-luxury-gold'
                  : 'bg-luxury-cream border-luxury-gold/20 text-luxury-charcoal focus:border-luxury-gold'
                }
                focus:outline-none focus:ring-2 focus:ring-luxury-gold/20
              `}
            >
              <option value="">Select Subject</option>
              <option value="general">General Inquiry</option>
              <option value="custom">Custom Design</option>
              <option value="appointment">Appointment</option>
              <option value="repair">Repair Services</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <FaComment className={`
            absolute left-4 top-4
            ${isDark ? 'text-dark-text-muted' : 'text-luxury-charcoal/50'}
          `} />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={6}
            required
            className={`
              w-full pl-12 pr-4 py-4 rounded-2xl border-2 transition-all duration-300 resize-none
              ${isDark
                ? 'bg-dark-bg border-dark-bg-tertiary text-dark-text focus:border-luxury-gold'
                : 'bg-luxury-cream border-luxury-gold/20 text-luxury-charcoal focus:border-luxury-gold'
              }
              focus:outline-none focus:ring-2 focus:ring-luxury-gold/20
            `}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full py-4 bg-gradient-gold text-white font-semibold rounded-2xl
            hover:shadow-gold-lg transition-all duration-300 flex items-center justify-center space-x-2
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaPaperPlane />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
};

// Google Map Component
const GoogleMap = () => {
  const { isDark } = useThemeStore();
  
  return (
    <motion.div
      variants={scaleIn}
      className={`
        h-96 rounded-3xl overflow-hidden shadow-luxury
        ${isDark ? 'bg-dark-bg-secondary' : 'bg-white'}
      `}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.123456789!2d75.0600000!3d21.0400000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAmalner%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0, filter: isDark ? 'invert(90%) hue-rotate(180deg)' : 'none' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Padmavati Jewellers Location"
      />
    </motion.div>
  );
};

// Main Contact Component
const Contact = () => {
  const { isDark } = useThemeStore();

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
          className="text-center mb-20"
        >
          <h1 className={`
            font-playfair text-5xl md:text-6xl font-bold mb-6
            ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
          `}>
            Get in Touch
          </h1>
          <p className={`
            font-inter text-xl max-w-3xl mx-auto leading-relaxed
            ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
          `}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Information Cards */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`
                  text-center p-8 rounded-3xl transition-all duration-500
                  ${isDark ? 'bg-dark-bg-secondary hover:bg-dark-bg-tertiary' : 'bg-white hover:bg-luxury-cream'}
                  shadow-luxury hover:shadow-luxury-lg
                `}
              >
                <div className="text-luxury-gold text-4xl mb-6 flex justify-center">
                  {info.icon}
                </div>
                <h3 className={`
                  font-playfair text-xl font-bold mb-4
                  ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
                `}>
                  {info.title}
                </h3>
                <div className="space-y-2 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className={`
                      font-inter font-medium
                      ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
                    `}>
                      {detail}
                    </p>
                  ))}
                </div>
                <p className={`
                  font-inter text-sm
                  ${isDark ? 'text-dark-text-muted' : 'text-luxury-charcoal/60'}
                `}>
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form and Map */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactForm />
            
            {/* Map */}
            <GoogleMap />
          </div>
        </motion.section>

        {/* Social Media Links */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className={`
            font-playfair text-3xl font-bold mb-8
            ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
          `}>
            Connect with Us
          </h2>
          <p className={`
            font-inter text-lg mb-12 max-w-2xl mx-auto
            ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
          `}>
            Follow us on social media for the latest updates and stunning jewelry showcases
          </p>
          
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl
                  transition-all duration-300 shadow-lg hover:shadow-xl
                  ${social.color}
                `}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Emergency Contact */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className={`
            text-center p-12 rounded-3xl
            ${isDark ? 'bg-dark-bg-secondary' : 'bg-luxury-gold/5'}
            shadow-luxury
          `}>
            <h3 className={`
              font-playfair text-2xl font-bold mb-4
              ${isDark ? 'text-dark-text' : 'text-luxury-charcoal'}
            `}>
              Need Immediate Assistance?
            </h3>
            <p className={`
              font-inter text-lg mb-6
              ${isDark ? 'text-dark-text-secondary' : 'text-luxury-charcoal/80'}
            `}>
              For urgent inquiries or immediate support, contact us directly
            </p>
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-gold text-white font-semibold rounded-full shadow-gold hover:shadow-gold-lg transition-all duration-300"
            >
              <FaPhone />
              <span>Call Now: +91 98765 43210</span>
            </motion.a>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Contact;
