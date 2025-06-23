"use client";
import React, { useState, useEffect, useRef } from "react";
import Tile from "./Tile";
import useGameStatesStore from "@/store/gameStatesStore";
import GameOverModal from "../modal/GameOverModal";

const TileBox: React.FC = () => {
  const { gameOver, setGameOver, setGameScore, newGame, setNewGame } =
    useGameStatesStore();
  const [tileNumbers, setTileNumbers] = useState<(number | null)[]>(
    Array(16).fill(null)
  );
  const scoreIncrease = useRef(0);
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
    if (newGame) {
      setTileNumbers(Array(16).fill(null)); // 타일을 초기화
      scoreIncrease.current = 0; // 점수 초기화
      setGameScore(0); // 점수 상태 초기화
      addRandomTile(); // 첫 번째 숫자 추가
      addRandomTile(); // 두 번째 숫자 추가
    }
  }, [newGame]); // `newGame` 상태가 변경될 때마다 실행

  // 첫 렌더링 시 newGame을 true로 설정하여 타일이 생성되도록 설정
  useEffect(() => {
    setNewGame(true); // 첫 번째 렌더링 시 newGame을 true로 설정
  }, []); // 빈 배열로 두어 처음 한 번만 실행되도록 설정

  /**
   * 방향키 입력 처리
   */
  const handleKeyDown = (event: KeyboardEvent) => {
    if (gameOver) return;
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
      let score = 0;
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
              row[j] = row[j]! * 2;
              score += row[j] ?? 0;
              row[j + 1] = null; //뒤 숫자는 null로 변환
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
        for (let i = 0; i < 4; i++) {
          //열 추출
          let column = [
            prevTiles[i],
            prevTiles[i + 4],
            prevTiles[i + 8],
            prevTiles[i + 12],
          ];
          if (direction === "down") column.reverse();

          //null 제거하기
          column = column.filter((num) => num !== null);
          for (let j = 0; j < column.length; j++) {
            if (column[j] === column[j + 1]) {
              column[j] = column[j]! * 2;
              score += column[j] ?? 0;
              column[j + 1] = null;
            }
          }

          //null 제거 후 위쪽 정렬
          const newColumn: Array<number | null> = column.filter(
            (num) => num !== null
          );
          while (newColumn.length < 4) {
            newColumn.push(null);
          }
          if (direction === "down") newColumn.reverse();
          //계산된 열을 기존 타일 배열에 적용
          newTiles[i] = newColumn[0];
          newTiles[i + 4] = newColumn[1];
          newTiles[i + 8] = newColumn[2];
          newTiles[i + 12] = newColumn[3];
        }
      }
      // 이동 또는 합쳐짐이 발생했는지 확인
      const isChanged = JSON.stringify(prevTiles) !== JSON.stringify(newTiles);
      // 이동이 발생한 경우에만 새로운 타일 추가
      if (isChanged) {
        addRandomTile();
      }
      // scoreIncrease.ref에 직접 할당
      scoreIncrease.current += score;
      return newTiles;
    });
  };

  useEffect(() => {
    setGameScore(scoreIncrease.current);
  }, [tileNumbers]);

  //2번씩 실행되는거 막아주는거
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /**
   * 게임 종료 체크
   */
  const checkGameOver = () => {
    const fullNumbers = tileNumbers.every((tile) => tile !== null); //타일에 null이 안들어있으면 전부 숫자로 차있음
    console.log("타일이 가득 찼는지 확인:", fullNumbers);
    //숫자가 가득차지 않으면 종료
    if (!fullNumbers) {
      return;
    }
    // 모든 타일이 꽉 찬 경우, 합쳐질 수 있는 타일이 있는지 확인
    for (let i = 0; i < 16; i++) {
      if (i % 4 !== 0 && tileNumbers[i] === tileNumbers[i - 1]) {
        return false;
      }

      if (i % 4 !== 3 && tileNumbers[i] === tileNumbers[i + 1]) {
        return false;
      }

      if (i >= 4 && tileNumbers[i] === tileNumbers[i - 4]) {
        return false;
      }

      if (i <= 11 && tileNumbers[i] === tileNumbers[i + 4]) {
        return false;
      }
    }
    console.log("게임 종료!");
    setGameOver(true);
    return true;
  };

  // 게임 종료 체크를 useEffect로 처리 (렌더링 후에 체크)
  useEffect(() => {
    if (checkGameOver()) {
      setGameOver(true); // 게임 종료 상태 업데이트
    }
  }, [tileNumbers]); // 타일 숫자가 변경될 때마다 실행

  return (
    <div className="relative w-[466px] h-[480px] flex flex-wrap gap-4">
      {/* 게임 진행 중에 모달이 덮어씌워지도록 설정 */}
      {gameOver && <GameOverModal />}

      <div className="bg-orange-200 p-4 rounded-lg shadow-lg w-full h-full flex flex-wrap gap-4">
        {tileNumbers.map((num, index) => (
          <Tile key={index} number={num} />
        ))}
      </div>
    </div>
  );
};

export default TileBox;
