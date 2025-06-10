import React, { useState, useEffect } from 'react';

// === ICONS (Inline SVG for easy styling with Tailwind) ===
// Using Heroicons (https://heroicons.com/) and custom icons for this example.
const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
);
const InstagramIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.485 3.66a11.42 11.42 0 012.427-.465C8.933 2.013 9.287 2 12.315 2zm-1.163 1.943h-.004c-1.562.004-2.822 1.262-2.822 2.822s1.26 2.822 2.822 2.822 2.822-1.26 2.822-2.822-.004-1.562-2.822-2.822zM12 16.25a4.25 4.25 0 110-8.5 4.25 4.25 0 010 8.5zm5.85-8.803a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" clipRule="evenodd"></path></svg>
);
const YouTubeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2.002 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.94 15.58V8.42l5.58 3.58-5.58 3.58z" clipRule="evenodd"></path></svg>
);

const UsdcLogo = () => (
    <svg className="w-6 h-6 inline-block" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#2775CA"/>
        <path d="M16.1436 24.3638C20.7316 24.3638 24.4796 20.6158 24.4796 16.0278C24.4796 11.4398 20.7316 7.69177 16.1436 7.69177C11.5556 7.69177 7.80762 11.4398 7.80762 16.0278C7.80762 20.6158 11.5556 24.3638 16.1436 24.3638Z" fill="white"/>
        <path d="M18.0448 18.6684H14.2428V20.8284H18.0448C18.8288 20.8284 19.4688 20.1884 19.4688 19.4044V18.0444C19.4688 18.3324 18.8288 18.6684 18.0448 18.6684Z" fill="#2775CA"/>
        <path d="M19.4688 13.996C19.4688 13.212 18.8288 12.572 18.0448 12.572H14.2428V14.732H18.0448C18.8288 14.732 19.4688 14.78 19.4688 13.996Z" fill="#2775CA"/>
        <path d="M19.9996 16.75C20.0476 17.534 19.4076 18.174 18.6236 18.174H14.2436V11.2219H18.6236C19.4076 11.2219 20.0476 11.8619 19.9996 12.6459V13.9959C19.9996 14.7799 19.4076 15.4679 18.6236 15.4679H15.8396V15.4199H18.6236C19.4076 15.4199 19.9996 15.9639 19.9996 16.75Z" fill="#2775CA"/>
    </svg>
);


// === COMPONENTS ===

/**
 * Goal Progress Bar Component
 * Displays the creator's current funding goal.
 * @param {object} props - Component props.
 * @param {number} props.raised - The amount raised so far.
 * @param {number} props.goal - The target goal amount.
 * @param {string} props.title - The title of the goal.
 */
const GoalProgressBar = ({ raised, goal, title }) => {
  const [progress, setProgress] = useState(0);

  // Animate the progress bar fill on component mount
  useEffect(() => {
    const percentage = Math.min((raised / goal) * 100, 100);
    // Use a timeout to ensure the transition is visible
    const timer = setTimeout(() => setProgress(percentage), 100);
    return () => clearTimeout(timer);
  }, [raised, goal]);

  return (
    <div className="w-full bg-main-dark rounded-xl p-4 md:p-6">
      <h3 className="text-lg font-semibold font-montserrat text-accent-gold mb-3">{title}</h3>
      <div className="w-full bg-main-deep h-4 rounded-full overflow-hidden">
        <div
          className="bg-accent-gold h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mt-2 font-opensans">
        <span className="text-accent-gold font-semibold">${raised.toLocaleString()}</span>
        <span className="text-text-light/70">Goal: ${goal.toLocaleString()} USDC</span>
      </div>
    </div>
  );
};


/**
 * Tipping Section Component
 * The main interactive area for sending a tip.
 * @param {object} props - Component props.
 * @param {function} props.onTip - Function to call when tip button is clicked.
 */
