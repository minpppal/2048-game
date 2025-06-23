"use client";
import React from "react";
import useGameStatesStore from "@/store/gameStatesStore";

const GameOverModal = () => {
  const { gameScore, rankName, setRankName } = useGameStatesStore();

  const handleSubmit = async () => {
    if (!rankName) {
      alert("Please enter your name!");
      return;
    }

    try {
      // 서버로 점수와 이름 전송
      const response = await fetch("/api/ranking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: rankName, score: gameScore }),
      });

      if (response.ok) {
        setRankName(""); // 입력 초기화
        window.location.reload(); // 새로고침
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-10 z-10">
      <div className="w-[200px] h-[180px] bg-white flex flex-col justify-center items-center rounded-lg z-20">
        <h2 className="font-bold text-orange-600 text-3xl mb-2">Game Over!</h2>
        <div className="font-bold text-black text-xl mb-2">
          Your score : {gameScore}
        </div>
        <input
          type="text"
          placeholder="Enter your name"
          value={rankName}
          onChange={(e) => setRankName(e.target.value)}
          maxLength={6}
          className="border border-gray-300 rounded-md p-2 mb-3  text-center w-[150px] h-[30px] text-sm"
        />
        <div
          onClick={handleSubmit}
          className="cursor-pointer bg-orange-600 text-white text-xs rounded-lg py-2 px-4 "
        >
          Ok
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
