import { FC, useEffect, useRef, useState } from 'react';
import GameLayout from '../components/GameLayout';

const WIDTH = 300;
const HEIGHT = 500;

const TowerEscape: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [over, setOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let playerY = HEIGHT - 30;
    let vy = 0;
    let obstacles: { x: number; y: number }[] = [];
    let frame = 0;
    let running = true;

    const jump = () => {
      if (playerY >= HEIGHT - 30) {
        vy = -8;
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (!over) jump();
      }
    };
    const handleClick = () => {
      if (!over) jump();
    };

    window.addEventListener('keydown', handleKey);
    canvas.addEventListener('click', handleClick);

    const loop = () => {
      if (!running) return;
      frame++;
      if (frame % 60 === 0) {
        obstacles.push({ x: Math.random() * (WIDTH - 20), y: -20 });
      }

      vy += 0.4;
      playerY += vy;
      if (playerY > HEIGHT - 30) {
        playerY = HEIGHT - 30;
        vy = 0;
      }

      obstacles = obstacles.map((o) => ({ ...o, y: o.y + 3 }));
      obstacles = obstacles.filter((o) => o.y < HEIGHT + 20);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = '#4ade80';
      ctx.fillRect(WIDTH / 2 - 10, playerY, 20, 20);
      ctx.fillStyle = '#f87171';
      obstacles.forEach((o) => ctx.fillRect(o.x, o.y, 20, 20));

      if (
        obstacles.some(
          (o) =>
            o.y + 20 > playerY &&
            o.y < playerY + 20 &&
            o.x + 20 > WIDTH / 2 - 10 &&
            o.x < WIDTH / 2 + 10
        )
      ) {
        running = false;
        setOver(true);
        return;
      }

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKey);
      canvas.removeEventListener('click', handleClick);
      running = false;
    };
  }, [over]);

  return (
    <GameLayout title="Tower Escape">
      <div className="flex flex-col items-center">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="border mb-4"
        />
        {over && (
          <button
            onClick={() => setOver(false)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            다시하기
          </button>
        )}
      </div>
    </GameLayout>
  );
};

export default TowerEscape;
