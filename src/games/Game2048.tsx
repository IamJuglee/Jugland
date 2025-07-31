import { FC, useEffect, useState } from 'react';
import GameLayout from '../components/GameLayout';

const SIZE = 4;

const emptyBoard = (): number[][] => Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const addTile = (board: number[][]): number[][] => {
  const empty: { x: number; y: number }[] = [];
  board.forEach((row, y) =>
    row.forEach((v, x) => {
      if (v === 0) empty.push({ x, y });
    })
  );
  if (empty.length === 0) return board;
  const pos = empty[Math.floor(Math.random() * empty.length)];
  board[pos.y][pos.x] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

const mergeRow = (row: number[]): number[] => {
  const nums = row.filter((n) => n);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2;
      nums.splice(i + 1, 1);
    }
  }
  while (nums.length < SIZE) nums.push(0);
  return nums;
};

const moveLeft = (b: number[][]): number[][] => b.map((r) => mergeRow(r));
const moveRight = (b: number[][]): number[][] =>
  b.map((r) => mergeRow([...r].reverse()).reverse());
const transpose = (b: number[][]): number[][] => b[0].map((_, i) => b.map((r) => r[i]));
const moveUp = (b: number[][]): number[][] => transpose(moveLeft(transpose(b)));
const moveDown = (b: number[][]): number[][] => transpose(moveRight(transpose(b)));

const boardsEqual = (a: number[][], b: number[][]) =>
  JSON.stringify(a) === JSON.stringify(b);

const Game2048: FC = () => {
  const [board, setBoard] = useState<number[][]>(() => addTile(addTile(emptyBoard())));

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      let next: number[][] | undefined;
      if (e.key === 'ArrowLeft') next = moveLeft(board.map((r) => [...r]));
      if (e.key === 'ArrowRight') next = moveRight(board.map((r) => [...r]));
      if (e.key === 'ArrowUp') next = moveUp(board.map((r) => [...r]));
      if (e.key === 'ArrowDown') next = moveDown(board.map((r) => [...r]));
      if (next && !boardsEqual(board, next)) setBoard(addTile(next));
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [board]);

  return (
    <GameLayout title="2048 Game">
      <div className="grid grid-cols-4 gap-1">
        {board.flat().map((v, i) => (
          <div
            key={i}
            className="w-16 h-16 flex items-center justify-center bg-orange-200 text-xl font-bold"
          >
            {v || ''}
          </div>
        ))}
      </div>
    </GameLayout>
  );
};

export default Game2048;
