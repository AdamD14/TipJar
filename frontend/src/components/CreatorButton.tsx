import Link from 'next/link';

export const CreatorButton = () => {
  return (
    <Link
      href="/signup"
      className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold shadow-md hover:scale-[1.03] transition-transform"
    >
      Begin as a creator
    </Link>
  );
};
