import Button from './Button';

export default function LearnSection() {
  return (
    <section id="learn" className="bg-gray-800 text-white py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Learn</h2>
        <p className="text-lg mb-6">
          Want to dive deeper into TipJar+ and Web3? Visit our knowledge center for tutorials, tips, and more.
        </p>
        <Button variant="secondary" size="md">Visit Knowledge Center</Button>
      </div>
    </section>
  );
}
