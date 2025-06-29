import React from 'react';
import { GameState } from '../types/game';

interface GameControlsProps {
  gameState: GameState;
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
  onShowLeaderboard: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  gameState, 
  onHit, 
  onStand, 
  onNewGame, 
  onShowLeaderboard 
}) => {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const canPlay = gameState.gamePhase === 'playing' && currentPlayer && !currentPlayer.isStanding && !currentPlayer.isBusted;

  if (gameState.gamePhase === 'game-over') {
    return (
      <div className="flex flex-col items-center space-y-4 bg-green-800 p-6 rounded-xl border-2 border-green-600">
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">Game Over!</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={onNewGame}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-105 transition-all duration-200"
          >
            New Game
          </button>
          <button
            onClick={onShowLeaderboard}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-200"
          >
            Leaderboard
          </button>
        </div>
      </div>
    );
  }

  if (gameState.gamePhase === 'dealing' || gameState.gamePhase === 'dealer-turn') {
    return (
      <div className="flex justify-center items-center bg-green-800 p-6 rounded-xl border-2 border-green-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
          <span className="text-white font-semibold">
            {gameState.gamePhase === 'dealing' ? 'Dealing cards...' : 'Dealer playing...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-800 p-6 rounded-xl border-2 border-green-600">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-yellow-400">
          {currentPlayer?.name}'s Turn
        </h3>
        <p className="text-white text-sm">Score: {currentPlayer?.score}</p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={onHit}
          disabled={!canPlay}
          className={`px-6 py-3 font-bold rounded-lg shadow-lg transform transition-all duration-200 ${
            canPlay
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-400 hover:to-green-500 hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          HIT
        </button>
        
        <button
          onClick={onStand}
          disabled={!canPlay}
          className={`px-6 py-3 font-bold rounded-lg shadow-lg transform transition-all duration-200 ${
            canPlay
              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500 hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          STAND
        </button>
        
        <button
          onClick={onShowLeaderboard}
          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-400 hover:to-blue-500 transform hover:scale-105 transition-all duration-200"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
};

export default GameControls;