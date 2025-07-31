import { FC, useEffect, useState } from 'react';
import GameLayout from '../components/GameLayout';

interface Pos { x: number; y: number }

const SIZE = 10;
const INITIAL_SNAKE: Pos[] = [{ x: 5, y: 5 }];

const randomPos = (occupied: Pos[]): Pos => {
  let pos: Pos;
  do {
    pos = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
  } while (occupied.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
};

const SnakeGame: FC = () => {
  const [snake, setSnake] = useState<Pos[]>(INITIAL_SNAKE);
  const [apple, setApple] = useState<Pos>(randomPos(INITIAL_SNAKE));
  const [dir, setDir] = useState<Pos>({ x: 1, y: 0 });

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && dir.y !== 1) setDir({ x: 0, y: -1 });
      if (e.key === 'ArrowDown' && dir.y !== -1) setDir({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft' && dir.x !== 1) setDir({ x: -1, y: 0 });
      if (e.key === 'ArrowRight' && dir.x !== -1) setDir({ x: 1, y: 0 });
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [dir]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = {
          x: (head.x + dir.x + SIZE) % SIZE,
          y: (head.y + dir.y + SIZE) % SIZE,
        };
        const newSnake = [newHead, ...prev];
        const hitSelf = newSnake.slice(1).some((p) => p.x === newHead.x && p.y === newHead.y);
        if (hitSelf) return INITIAL_SNAKE;
        if (newHead.x === apple.x && newHead.y === apple.y) {
          setApple(randomPos(newSnake));
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [dir, apple]);

  return (
    <GameLayout title="Snake Game">
      <div className="grid grid-cols-10 gap-0.5 mx-auto">
        {Array.from({ length: SIZE * SIZE }).map((_, i) => {
          const x = i % SIZE;
          const y = Math.floor(i / SIZE);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isSnake = snake.some((s) => s.x === x && s.y === y);
          const isApple = apple.x === x && apple.y === y;
          const bg = isHead
            ? 'bg-green-600'
            : isSnake
            ? 'bg-green-400'
            : isApple
            ? 'bg-red-500'
            : 'bg-gray-200';
          return <div key={i} className={`w-5 h-5 ${bg}`} />;
        })}
      </div>
    </GameLayout>
  );
};

export default SnakeGame;
