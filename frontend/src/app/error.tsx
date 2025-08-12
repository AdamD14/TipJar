"use client";
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="grid min-h-screen place-items-center bg-[#1a1034] p-6 text-white">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-extrabold">Well, that escalated quickly (500).</h2>
          <p className="mt-2 text-white/80">{error.message || "Something went wrong."}</p>
          <button onClick={() => reset()} className="mt-4 rounded-xl bg-[#6B46C1] px-4 py-2 font-semibold">Try again</button>
        </div>
      </body>
    </html>
  );
}
