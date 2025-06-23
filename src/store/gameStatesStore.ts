import { create } from "zustand";
import GameStates from "@/types/gameOverStoreTypes";

const useGameStatesStore = create<GameStates>((set) => ({
  gameOver: false,
  setGameOver: (state: boolean) => set({ gameOver: state }),
  gameScore: 0,
  setGameScore: (score: number) => set({ gameScore: score }),
  rankName: "",
  setRankName: (name: string) => set({ rankName: name }),
  newGame: false,
  setNewGame: (state: boolean) => set({ newGame: state }),

  // 게임을 새로 시작할 때 newGame을 true로 설정하고, 일정 시간 후 false로 설정
  startNewGame: () => {
    set({ newGame: true, gameScore: 0, gameOver: false }); // 게임을 새로 시작할 때 상태 초기화
    setTimeout(() => set({ newGame: false }), 100); // 일정 시간 후 false로 되돌리기
  },
}));

export default useGameStatesStore;
