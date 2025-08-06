import Link from "next/link";

const CTASection = () => (
  <section className="bg-[#ffd700] text-[#2e004f] py-16 text-center">
    <h2 className="text-3xl font-bold mb-6 slide-up-fade">Start earning today</h2>
    <Link
      href="/auth"
      className="inline-block bg-[#2e004f] text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition pulse-gold"
    >
      Create your TipJar
    </Link>
  </section>
);

export default CTASection;
