import React from 'react';
import { Category } from '../types';

interface ResultsProps {
  results: Record<string, Record<string, number>>;
  categories: Category[];
  categoryOptions: Record<string, string[]>; // Nueva prop para las opciones de cada categoría
}

const Results: React.FC<ResultsProps> = ({ results, categories, categoryOptions }) => {
  const getWinner = (categoryId: string) => {
    const votes = results[categoryId];
    if (!votes) return null;
    
    const options = categoryOptions[categoryId] || []; // Usar las opciones específicas de la categoría
    let maxVotes = -1;
    let winningOption = '';
    
    options.forEach(option => {
      const voteCount = votes[option] || 0;
      if (voteCount > maxVotes) {
        maxVotes = voteCount;
        winningOption = option;
      }
    });
    
    return {
      option: winningOption,
      votes: maxVotes
    };
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Resultados</h2>
      <div className="grid gap-4 max-w-2xl mx-auto">
        {categories.map((category) => {
          const winner = getWinner(category.name);
          const categoryVotes = results[category.name] || {};
          const totalVotes = Object.values(categoryVotes).reduce((a, b) => a + b, 0);
          
          return (
            <div key={category.id} className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">{category.name}</h3>
              {winner ? (
                <div>
                  <p className="text-white mb-2">
                    Ganador actual: {winner.option} con {winner.votes} votos
                  </p>
                  <div className="space-y-2">
                    {categoryOptions[category.name].map((option) => (
                      <div key={option} className="flex items-center gap-2">
                        <span className="w-20">{option}:</span>
                        <div className="flex-1 bg-white/10 rounded-full h-4">
                          <div 
                            className="bg-yellow-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${((categoryVotes[option] || 0) / totalVotes) * 100}%` }}
                          />
                        </div>
                        <span className="w-16 text-right">{categoryVotes[option] || 0} votos</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Sin votos aún</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;