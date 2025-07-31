import { FC, ReactNode } from 'react';
import HomeButton from './HomeButton';

interface GameLayoutProps {
  title: string;
  children: ReactNode;
}

const GameLayout: FC<GameLayoutProps> = ({ title, children }) => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center p-4">
    <div className="w-full max-w-md flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
      <HomeButton />
    </div>
    <div className="w-full max-w-md">{children}</div>
  </div>
);

export default GameLayout;
