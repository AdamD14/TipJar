import { FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 text-sm py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-white font-bold text-xl mb-2">
            TipJar<span className="text-tj-gold">+</span>
          </h3>
          <p>© 2025 TipJar+. All rights reserved.</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-white font-semibold mb-2">Platform</h4>
          <ul>
            <li>
              <a href="#explore" className="hover:text-gray-200">
                Explore
              </a>
            </li>
            <li>
              <a href="#learn" className="hover:text-gray-200">
                Learn
              </a>
            </li>
            <li>
              <a href="#hero" className="hover:text-gray-200">
                Home
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-white font-semibold mb-2">About</h4>
          <ul>
            <li>
              <a href="#" className="hover:text-gray-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h4 className="text-white font-semibold mb-2">Support</h4>
          <ul>
            <li>
              <a href="#" className="hover:text-gray-200">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">
                Feedback
              </a>
            </li>
          </ul>
        </div>
        <div className="md:text-right">
          <h4 className="text-white font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 justify-start md:justify-end text-xl">
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-8 text-center text-gray-500">
        Powered by <span className="text-white font-semibold">Circle</span> – enabling secure USDC transactions
      </div>
    </footer>
  );
}
