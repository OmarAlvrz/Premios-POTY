import React from 'react';
import { Category } from '../types';
import VideoLink from './VideoLink';
import ImageLink from './ImageLink';

interface VotingCategoryProps {
  category: Category;
  selectedOption: string | undefined;
  onVote: (option: string) => void;
}

const VotingCategory: React.FC<VotingCategoryProps> = ({
  category,
  selectedOption,
  onVote,
}) => {
  return (
    <div className="glass rounded-lg p-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-[#F2A366] neon-glow">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.options.map((option) => (
          <div key={option} className="flex flex-col">
            <button
              onClick={() => onVote(option)}
              className={`p-4 rounded-lg transition-all ${
                selectedOption === option
                  ? 'bg-[#F2A366] text-black'
                  : 'glass hover:border-[#F2A366]/50'
              }`}
            >
              {option}
            </button>
            {category.imageLinks && category.imageLinks[option] && (
              <ImageLink 
                imageUrl={category.imageLinks[option]} 
                altText={option}
              />
            )}
            {category.videoLinks && (
              <VideoLink 
                url={category.videoLinks[option]} 
                title={option}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotingCategory;