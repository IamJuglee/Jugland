import { useState } from 'react';

const ReactionTimeGame = () => {
  const [started, setStarted] = useState(false);
  const [color, setColor] = useState('bg-red-500');
  const [message, setMessage] = useState('버튼을 눌러 시작하세요');
  const [startTime, setStartTime] = useState(0);

  const start = () => {
    setStarted(true);
    setMessage('초록색이 되면 클릭!');
    const delay = Math.random() * 2000 + 1000;
    setTimeout(() => {
      setColor('bg-green-500');
      setStartTime(Date.now());
    }, delay);
  };

  const click = () => {
    if (!started || color !== 'bg-green-500') return;
    const reaction = Date.now() - startTime;
    setMessage(`반응 속도: ${reaction}ms`);
    setStarted(false);
    setColor('bg-red-500');
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Reaction Time</h2>
      <button
        onClick={started ? click : start}
        className={`w-32 h-32 text-white ${color}`}
      >
        {message}
      </button>
    </div>
  );
};

export default ReactionTimeGame;
