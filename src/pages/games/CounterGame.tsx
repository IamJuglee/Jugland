import { useState } from 'react';

const CounterGame = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Counter Game</h2>
      <p className="mb-4">Score: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Click me
      </button>
    </div>
  );
};

export default CounterGame;
