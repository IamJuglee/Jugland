import { FC, useEffect, useState } from 'react';
import GameLayout from '../components/GameLayout';

const DURATION = 5; // seconds

const ClickSpeedTest: FC = () => {
  const [stage, setStage] = useState<'ready' | 'playing' | 'done'>('ready');
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (stage === 'playing') {
      timer = setTimeout(() => setStage('done'), DURATION * 1000);
    }
    return () => clearTimeout(timer);
  }, [stage]);

  const start = () => {
    setCount(0);
    setStage('playing');
  };

  const click = () => {
    if (stage === 'playing') setCount((c) => c + 1);
  };

  return (
    <GameLayout title="Click Speed Test">
      {stage === 'ready' && (
        <button
          onClick={start}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          시작
        </button>
      )}
      {stage === 'playing' && (
        <button
          onClick={click}
          className="px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          클릭!
        </button>
      )}
      {stage === 'done' && (
        <div className="text-center">
          <p className="mb-2 text-xl">결과: {count}회</p>
          <button
            onClick={() => setStage('ready')}
            className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded"
          >
            다시하기
          </button>
        </div>
      )}
    </GameLayout>
  );
};

export default ClickSpeedTest;
