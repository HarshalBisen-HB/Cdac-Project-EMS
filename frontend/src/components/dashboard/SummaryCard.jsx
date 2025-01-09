import React from 'react';

const SummaryCard = ({ icon, text, number, color, growth }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-[#1e2530]/80 backdrop-blur-sm border border-gray-700/50 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex items-stretch">
        <div className={`${color} w-20 flex items-center justify-center text-white relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            {icon}
          </div>
        </div>

        <div className="p-6 flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{text}</p>
              <p className="text-2xl text-white font-bold">{number}</p>
            </div>
          </div>
          
          {growth && (
            <div className="mt-4 text-sm text-gray-400 flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              {growth}
            </div>
          )}
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
    </div>
  );
};

export default SummaryCard;