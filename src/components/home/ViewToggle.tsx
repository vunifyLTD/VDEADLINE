import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { List, Calendar } from 'lucide-react';

const ViewToggle: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex justify-center gap-3">
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                   text-sm font-medium transition-all duration-300
                   ${location.pathname === '/' 
                     ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25' 
                     : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 shadow-sm'}`}
        >
          <List className="w-4 h-4" />
          <span>List View</span>
          {location.pathname === '/' && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      </Link>

      <Link to="/calendar">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl
                   text-sm font-medium transition-all duration-300
                   ${location.pathname === '/calendar'
                     ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                     : 'bg-white/80 text-gray-600 hover:bg-white hover:text-gray-900 shadow-sm'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Calendar View</span>
          {location.pathname === '/calendar' && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      </Link>
    </div>
  );
};

export default ViewToggle;