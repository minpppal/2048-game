import React from "react";
import useGameStatesStore from "@/store/gameStatesStore";

const GameScore = () => {
  const { gameScore } = useGameStatesStore();

  return (
    <div className="w-[300px] h-[70px] bg-orange-200 flex flex-col text-[30px] p-[3px] rounded-lg ">
      <p className="text-[15px] font-semibold text-orange-800">score</p>
      <div className=" font-semibold text-orange-800">{gameScore}</div>
    </div>
  );
};

export default GameScore;
