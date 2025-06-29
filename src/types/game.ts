export interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';
  value: number;
  id: string;
}

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  score: number;
  isStanding: boolean;
  isBusted: boolean;
  hasBlackjack: boolean;
  isActive: boolean;
}

export interface Dealer {
  hand: Card[];
  score: number;
  isRevealed: boolean;
  isBusted: boolean;
  hasBlackjack: boolean;
}

export interface GameState {
  players: Player[];
  dealer: Dealer;
  deck: Card[];
  currentPlayerIndex: number;
  gamePhase: 'setup' | 'dealing' | 'playing' | 'dealer-turn' | 'game-over';
  round: number;
}

export interface LeaderboardEntry {
  name: string;
  wins: number;
  losses: number;
  ties: number;
  winRate: number;
  lastPlayed: string;
}

export interface GameResult {
  playerId: string;
  playerName: string;
  result: 'win' | 'loss' | 'tie';
  playerScore: number;
  dealerScore: number;
}