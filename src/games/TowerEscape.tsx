import { FC, useEffect, useRef, useState } from 'react';
import GameLayout from '../components/GameLayout';

const WIDTH = 300;
const HEIGHT = 500;
const PLAYER_SIZE = 20;
const GRAVITY = 0.5;

interface Obj {
  x: number;
  y: number;
  size: number;
}

const TowerEscape: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stage, setStage] = useState<'start' | 'playing' | 'over'>('start');
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [cooldown, setCooldown] = useState(0); // seconds remaining for Q

  useEffect(() => {
    if (stage !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let playerY = HEIGHT - PLAYER_SIZE;
    let vy = 0;
    let obstacles: Obj[] = [];
    let coinItems: Obj[] = [];
    let speed = 2;
    let frame = 0;
    let running = true;
    let bgY = 0;
    const startTime = performance.now();
    let invincibleUntil = 0;
    let lastInvincible = -10000;

    const isCollide = (a: Obj, b: Obj) =>
      a.x < b.x + b.size &&
      a.x + a.size > b.x &&
      a.y < b.y + b.size &&
      a.y + a.size > b.y;

    const jump = (force = -8) => {
      if (playerY >= HEIGHT - PLAYER_SIZE) {
        vy = force;
      }
    };

    const activateShield = () => {
      const now = performance.now();
      if (coins >= 5 && now - lastInvincible >= 10000) {
        setCoins(c => c - 5);
        invincibleUntil = now + 3000;
        lastInvincible = now;
      }
    };

    const activateBoost = () => {
      if (coins >= 5) {
        setCoins(c => c - 5);
        jump(-12);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        jump();
      }
      if (e.key.toLowerCase() === 'q') activateShield();
      if (e.key.toLowerCase() === 'e') activateBoost();
    };

    const clickOrTouch = () => jump();

    window.addEventListener('keydown', handleKey);
    canvas.addEventListener('click', clickOrTouch);
    canvas.addEventListener('touchstart', clickOrTouch);

    const loop = () => {
      if (!running) return;
      const now = performance.now();
      setScore(Math.floor((now - startTime) / 1000));
      setCooldown(Math.max(0, 10 - Math.floor((now - lastInvincible) / 1000)));
      frame++;

      if (frame % 60 === 0) {
        obstacles.push({ x: Math.random() * (WIDTH - 20), y: -20, size: 20 });
        if (Math.random() < 0.3) {
          coinItems.push({ x: Math.random() * (WIDTH - 12), y: -20, size: 12 });
        }
        speed += 0.05;
      }

      vy += GRAVITY;
      playerY += vy;
      if (playerY > HEIGHT - PLAYER_SIZE) {
        playerY = HEIGHT - PLAYER_SIZE;
        vy = 0;
      }

      obstacles.forEach(o => (o.y += speed));
      coinItems.forEach(c => (c.y += speed));
      obstacles = obstacles.filter(o => o.y < HEIGHT + o.size);
      coinItems = coinItems.filter(c => c.y < HEIGHT + c.size);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);

      // background stripes
      bgY += 1;
      const stripe = 50;
      for (let y = -stripe; y < HEIGHT + stripe; y += stripe) {
        const pos = (y + bgY) % (stripe * 2);
        ctx.fillStyle = pos < stripe ? '#e5e7eb' : '#f3f4f6';
        ctx.fillRect(0, pos - stripe, WIDTH, stripe);
      }

      ctx.fillStyle = '#4ade80';
      ctx.fillRect(WIDTH / 2 - PLAYER_SIZE / 2, playerY, PLAYER_SIZE, PLAYER_SIZE);

      if (now < invincibleUntil) {
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 3;
        ctx.strokeRect(
          WIDTH / 2 - PLAYER_SIZE / 2 - 2,
          playerY - 2,
          PLAYER_SIZE + 4,
          PLAYER_SIZE + 4
        );
      }

      ctx.fillStyle = '#f87171';
      obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.size, o.size));

      ctx.fillStyle = '#facc15';
      coinItems.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x + c.size / 2, c.y + c.size / 2, c.size / 2, 0, Math.PI * 2);
        ctx.fill();
      });

      const playerRect: Obj = {
        x: WIDTH / 2 - PLAYER_SIZE / 2,
        y: playerY,
        size: PLAYER_SIZE,
      };

      if (now >= invincibleUntil && obstacles.some(o => isCollide(playerRect, o))) {
        running = false;
        setStage('over');
        return;
      }

      coinItems.forEach((c, i) => {
        if (isCollide(playerRect, c)) {
          coinItems.splice(i, 1);
          setCoins(cnt => cnt + 1);
        }
      });

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      running = false;
      window.removeEventListener('keydown', handleKey);
      canvas.removeEventListener('click', clickOrTouch);
      canvas.removeEventListener('touchstart', clickOrTouch);
    };
  }, [stage, coins]);

  const startGame = () => {
    setCoins(0);
    setScore(0);
    setStage('playing');
  };

  return (
    <GameLayout title="Tower Escape">
      <div className="relative flex flex-col items-center">
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="border" />
        {stage !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
            {stage === 'start' && (
              <button
                onClick={startGame}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
              >
                시작
              </button>
            )}
            {stage === 'over' && (
              <div className="text-center">
                <p className="mb-2 text-xl">점수: {score}</p>
                <button
                  onClick={startGame}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                >
                  다시하기
                </button>
              </div>
            )}
          </div>
        )}
        <div className="absolute top-0 left-0 w-full flex justify-between p-2 text-xs text-white bg-black bg-opacity-30">
          <span>점수: {score}</span>
          <span>코인: {coins}</span>
          <span>Q {cooldown ? `쿨 ${cooldown}s` : 'READY'}</span>
        </div>
      </div>
    </GameLayout>
  );
};

export default TowerEscape;
