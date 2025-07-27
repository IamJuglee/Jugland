import { FC } from 'react';
import { Link } from 'react-router-dom';

const games = [
  { path: '/counter', name: 'Counter Game' },
  { path: '/guess-number', name: 'Guess Number' },
  { path: '/rps', name: 'Rock Paper Scissors' },
  { path: '/memory', name: 'Memory Game' },
  { path: '/reaction', name: 'Reaction Time' },
];

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
        <ul className="space-y-2">
          {games.map((g) => (
            <li key={g.path}>
              <Link
                to={g.path}
                className="block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
              >
                {g.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
