import { FC } from 'react';
import { Link } from 'react-router-dom';

const HomePage: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">
          Jugland - 추억의 게임 놀이터
        </h1>
        <p className="text-lg text-pink-600 mb-8">
          추억의 미니게임을 지금 바로 즐겨보세요!
        </p>
        <Link
          to="/games"
          className="bg-pink-500 hover:bg-pink-600 text-white text-xl px-8 py-4 rounded-full"
        >
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
