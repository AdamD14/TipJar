export default function LearnPage() {
  const articles = [
    { title: "What is TipJar+?", href: "#" },
    { title: "How to receive your first USDC tip", href: "#" },
    { title: "NFT badges: Proof of Support", href: "#" },
    { title: "Fees and transparency", href: "#" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold">Learn</h1>
      <ul className="mt-4 space-y-3">
        {articles.map((a) => (
          <li
            key={a.title}
            className="rounded-2xl border border-white/10 bg-[#140a2a] p-4"
          >
            <a href={a.href} className="hover:underline">
              {a.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