const TippingSection = ({ onTip }) => {
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState('');
  const [showMeassage, setShowMessage] = useState(false);
  const quickAmounts = [1, 5, 10, 25];

  const handleSliderChange = (e) => {
    setAmount(parseInt(e.target.value, 10));
  };
  
  const handleTipSubmit = () => {
    console.log(`Tipping: ${amount} USDC with message: "${message}"`);
    // In a real app, this would trigger the payment modal flow.
    onTip({amount, message});
  }

  return (
    <div className="w-full bg-main-dark rounded-xl p-4 sm:p-6 md:p-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold font-montserrat text-accent-gold mb-2">
        Show Your Support!
      </h2>
      <p className="text-text-light/80 mb-6 font-opensans">Send a tip in stable USDC <UsdcLogo /></p>

      {/* Amount Display */}
      <div className="mb-4">
        <span className="text-5xl md:text-6xl font-bold font-montserrat text-accent-gold">
          ${amount}
        </span>
      </div>

      {/* Amount Slider */}
      <div className="mb-6">
        <input
          type="range"
          min="1"
          max="100"
          value={amount}
          onChange={handleSliderChange}
          className="w-full h-2 bg-main-deep rounded-lg appearance-none cursor-pointer accent-accent-gold"
        />
      </div>

      {/* Quick Amount Buttons */}
      <div className="flex justify-center gap-2 md:gap-4 mb-6">
        {quickAmounts.map((quickAmount) => (
          <button
            key={quickAmount}
            onClick={() => setAmount(quickAmount)}
            className={`px-4 py-2 rounded-lg font-semibold font-opensans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-main-dark focus:ring-accent-gold
              ${amount === quickAmount 
                ? 'bg-accent-gold text-main-deep scale-105 shadow-lg' 
                : 'bg-main-deep text-accent-gold hover:bg-main-deep/70'
              }`}
          >
            ${quickAmount}
          </button>
        ))}
      </div>
      
      {/* Message Field */}
       <div className="mb-6">
        {!showMeassage ? (
          <button 
            onClick={() => setShowMessage(true)}
            className="text-accent-gold hover:text-white transition-colors font-opensans"
          >
            + Add a message
          </button>
        ) : (
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your supportive message... (optional)"
            className="w-full p-3 bg-main-deep border-2 border-transparent rounded-lg text-text-light placeholder-text-light/50 focus:outline-none focus:border-accent-gold transition-colors font-opensans"
            rows="3"
          ></textarea>
        )}
      </div>


      {/* Main CTA Button */}
      <button 
        onClick={handleTipSubmit}
        className="w-full md:w-auto px-12 py-4 bg-accent-gold text-main-deep text-xl font-bold font-montserrat rounded-xl shadow-lg
                   transform hover:scale-105 hover:shadow-accent-gold/30 transition-all duration-300 ease-in-out
                   focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-main-dark focus:ring-accent-gold"
      >
        TipIT!
      </button>
    </div>
  );
};


/**
 * The main component for the Creator's Public Profile Page.
 * This component brings all other pieces together.
 */
