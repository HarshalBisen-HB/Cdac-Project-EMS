import React from 'react';
import { motion } from 'framer-motion';

const SummaryCard = ({ icon, text, number, color, growth }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-[#2c3e50] to-[#34495e] border border-gray-700/30"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10 flex items-center p-6">
        <div className={`${color} w-24 h-24 flex items-center justify-center rounded-xl text-white shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-6`}>
          {icon}
        </div>
        
        <div className="ml-6 flex-grow">
          <p className="text-gray-300 text-sm uppercase tracking-wider mb-2">{text}</p>
          <p className="text-3xl text-white font-extrabold tracking-tight">{number}</p>
          
          {growth && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 flex items-center text-sm text-gray-400"
            >
              <span className="w-3 h-3 mr-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></span>
              {growth}
            </motion.div>
          )}
        </div>
      </div>
      
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-transparent"
      />
    </motion.div>
  );
};

export default SummaryCard;