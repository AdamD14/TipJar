import Image from "next/image";
import clsx from "clsx";

const CREATORS = ["aliceart", "bobbass", "cookcarol"] as const;

export default function Examples() {
  return (
    <section id="examples" className="py-16 bg-surface-app text-text-ds-primary">
      <h2 className="text-3xl font-heading font-bold text-gold-400 text-center mb-12">
        See TipJar+ in Action
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {CREATORS.map((creator) => (
          <div
            key={creator}
            className={clsx(
              "relative group",
              "border border-gold-400 rounded-lg overflow-hidden",
              "shadow-1",
              "transition-all duration-200 ease-standard",
              "hover:-translate-y-1.5 hover:shadow-2 hover:shadow-gold-glow",
            )}
          >
            <Image
              src={`/assets/examples/${creator}.png`}
              alt={`Example of ${creator}`}
              className="w-full object-cover"
              width={400}
              height={300}
            />
            <div
              className={clsx(
                "absolute inset-0",
                "bg-teal-900/60",
                "flex items-center justify-center",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-200",
              )}
            >
              <span className="text-text-ds-primary font-heading font-semibold">
                View Page &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
