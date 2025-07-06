const Navbar = () => (
  <nav className="w-full fixed z-50 top-0 bg-tipjar-dark text-white py-4 px-6 flex justify-between items-center shadow-md">
    <div className="font-title text-2xl text-tipjar-gold">TipJar+</div>
    <div className="hidden md:flex gap-6">
      <a href="#how" className="hover:underline">How it Works</a>
      <a href="#why" className="hover:underline">Why</a>
      <a href="#examples" className="hover:underline">Examples</a>
      <a href="#signup" className="hover:underline">Login</a>
    </div>
    <button className="bg-tipjar-gold text-tipjar-dark px-4 py-2 rounded hover:scale-105 transition">Sign Up</button>
  </nav>
)
export default Navbar;
