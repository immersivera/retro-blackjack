import React from 'react';
import { Card as CardType } from '../types/game';

interface CardProps {
  card?: CardType;
  isHidden?: boolean;
  className?: string;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ card, isHidden = false, className = '', delay = 0 }) => {
  const getSuitSymbol = (suit: CardType['suit']) => {
    switch (suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
    }
  };

  const getSuitColor = (suit: CardType['suit']) => {
    return suit === 'hearts' || suit === 'diamonds' ? 'text-red-600' : 'text-gray-800';
  };

  if (isHidden) {
    return (
      <div 
        className={`w-16 h-24 sm:w-20 sm:h-28 bg-gradient-to-br from-blue-900 to-blue-700 border-2 border-blue-800 rounded-lg shadow-lg flex items-center justify-center transform transition-all duration-500 ${className}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full opacity-50"></div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className={`w-16 h-24 sm:w-20 sm:h-28 border-2 border-dashed border-gray-400 rounded-lg ${className}`}></div>
    );
  }

  return (
    <div 
      className={`w-16 h-24 sm:w-20 sm:h-28 bg-white border-2 border-gray-300 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 animate-fadeInUp ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-1 h-full flex flex-col">
        <div className={`flex justify-between items-start text-xs sm:text-sm font-bold ${getSuitColor(card.suit)}`}>
          <span>{card.rank}</span>
          <span>{getSuitSymbol(card.suit)}</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <span className={`text-2xl sm:text-3xl ${getSuitColor(card.suit)}`}>
            {getSuitSymbol(card.suit)}
          </span>
        </div>
        <div className={`flex justify-between items-end text-xs sm:text-sm font-bold rotate-180 ${getSuitColor(card.suit)}`}>
          <span>{card.rank}</span>
          <span>{getSuitSymbol(card.suit)}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;