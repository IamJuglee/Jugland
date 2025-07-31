import { FC } from 'react';
import { Link } from 'react-router-dom';

const games = [
  { id: 'snake', title: 'Snake Game', desc: '고전 뱀 게임 (방향키로 이동, 사과 먹기)' },
  { id: '2048', title: '2048 Game', desc: '동일 숫자 블록 병합 게임' },
  { id: 'memory', title: 'Memory Card', desc: '같은 그림 카드 찾기' },
  { id: 'rps', title: 'Rock Paper Scissors', desc: '가위/바위/보 승부 게임' },
  { id: 'click', title: 'Click Speed Test', desc: '제한시간 내 클릭 수 측정' },
  { id: 'tower', title: 'Tower Escape', desc: '떨어지는 장애물을 피해 위로 올라가세요!' },
];

const HomePage: FC = () => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 p-8">
    <div className="text-center mb-10">
      <h1 className="text-5xl font-extrabold text-purple-600 mb-3">Jugland</h1>
      <p className="text-lg text-gray-700">전 세계 최고의 미니게임을 지금 바로 즐겨보세요!</p>
    </div>
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((game) => (
        <Link
          key={game.id}
          to={`/game/${game.id}`}
          className="bg-white/80 rounded-xl p-6 shadow hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition flex flex-col"
        >
          <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
          <p className="mb-4 text-gray-600">{game.desc}</p>
          <span className="mt-auto inline-block px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full w-fit">
            Play
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export default HomePage;
