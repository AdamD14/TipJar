export default function HowSection() {
  return (
    <section id="how" className="py-16 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">How it works</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-200">
          <li>
            <span className="font-semibold text-white">Creator signs up</span> and gets a personal TipJar link to receive tips.
          </li>
          <li>
            <span className="font-semibold text-white">Fan sends a tip</span> via TipJar+ using USDC (even without creating an account).
          </li>
          <li>
            <span className="font-semibold text-white">Creator receives the tip instantly</span> in their digital wallet, with no middlemen.
          </li>
        </ol>
      </div>
    </section>
  );
}
