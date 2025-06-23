export default interface GameStates {
  gameOver: boolean;
  setGameOver: (state: boolean) => void; //함수 타입이라서 void
  gameScore: number;
  setGameScore: (score: number) => void;
  rankName: string;
  setRankName: (name: string) => void;
  newGame: boolean;
  setNewGame: (state: boolean) => void;
  startNewGame: () => void;
}
