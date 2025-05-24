import React from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <section className="mb-8 text-center">
      <div className="relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32
                       bg-gradient-to-r from-primary-500/5 via-primary-400/10 to-primary-500/5
                       blur-3xl transform -rotate-1" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32
                       bg-gradient-to-r from-primary-400/5 via-primary-500/10 to-primary-400/5
                       blur-3xl transform rotate-1" />
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-5xl font-sans font-bold mb-4 py-2"
        >
          <motion.span 
            className="inline-block bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400
                     bg-clip-text text-transparent
                     hover:from-primary-500 hover:via-primary-400 hover:to-primary-300
                     transition-all duration-300 ease-out"
            whileHover={{ 
              scale: 1.01,
              textShadow: "0 5px 15px rgba(12, 135, 235, 0.2)"
            }}
          >
            {title}
          </motion.span>
        </motion.h2>
      </div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-lg text-gray-600 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    </section>
  );
};

export default Hero;