const CreatorProfilePage = () => {
    
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tipDetails, setTipDetails] = useState({amount: 0, message: ''});
    
  const handleTip = (details) => {
      setTipDetails(details);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 4000); // Hide after 4 seconds
  }
    
  // Mock data for the creator
  const creator = {
    name: 'Helena Rowe',
    username: '@helena_art',
    avatarUrl: 'https://placehold.co/150x150/E0F2F1/006D6D?text=H',
    bannerUrl: 'https://placehold.co/1200x300/004C4C/FFD700?text=Abstract+Art',
    bio: 'Digital artist & illustrator exploring the frontier of creativity. Your support fuels my passion and helps me create more art for the world. Powered by USDC!',
    goal: {
      title: 'New Wacom Cintiq Pro 27',
      raised: 750,
      target: 1000,
    },
    socials: [
      { name: 'Twitter', icon: <TwitterIcon />, url: '#' },
      { name: 'Instagram', icon: <InstagramIcon />, url: '#' },
      { name: 'YouTube', icon: <YouTubeIcon />, url: '#' },
    ],
  };

  return (
    <div className="bg-main-deep min-h-screen font-sans text-text-light">
      {/* This div adds the color scheme and fonts to the whole page. */}
      {/* In a real Next.js app, this would be in _app.js or layout.js. */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&display=swap');
        
        :root {
          --color-main-deep: #004C4C;
          --color-main-dark: #006D6D;
          --color-main-light: #008080;
          --color-accent-gold: #FFD700;
          --color-accent-gold-darker: #B8860B;
          --color-text-light: #E0F2F1;
          --color-text-dark: #004C4C;
        }

        .font-montserrat { font-family: 'Montserrat', sans-serif; }
        .font-opensans { font-family: 'Open Sans', sans-serif; }
        
        .bg-main-deep { background-color: var(--color-main-deep); }
        .bg-main-dark { background-color: var(--color-main-dark); }
        .bg-main-light { background-color: var(--color-main-light); }
        .bg-accent-gold { background-color: var(--color-accent-gold); }
        
        .text-accent-gold { color: var(--color-accent-gold); }
        .text-text-light { color: var(--color-text-light); }
        .text-main-deep { color: var(--color-main-deep); }

        .border-accent-gold { border-color: var(--color-accent-gold); }
        .accent-accent-gold { accent-color: var(--color-accent-gold); }

        .shadow-accent-gold\\/30 { box-shadow: 0 10px 20px -5px rgba(255, 215, 0, 0.3); }

        /* Animation for the "breathing" avatar border */
        @keyframes breathing {
          0%, 100% { 
            box-shadow: 0 0 10px 0px var(--color-accent-gold);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 20px 5px var(--color-accent-gold);
            transform: scale(1.02);
          }
        }
        .animate-breathing {
          animation: breathing 5s ease-in-out infinite;
        }
      `}</style>
      
      {/* Tip Confirmation Toast */}
      {showConfirmation && (
          <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-pulse">
              Tip of ${tipDetails.amount} sent to {creator.name}! Thank you!
          </div>
      )}

      <main className="max-w-4xl mx-auto p-4">
        {/* --- Banner --- */}
        <div className="h-48 md:h-64 rounded-xl overflow-hidden mb-[-75px] shadow-lg">
          <img src={creator.bannerUrl} alt={`${creator.name}'s banner`} className="w-full h-full object-cover" />
        </div>

        {/* --- Creator Info Header --- */}
        <div className="relative text-center px-4">
          {/* Avatar */}
          <div className="inline-block">
            <img
              src={creator.avatarUrl}
              alt={`${creator.name}'s avatar`}
              className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-accent-gold object-cover
                         mx-auto shadow-2xl animate-breathing"
            />
          </div>

          {/* Name, Username, Bio */}
          <h1 className="text-3xl md:text-4xl font-bold font-montserrat mt-4">{creator.name}</h1>
          <p className="text-text-light/70 font-opensans text-lg">{creator.username}</p>
          <p className="max-w-2xl mx-auto mt-4 text-text-light/90 font-opensans">
            {creator.bio}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-4">
            {creator.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold hover:text-white transition-transform duration-200 hover:scale-110"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* --- Content Area (Goal & Tipping) --- */}
        <div className="mt-8 space-y-8">
          {/* Goal Section */}
          <GoalProgressBar
            title={creator.goal.title}
            raised={creator.goal.raised}
            goal={creator.goal.target}
          />

          {/* Tipping Section */}
          <TippingSection onTip={handleTip} />
        </div>
        
        {/* --- Footer --- */}
        <footer className="text-center p-8 mt-8 text-text-light/50 font-opensans">
            <p>Powered by TipJar.plus</p>
        </footer>
      </main>
    </div>
  );
};

// The default export for the component
export default CreatorProfilePage;

