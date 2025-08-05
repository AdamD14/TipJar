import Link from 'next/link';

export const SecondaryButton = () => {
  return (
    <Link
      href="/explore"
      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold shadow-md hover:scale-[1.03] transition-transform"
    >
      Explore as fun
    </Link>
  );
};

