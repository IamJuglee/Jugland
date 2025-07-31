import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface GameLayoutProps {
  title: string;
  children: ReactNode;
}

const GameLayout: FC<GameLayoutProps> = ({ title, children }) => (
  <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-4">
    <div className="w-full max-w-md flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link
        to="/"
        className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded"
      >
        ← 홈으로
      </Link>
    </div>
    <div className="w-full max-w-md">{children}</div>
  </div>
);

export default GameLayout;
