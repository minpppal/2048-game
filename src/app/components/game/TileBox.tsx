import React, { useState, useEffect } from "react";
import Tile from "./Tile";

const TileBox: React.FC = () => {
  const [tileNumbers, setTileNumbers] = useState<(number | null)[]>(
    Array(16).fill(null)
  );

  /**
   * 랜덤 숫자 추가 함수
   */
  const addRandomTile = () => {
    setTileNumbers((prevTiles) => {
      // 빈 칸(= null인 인덱스) 찾기
      const emptyIndices = prevTiles
        .map((num, index) => (num === null ? index : null)) // null인 인덱스 찾기
        .filter((index): index is number => index !== null);

      if (emptyIndices.length === 0) {
        return prevTiles; // 빈 칸이 없으면 아무 것도 하지 않음
      }

      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)]; // 빈 칸 중 랜덤 선택
      const newNumber = Math.random() < 0.9 ? 2 : 4; // 90% 확률로 2, 10% 확률로 4

      // 새로운 상태 생성
      const newTiles = [...prevTiles];
      newTiles[randomIndex] = newNumber;
      return newTiles;
    });
  };

  // 게임 시작 시 초기 숫자 2개 추가
  useEffect(() => {
    addRandomTile(); // 첫 번째 숫자 추가
    console.log("첫번째숫자");
    addRandomTile(); // 두 번째 숫자 추가
    console.log("두번째숫자");
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  /**
   * 방향키 입력 처리
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        moveTiles("up");
        console.log("윗키");
        break;
      case "ArrowDown":
        moveTiles("down");
        console.log("아래키");
        break;
      case "ArrowRight":
        moveTiles("right");
        console.log("오른키");
        break;
      case "ArrowLeft":
        moveTiles("left");
        console.log("왼키");
        break;
      default:
        break;
    }
  };

  /**
   * 타일 이동 로직
   */
  const moveTiles = (direction: "up" | "down" | "left" | "right") => {
    setTileNumbers((prevTiles) => {
      const newTiles = [...prevTiles]; // 새로운 배열 복사
      if (direction === "left" || direction === "right") {
        for (let i = 0; i < 4; i++) {
          // 각 행을 추출
          let row = prevTiles.slice(i * 4, i * 4 + 4);
          if (direction === "right") row.reverse(); // 오른쪽 이동이면 반전

          //null 제거하기 (앞뒤 숫자가 같은지 판단하기위해서)
          row = row.filter((num) => num !== null);
          for (let j = 0; j < row.length; j++) {
            if (row[j] === row[j + 1]) {
              console.log(`합쳐지는 값: ${row[j]}와 ${row[j + 1]}`);
              row[j] = row[j]! * 2;
              row[j + 1] = null; //뒤 숫자는 null로 변환
              console.log(`합친 후 row:`, row);
            }
          }

          //null 제거 후 왼쪽 정렬
          const newRow: Array<number | null> = row.filter(
            (num) => num !== null
          );
          while (newRow.length < 4) {
            newRow.push(null); // 4칸이 채워 질때까지 null 추가
          }
          if (direction === "right") newRow.reverse(); // 오른쪽이면 다시 반전

          newTiles.splice(i * 4, 4, ...newRow); // 행 하나를 전부 지우고 새로운 배열 삽입
        }
      } else if (direction === "up" || direction === "down") {
        // for(let i=0; i<4; i++){
        //   let column =
        // }
      }
      return newTiles;
    });
    // 이동 후 랜덤 숫자 추가
    addRandomTile();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="bg-orange-200 p-4  rounded-lg shadow-lg w-[466px] h-[480px] flex flex-wrap  box-border gap-4">
      {tileNumbers.map((num, index) => (
        <Tile key={index} number={num} />
      ))}
    </div>
  );
};

export default TileBox;
