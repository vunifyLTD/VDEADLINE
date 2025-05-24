import React from 'react';
import { Globe2, Github, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-transparent">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 
                           rounded-xl blur-lg opacity-20" />
              <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                <img 
                  src="https://vunify.org/logos/VDEADLINE.png"
                  alt="VDeadline Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <h1 className="text-2xl font-sans font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary-600 to-primary-500 
                                bg-clip-text text-transparent">VDeadline</span>
                </h1>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Globe2 className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Academic Conference Deadline Tracker
                </p>
              </div>
            </div>
          </motion.div>

          {/* GitHub Link */}
          <motion.a
            href="https://github.com/vunify/vdeadline"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-gradient-to-br from-gray-900 to-gray-800 text-white
                     hover:from-gray-800 hover:to-gray-700
                     shadow-lg shadow-gray-900/25
                     transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Github className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Star on GitHub</span>
            <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/10">
              <Star className="w-3 h-3" />
              <span className="text-xs">180</span>
            </div>
          </motion.a>
        </div>
      </div>
    </header>
  );
};

export default Header;