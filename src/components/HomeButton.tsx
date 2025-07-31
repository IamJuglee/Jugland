import { FC } from 'react';
import { Link } from 'react-router-dom';

const HomeButton: FC = () => (
  <Link
    to="/"
    className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white shadow hover:opacity-90 transition"
  >
    ← 홈으로
  </Link>
);

export default HomeButton;
