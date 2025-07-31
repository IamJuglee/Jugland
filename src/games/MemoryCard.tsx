import { FC, useEffect, useState } from 'react';
import GameLayout from '../components/GameLayout';

interface Card {
  id: number;
  icon: string;
  flipped: boolean;
  matched: boolean;
}

const icons = ['🍎', '🍌', '🍇', '🍓', '🍑', '🍍'];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const MemoryCard: FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);

  useEffect(() => {
    const deck: Card[] = shuffle([...icons, ...icons]).map((icon, i) => ({
      id: i,
      icon,
      flipped: false,
      matched: false,
    }));
    setCards(deck);
  }, []);

  const handleClick = (idx: number) => {
    if (flipped.length === 2) return;
    setCards((prev) => {
      const c = [...prev];
      const card = c[idx];
      if (card.flipped || card.matched) return prev;
      card.flipped = true;
      const newFlipped = [...flipped, idx];
      setFlipped(newFlipped);
      if (newFlipped.length === 2) {
        const [a, b] = newFlipped;
        if (c[a].icon === c[b].icon) {
          c[a].matched = c[b].matched = true;
          setFlipped([]);
        } else {
          setTimeout(() => {
            setCards((p) => {
              const d = [...p];
              d[a].flipped = false;
              d[b].flipped = false;
              return d;
            });
            setFlipped([]);
          }, 1000);
        }
      }
      return c;
    });
  };

  return (
    <GameLayout title="Memory Card">
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, i) => (
          <button
            key={card.id}
            className="w-16 h-16 bg-blue-200 flex items-center justify-center rounded"
            onClick={() => handleClick(i)}
          >
            {(card.flipped || card.matched) && <span className="text-2xl">{card.icon}</span>}
          </button>
        ))}
      </div>
    </GameLayout>
  );
};

export default MemoryCard;
