import React from 'react';
import { Player } from '../types/game';
import Card from './Card';

interface PlayerHandProps {
  player: Player;
  isCurrentPlayer: boolean;
}

const PlayerHand: React.FC<PlayerHandProps> = ({ player, isCurrentPlayer }) => {
  const getStatusMessage = () => {
    if (player.isBusted) return 'BUSTED';
    if (player.hasBlackjack) return 'BLACKJACK!';
    if (player.isStanding) return 'STANDING';
    return '';
  };

  const getStatusColor = () => {
    if (player.isBusted) return 'text-red-500';
    if (player.hasBlackjack) return 'text-yellow-400';
    if (player.isStanding) return 'text-blue-400';
    return '';
  };

  return (
    <div className={`bg-green-800 rounded-xl p-4 border-2 transition-all duration-300 ${
      isCurrentPlayer ? 'border-yellow-400 shadow-xl shadow-yellow-400/30' : 'border-green-600'
    }`}>
      <div className="flex flex-col items-center space-y-3">
        <div className="text-center">
          <h3 className={`font-bold text-lg ${isCurrentPlayer ? 'text-yellow-400' : 'text-white'}`}>
            {player.name}
          </h3>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-white text-sm">Score: {player.score}</span>
            {getStatusMessage() && (
              <span className={`text-xs font-bold ${getStatusColor()}`}>
                {getStatusMessage()}
              </span>
            )}
          </div>
          {isCurrentPlayer && (
            <div className="mt-1">
              <span className="text-yellow-400 text-xs font-semibold animate-pulse">
                YOUR TURN
              </span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-xs">
          {player.hand.map((card, index) => (
            <Card 
              key={card.id} 
              card={card} 
              delay={index * 200}
              className="animate-slideInUp"
            />
          ))}
          {player.hand.length === 0 && (
            <div className="w-16 h-24 sm:w-20 sm:h-28 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs">Waiting...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerHand;