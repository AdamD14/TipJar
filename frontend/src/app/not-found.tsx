import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        <h1 className="text-4xl font-extrabold">Lost in the jar (404)</h1>
        <p className="mt-2 text-white/80">The page you’re looking for took a tip break.</p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-xl border border-white/20 px-4 py-2 hover:bg-white/10"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
