import Button from './Button';

export default function ExploreSection() {
  return (
    <section id="explore" className="bg-tj-turquoise text-white py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Explore Creators</h2>
        <p className="text-lg mb-6">
          Support your favorite creators with as little as <span className="text-tj-gold font-semibold">$1</span>,
          without even creating an account – enjoy instant, borderless tips via USDC!
        </p>
        <Button variant="primary" size="md">Browse Creators</Button>
      </div>
    </section>
  );
}
