import { LeaderboardEntry, GameResult } from '../types/game';

const LEADERBOARD_KEY = 'blackjack-leaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const stored = localStorage.getItem(LEADERBOARD_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const updateLeaderboard = (results: GameResult[]): void => {
  try {
    const currentLeaderboard = getLeaderboard();
    
    results.forEach(result => {
      const existingEntry = currentLeaderboard.find(entry => entry.name === result.playerName);
      
      if (existingEntry) {
        // Update existing player
        if (result.result === 'win') existingEntry.wins++;
        else if (result.result === 'loss') existingEntry.losses++;
        else existingEntry.ties++;
        
        existingEntry.winRate = existingEntry.wins / (existingEntry.wins + existingEntry.losses + existingEntry.ties);
        existingEntry.lastPlayed = new Date().toISOString();
      } else {
        // Add new player
        const newEntry: LeaderboardEntry = {
          name: result.playerName,
          wins: result.result === 'win' ? 1 : 0,
          losses: result.result === 'loss' ? 1 : 0,
          ties: result.result === 'tie' ? 1 : 0,
          winRate: result.result === 'win' ? 1 : 0,
          lastPlayed: new Date().toISOString()
        };
        currentLeaderboard.push(newEntry);
      }
    });
    
    // Sort by win rate, then by total games
    currentLeaderboard.sort((a, b) => {
      const totalGamesA = a.wins + a.losses + a.ties;
      const totalGamesB = b.wins + b.losses + b.ties;
      
      if (b.winRate !== a.winRate) {
        return b.winRate - a.winRate;
      }
      return totalGamesB - totalGamesA;
    });
    
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(currentLeaderboard.slice(0, 10)));
  } catch (error) {
    console.error('Failed to update leaderboard:', error);
  }
};

export const clearLeaderboard = (): void => {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
  } catch (error) {
    console.error('Failed to clear leaderboard:', error);
  }
};