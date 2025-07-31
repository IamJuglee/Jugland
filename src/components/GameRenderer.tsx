import { FC } from 'react';
import { useParams } from 'react-router-dom';
import SnakeGame from '../games/SnakeGame';
import Game2048 from '../games/Game2048';
import MemoryCard from '../games/MemoryCard';
import RockPaperScissors from '../games/RockPaperScissors';
import ClickSpeedTest from '../games/ClickSpeedTest';
import TowerEscape from '../games/TowerEscape';

const gameMap: Record<string, FC> = {
  snake: SnakeGame,
  '2048': Game2048,
  memory: MemoryCard,
  rps: RockPaperScissors,
  click: ClickSpeedTest,
  tower: TowerEscape,
};

const GameRenderer: FC = () => {
  const { id } = useParams<{ id: string }>();
  const Game = id ? gameMap[id] : undefined;
  return Game ? (
    <Game />
  ) : (
    <div className="p-4 text-center">존재하지 않는 게임입니다.</div>
  );
};

export default GameRenderer;
