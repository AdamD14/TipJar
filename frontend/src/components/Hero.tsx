const Hero = () => (
  <section className="h-screen bg-tipjar-main flex flex-col justify-center items-center text-center px-4">
    <h1 className="text-5xl font-title text-tipjar-gold mb-4 animate-fadeIn">TipIT</h1>
    <p className="text-xl max-w-xl text-whiteish mb-6">Start building your page with TipJar+ and accept USDC tips in 60 seconds.</p>
    <div className="flex gap-4">
      <button className="bg-tipjar-gold text-tipjar-dark px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">Sign Up as Creator</button>
      <button className="border border-tipjar-gold text-tipjar-gold px-6 py-3 rounded-lg hover:bg-tipjar-gold hover:text-tipjar-dark transition">Discover Creators</button>
    </div>
  </section>
)
export default Hero;
