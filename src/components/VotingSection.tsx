import React from 'react';
import VotingCategory from './VotingCategory';
import Results from './Results';
import CategoryNavigation from './CategoryNavigation';
import VotingProgress from './VotingProgress';
import useVoting from '../hooks/useVoting';
import { categories } from '../data/categories';
import { motion, AnimatePresence } from 'framer-motion';

const VotingSection = () => {
  const { votes, hasVoted, results, handleVote, submitVotes } = useVoting();
  const [currentCategoryIndex, setCurrentCategoryIndex] = React.useState(0);

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    } else if (direction === 'next' && currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const totalVotes = Object.keys(votes).length;
  const currentCategory = categories[currentCategoryIndex];

  return (
    <div className="max-w-3xl mx-auto">
      {!hasVoted ? (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <VotingCategory
                category={currentCategory}
                selectedOption={votes[currentCategory.id]}
                onVote={(option) => handleVote(currentCategory.id, option)}
              />
            </motion.div>
          </AnimatePresence>
          
          <CategoryNavigation
            currentIndex={currentCategoryIndex}
            totalCategories={categories.length}
            onNavigate={handleNavigation}
          />

          <VotingProgress
            totalVotes={totalVotes}
            totalCategories={categories.length}
          />

          {totalVotes === categories.length && (
            <div className="mt-12 text-center">
              <button 
                className="bg-[#F2A366] hover:bg-[#e89255] text-black font-bold py-3 px-8 rounded-full transform transition hover:scale-105"
                onClick={submitVotes}
              >
                Enviar Votos
              </button>
            </div>
          )}
        </>
      ) : (
        <Results 
          results={results}
          categories={categories}
        />
      )}
    </div>
  );
};

export default VotingSection;