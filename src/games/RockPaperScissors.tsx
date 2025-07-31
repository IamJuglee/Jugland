import { FC, useState } from 'react';
import GameLayout from '../components/GameLayout';

const choices = ['가위', '바위', '보'];

const RockPaperScissors: FC = () => {
  const [result, setResult] = useState('');
  const [myChoice, setMyChoice] = useState('');
  const [comChoice, setComChoice] = useState('');

  const play = (choice: string) => {
    const com = choices[Math.floor(Math.random() * 3)];
    setMyChoice(choice);
    setComChoice(com);
    if (choice === com) setResult('무승부');
    else if (
      (choice === '가위' && com === '보') ||
      (choice === '바위' && com === '가위') ||
      (choice === '보' && com === '바위')
    )
      setResult('승리');
    else setResult('패배');
  };

  return (
    <GameLayout title="Rock Paper Scissors">
      <div className="space-x-2 mb-4">
        {choices.map((c) => (
          <button
            key={c}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            onClick={() => play(c)}
          >
            {c}
          </button>
        ))}
      </div>
      {result && (
        <div className="text-center mt-4">
          <p>나: {myChoice} / 컴퓨터: {comChoice}</p>
          <p className="text-xl font-bold">{result}</p>
        </div>
      )}
    </GameLayout>
  );
};

export default RockPaperScissors;
