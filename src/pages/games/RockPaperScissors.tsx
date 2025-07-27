import { useState } from 'react';

const options = ['가위', '바위', '보'] as const;

type Option = typeof options[number];

const RockPaperScissors = () => {
  const [user, setUser] = useState<Option | null>(null);
  const [cpu, setCpu] = useState<Option | null>(null);
  const [result, setResult] = useState('');

  const play = (choice: Option) => {
    const cpuChoice = options[Math.floor(Math.random() * 3)];
    setUser(choice);
    setCpu(cpuChoice);

    if (choice === cpuChoice) setResult('비겼습니다');
    else if (
      (choice === '가위' && cpuChoice === '보') ||
      (choice === '바위' && cpuChoice === '가위') ||
      (choice === '보' && cpuChoice === '바위')
    )
      setResult('승리!');
    else setResult('패배...');
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Rock Paper Scissors</h2>
      <div className="space-x-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => play(o)}
            className="bg-purple-500 text-white px-4 py-2 rounded"
          >
            {o}
          </button>
        ))}
      </div>
      {user && cpu && (
        <p className="mt-4">
          당신: {user} / 컴퓨터: {cpu} - {result}
        </p>
      )}
    </div>
  );
};

export default RockPaperScissors;
