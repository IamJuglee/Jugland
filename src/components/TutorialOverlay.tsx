import { FC } from 'react';

interface TutorialOverlayProps {
  steps: string[];
  step: number;
  onNext: () => void;
  onSkip: () => void;
}

const TutorialOverlay: FC<TutorialOverlayProps> = ({ steps, step, onNext, onSkip }) => {
  const last = step === steps.length - 1;
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
      <button
        onClick={onSkip}
        className="absolute top-4 right-4 text-sm text-white underline"
      >
        건너뛰기
      </button>
      <div className="bg-white/90 rounded-lg p-6 text-center max-w-xs w-full">
        <p className="mb-6 text-lg font-semibold">{steps[step]}</p>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded w-full"
        >
          {last ? '게임 시작하기' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default TutorialOverlay;
