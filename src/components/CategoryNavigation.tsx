import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryNavigationProps {
  currentIndex: number;
  totalCategories: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  currentIndex,
  totalCategories,
  onNavigate,
}) => {
  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => onNavigate('prev')}
        disabled={currentIndex === 0}
        className={`p-2 rounded-full ${
          currentIndex === 0 
            ? 'text-gray-500 cursor-not-allowed' 
            : 'text-[#F2A366] hover:bg-white/10'
        }`}
      >
        <ChevronLeft size={24} />
      </button>
      <span className="text-white">
        {currentIndex + 1} / {totalCategories}
      </span>
      <button
        onClick={() => onNavigate('next')}
        disabled={currentIndex === totalCategories - 1}
        className={`p-2 rounded-full ${
          currentIndex === totalCategories - 1
            ? 'text-gray-500 cursor-not-allowed'
            : 'text-[#F2A366] hover:bg-white/10'
        }`}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CategoryNavigation;