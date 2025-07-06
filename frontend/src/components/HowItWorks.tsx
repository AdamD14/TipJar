const HowItWorks = () => (
  <section id="how" className="py-16 bg-tipjar-dark text-white">
    <h2 className="text-3xl font-title text-tipjar-gold text-center mb-12">How TipJar+ Works</h2>
    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto px-6">
      <div>
        <h3 className="text-2xl font-title text-tipjar-gold mb-4">For Creators</h3>
        <ul className="space-y-3">
          <li><strong>Sign Up:</strong> Create an account using email or Web3 wallet.</li>
          <li><strong>Build Page:</strong> Customize your personal tipping page.</li>
          <li><strong>Share & Earn:</strong> Share the link and receive tips in USDC.</li>
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-title text-tipjar-gold mb-4">For Fans</h3>
        <ul className="space-y-3">
          <li><strong>Find Creator:</strong> Visit your favorite creator’s TipJar page.</li>
          <li><strong>Send Tip:</strong> Choose amount and confirm with one click.</li>
          <li><strong>Feel Good:</strong> Tips are instant and global via USDC.</li>
        </ul>
      </div>
    </div>
  </section>
)
export default HowItWorks;

