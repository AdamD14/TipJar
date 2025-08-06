import { Button } from "./Button";

const Hero = () => (
  <section className="h-screen bg-tipjar-main flex flex-col justify-center items-center text-center px-4">
    <h1 className="text-5xl font-title text-tipjar-gold mb-4 animate-fadeIn">TipIT</h1>
    <p className="text-xl max-w-xl text-whiteish mb-6">Start building your page with TipJar+ and accept USDC tips in 60 seconds.</p>
    <div className="flex gap-4">
      <Button
        variant="gradient"
        href="/signup"
        className="from-orange-500 to-yellow-400 text-black"
      >
        Sign Up as Creator
      </Button>
      <Button
        variant="gradient"
        href="/explore"
        className="from-purple-600 to-fuchsia-600"
      >
        Explore as fun
      </Button>
    </div>
  </section>
);

export default Hero;
