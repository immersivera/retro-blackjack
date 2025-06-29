import React from 'react';
import { Dealer } from '../types/game';
import Card from './Card';

interface DealerHandProps {
  dealer: Dealer;
  gamePhase: string;
}

const DealerHand: React.FC<DealerHandProps> = ({ dealer, gamePhase }) => {
  const getStatusMessage = () => {
    if (dealer.isBusted) return 'BUSTED';
    if (dealer.hasBlackjack) return 'BLACKJACK!';
    if (gamePhase === 'dealer-turn') return 'DEALER PLAYING...';
    return '';
  };

  const getStatusColor = () => {
    if (dealer.isBusted) return 'text-red-500';
    if (dealer.hasBlackjack) return 'text-yellow-400';
    if (gamePhase === 'dealer-turn') return 'text-blue-400';
    return '';
  };

  return (
    <div className="bg-green-900 rounded-xl p-6 border-2 border-green-700 shadow-xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">DEALER</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-white">
              Score: {dealer.isRevealed || gamePhase === 'game-over' ? dealer.score : '?'}
            </span>
            {getStatusMessage() && (
              <span className={`text-sm font-bold ${getStatusColor()} animate-pulse`}>
                {getStatusMessage()}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {dealer.hand.map((card, index) => (
            <Card 
              key={card.id} 
              card={card} 
              isHidden={index === 1 && !dealer.isRevealed && gamePhase !== 'game-over'}
              delay={index * 300}
              className="animate-slideInDown"
            />
          ))}
          {dealer.hand.length === 0 && (
            <div className="w-20 h-28 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-sm">Waiting...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealerHand;