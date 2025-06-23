import React from "react";

interface TileProps {
  number: number | null;
}

function getTileStyle(value: number | null): string {
  switch (value) {
    case 2:
      return "bg-amber-100 text-amber-800";
    case 4:
      return "bg-amber-200 text-amber-800";
    case 8:
      return "bg-orange-300 text-white";
    case 16:
      return "bg-orange-400 text-white";
    case 32:
      return "bg-orange-500 text-white";
    case 64:
      return "bg-orange-600 text-white";
    case 128:
      return "bg-yellow-300 text-yellow-800";
    case 256:
      return "bg-yellow-400 text-yellow-800";
    case 512:
      return "bg-yellow-500 text-white";
    case 1024:
      return "bg-yellow-600 text-white";
    case 2048:
      return "bg-yellow-700 text-white";
    case 4096:
      return "bg-yellow-900 text-white";
    default:
      return "bg-gray-200";
  }
}

const Tile = ({ number }: TileProps) => {
  const tileClass = getTileStyle(number);

  return (
    <div
      className={`flex items-center justify-center w-[96px] h-[96px] rounded-lg text-[24px] font-bold shadow-lg ${tileClass}`}
    >
      {number !== null ? number : ""}
    </div>
  );
};

export default Tile;
