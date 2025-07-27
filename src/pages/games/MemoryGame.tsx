import { useState } from 'react';

type Card = {
  id: number;
  value: string;
  flipped: boolean;
  matched: boolean;
};

const initialCards: Card[] = [
  { id: 1, value: '🍎', flipped: false, matched: false },
  { id: 2, value: '🍎', flipped: false, matched: false },
  { id: 3, value: '🍌', flipped: false, matched: false },
  { id: 4, value: '🍌', flipped: false, matched: false },
];

const shuffle = (array: Card[]) => {
  return array.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(() => shuffle([...initialCards]));
  const [selected, setSelected] = useState<Card[]>([]);

  const flip = (card: Card) => {
    if (card.flipped || card.matched || selected.length === 2) return;
    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    const newSelected = [...selected, { ...card, flipped: true }];
    setCards(newCards);
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setTimeout(() => {
        const [a, b] = newSelected;
        if (a.value === b.value) {
          setCards((prev) =>
            prev.map((c) =>
              c.value === a.value ? { ...c, matched: true } : c
            )
          );
        } else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === a.id || c.id === b.id ? { ...c, flipped: false } : c
            )
          );
        }
        setSelected([]);
      }, 800);
    }
  };

  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Memory Game</h2>
      <div className="grid grid-cols-4 gap-4 justify-center">
        {cards.map((card) => (
          <button
            key={card.id}
            className="w-12 h-12 bg-gray-200 text-2xl"
            onClick={() => flip(card)}
          >
            {card.flipped || card.matched ? card.value : '?'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
