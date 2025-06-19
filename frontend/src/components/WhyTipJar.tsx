const WhyTipJar = () => (
  <section id="why" className="py-16 bg-tipjar-main text-white">
    <h2 className="text-3xl font-title text-tipjar-gold text-center mb-12">Why TipJar+?</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
      {[
        { title: 'Low Fees', desc: 'Only 1% platform fee. Keep 99% of your tips.' },
        { title: 'Global & Instant', desc: 'Receive tips from anywhere, instantly.' },
        { title: 'Secure & Stable', desc: 'Backed by USDC - secure and stable tips.' },
        { title: 'Simple Interface', desc: 'No crypto skills needed to get started.' },
      ].map((item, i) => (
        <div key={i} className="bg-tipjar-dark p-6 rounded-lg shadow-md hover:scale-105 transition">
          <h3 className="text-xl text-tipjar-gold font-title mb-2">{item.title}</h3>
          <p className="text-whiteish">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
)
export default WhyTipJar;
