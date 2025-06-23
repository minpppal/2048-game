"use client";
import React, { useState, useEffect } from "react";

const Rank = () => {
  const [rankingData, setRankingData] = useState<
    { name: string; score: number }[]
  >([]);

  useEffect(() => {
    const fetchRankingData = async () => {
      const response = await fetch("/rankingData.json"); // 서버에서 데이터 가져오기
      if (response.ok) {
        const data = await response.json();
        setRankingData(data);
      }
    };
    fetchRankingData();
  }, []);

  const handleClickHome = () => {
    window.location.reload();
  };

  return (
    <div className="relative ">
      <div className="bg-orange-100 p-4 rounded-lg shadow-lg h-[630px] ">
        <h2 className="text-2xl font-bold mb-4 text-orange-800 text-center">
          Top 10 Rankings
        </h2>
        <div>
          <div className="flex mb-[5px]">
            <span className=" text-gray-500 text-lg font-medium mr-[60px] ">
              Rank
            </span>
            <span className=" text-gray-500 text-lg font-medium  mr-[155px]">
              Name
            </span>
            <span className=" text-gray-500 text-lg font-medium  text-right">
              Score
            </span>
          </div>
          {rankingData.map((item, index) => (
            <div key={index} className="flex  py-3 border-t border-gray-300">
              <span className="text-lg w-[50px]">{index + 1}</span>
              <span className="text-lg text-center w-[150px]">{item.name}</span>
              <span className="text-right text-lg w-[150px]">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center mb-12 justify-end mt-[10px]">
        <button
          className="text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg shadow-md transition duration-200"
          onClick={handleClickHome}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Rank;
