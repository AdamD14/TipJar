import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#003737] text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">TipJar+</Link>
      <nav className="space-x-4">
        <Link href="/explore" className="px-3 hover:text-[#FFD700]">Explore</Link>
        <Link href="/login" className="px-3 hover:text-[#FFD700]">Login</Link>
        <Link href="/signup" className="px-3 hover:text-[#FFD700]">Sign Up</Link>
      </nav>
    </header>
  );
}
