import { FaStar, FaGlobe, FaBolt, FaPuzzlePiece } from 'react-icons/fa';

export default function WhySection() {
  return (
    <section id="why" className="bg-tj-turquoise text-white py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Why TipJar+?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <FaStar className="text-tj-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Low Fees</h3>
            <p className="text-sm text-gray-300">
              Only ~7% platform fee, compared to 20-30% on other platforms.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaGlobe className="text-tj-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-sm text-gray-300">
              Support creators worldwide with USDC from anywhere in the world.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaBolt className="text-tj-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
            <p className="text-sm text-gray-300">
              Tips are delivered instantly to creators’ wallets – no waiting, no banks.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FaPuzzlePiece className="text-tj-gold text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
            <p className="text-sm text-gray-300">
              Just share a link or embed a widget – no complicated setup or tech skills needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
