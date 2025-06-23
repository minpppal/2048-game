import React from "react";
import useGameStatesStore from "@/store/gameStatesStore";

const NewGame = () => {
  const { startNewGame } = useGameStatesStore();
  return (
    <>
      <button
        onClick={startNewGame}
        className="bg-orange-400 text-[20px] w-[110px] h-[40px] rounded-lg font-semibold text-white"
      >
        New Game
      </button>
    </>
  );
};

export default NewGame;
