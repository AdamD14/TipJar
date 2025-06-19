// src/components/Examples.tsx
import Image from 'next/image';

const Examples = () => (
  <section id="examples" className="py-16 bg-tipjar-dark text-white">
    <h2 className="text-3xl font-title text-tipjar-gold text-center mb-12">See TipJar+ in Action</h2>
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
      {["aliceart", "bobbass", "cookcarol"].map((creator, i) => (
        <div key={i} className="relative group border border-tipjar-gold rounded-lg overflow-hidden shadow-md">
          <Image
            src={`/assets/examples/${creator}.png`}
            alt={`Example of ${creator}`}
            className="w-full object-cover"
            width={400}
            height={300}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="text-whiteish font-semibold">View Page &rarr;</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Examples;
