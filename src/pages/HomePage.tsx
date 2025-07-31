import { FC } from 'react';
import { Link } from 'react-router-dom';

const games = [
  { id: 'snake', title: 'Snake Game', desc: '고전 뱀 게임을 즐겨보세요.' },
  { id: '2048', title: '2048 Game', desc: '같은 숫자를 합쳐 2048을 만들어보세요.' },
  { id: 'memory', title: 'Memory Card', desc: '같은 그림의 카드를 찾아보세요.' },
  { id: 'rps', title: 'Rock Paper Scissors', desc: '가위바위보로 승부를 겨뤄보세요.' },
  { id: 'click', title: 'Click Speed Test', desc: '클릭 속도를 테스트해보세요.' },
];

const HomePage: FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          Jugland - 추억의 게임 놀이터
        </h1>
        <p className="text-lg text-pink-600">
          추억의 미니게임을 지금 바로 즐겨보세요!
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-lg shadow p-6 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
            <p className="mb-4 text-gray-700">{game.desc}</p>
            <Link
              to={`/game/${game.id}`}
              className="mt-auto inline-block bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
            >
              Play
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
