import { useState } from 'react';

const GuessNumberGame = () => {
  const [target] = useState(() => Math.ceil(Math.random() * 5));
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const checkGuess = () => {
    const num = Number(guess);
    if (num === target) {
      setMessage('정답입니다!');
    } else {
      setMessage('틀렸어요. 다시 시도하세요.');
    }
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Guess Number 1~5</h2>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={checkGuess}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Guess
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default GuessNumberGame;
