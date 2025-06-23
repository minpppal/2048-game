"use client";
import React, { useState } from "react";
import GameStartButton from "./gameStartButton/GameStartButton";
import Rank from "../rank/Rank";
import RankButton from "../rank/RankButton";
import Game from "../game/Game";

const Main = () => {
  const [clickButton, setClickButton] = useState<"gameStart" | "rank" | null>(
    null
  );
  const handleButtonClick = (button: "gameStart" | "rank") => {
    setClickButton(button);
  };
  return (
    <>
      <div className="mb-[100px]">
        <h1 className="text-center font-extrabold text-orange-600 pt-[100px]">
          2048
        </h1>
        <span className="flex text-center text-xl text-orange-800 items-center justify-center">
          Join the numbers and get to the 2048 tile!
        </span>
      </div>
      <div>
        {clickButton === null && (
          <>
            <div className="flex  flex-col items-center mb-[50px]">
              <GameStartButton onClick={() => handleButtonClick("gameStart")} />
              <RankButton onClick={() => handleButtonClick("rank")} />
            </div>
            <div>
              <div className="flex items-center justify-center mb-[15px]">
                <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-md text-2xl font-extrabold bg-amber-100 text-amber-800 mr-[15px]">
                  2
                </div>
                <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-md text-2xl font-extrabold bg-amber-200 text-amber-800">
                  4
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-md text-2xl font-extrabold bg-orange-300 text-white mr-[15px]">
                  8
                </div>
                <div className="w-20 h-20 flex items-center justify-center rounded-lg shadow-md text-2xl font-extrabold bg-orange-400 text-white">
                  16
                </div>
              </div>
            </div>
          </>
        )}
        {/* 상태에 맞게 클릭된 버튼에 해당하는 컴포넌트만 렌더링 */}
        {clickButton === "gameStart" && <Game />}
        {clickButton === "rank" && <Rank />}
      </div>
    </>
  );
};

export default Main;
