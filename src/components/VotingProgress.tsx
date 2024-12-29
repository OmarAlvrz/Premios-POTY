import React from 'react';
import { motion } from 'framer-motion';

interface VotingProgressProps {
  totalVotes: number;
  totalCategories: number;
}

const VotingProgress: React.FC<VotingProgressProps> = ({ totalVotes, totalCategories }) => {
  const progress = (totalVotes / totalCategories) * 100;

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-between text-sm text-gray-300 mb-2">
        <span>{totalVotes} de {totalCategories} votos completados</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2">
        <motion.div
          className="bg-[#F2A366] h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default VotingProgress;