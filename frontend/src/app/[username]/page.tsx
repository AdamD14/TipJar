"use client";


import {
  Users,
  DollarSign,
  X,
  CreditCard,
  Wallet,
  ChevronRight,
  ChevronLeft,
  QrCode,
  Twitter,
  Youtube,
  Twitch,
  PlusCircle,
  Linkedin,
  Gift,
  Copy,
  Heart,
  CalendarDays,
  GalleryHorizontal,
  Info,
  CheckCircle
} from "lucide-react";

interface SupportHistoryItem {
  id: number;
  name: string;
  amount: number;
  time: string;
  avatar: string;
  message?: string;
}

const supportHistory: SupportHistoryItem[] = [
  { id: 1, name: "CreativeFan123", amount: 10, time: "2 hours ago", avatar: "https://randomuser.me/api/portraits/men/22.jpg", message: "Love your work!" },
  { id: 2, name: "Anonymous", amount: 5, time: "5 hours ago", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: 3, name: "ArtSupporter", amount: 25, time: "1 day ago", avatar: "https://randomuser.me/api/portraits/men/44.jpg", message: "Keep creating amazing content!" },
];

const PaymentIcon: FC<{ name: string; children: ReactNode }> = ({
  name,
  children,
}) => (
  <div
    title={name}
    className="flex items-center justify-center bg-white bg-opacity-10 rounded-lg p-1 hover:bg-opacity-20 transition-all"
  >
    {children}
  </div>
);

interface AvatarCarouselProps {
  images: string[];
  className?: string;
}

const AvatarCarousel: FC<AvatarCarouselProps> = ({ images, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className={`relative w-48 h-64 md:w-60 md:h-80 overflow-hidden rounded-xl border-4 border-teal-500 shadow-[0_0_0_4px_white,0_0_0_6px_#14b8a6] ${className}`}>
      <img
        src={images[currentIndex]}
        alt="Creator Avatar"
        className="w-full h-full object-cover rounded-xl"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-transparent text-teal-500 p-1 rounded-full hover:bg-teal-500 hover:bg-opacity-20 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent text-teal-500 p-1 rounded-full hover:bg-teal-500 hover:bg-opacity-20 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
      <div className="absolute bottom-2 right-2 bg-teal-500 rounded-full p-1 border-2 border-white shadow-md">
        <CheckCircle className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};


const CreatorProfilePage = () => {
  const [activeContentTab, setActiveContentTab] = useState<"about" | "content" | "events" | "funding">("about");

  const [tipAmount, setTipAmount] = useState<number>(10);
  const [message, setMessage] = useState<string>("");


  const creatorAvatarUrls = [
    "/assets/ja1.png",
    "/assets/ja2.png",
    "/assets/ja3.png",
  ];

  const fundingGoal = 1000;
  const currentFunding = 650;
  const fundingProgress = (currentFunding / fundingGoal) * 100;

  // New state for the preview funding goal
  const previewFundingGoal = 1000000;
  const previewCurrentFunding = 1000;
  const previewFundingProgress = 1; // User requested 1%

  useEffect(() => {
    setShowTipPanel(false);
  }, [activeContentTab]);

  const handleTipSubmit = () => {
    setShowTipPanel(true);
  };

  const handlePayment = (method: string) => {
    console.log(
      `Paying ${tipAmount} USDC with method: ${method} with message: ${message}`
    );
    setShowTipPanel(false);
    setTipAmount(10);
    setMessage("");
  };

  const copyToClipboard = (text: string) => {
    document.execCommand('copy');
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert('Adres został skopiowany do schowka!');
  };

  const sliderBackground = {
    background: `linear-gradient(to right, #14b8a6 0%, #8b5cf6 ${((tipAmount - 0.1) / (20 - 0.1)) * 100}%, #e5e7eb ${((tipAmount - 0.1) / (20 - 0.1)) * 100}%, #e5e7eb 100%)`,
  };


return (
  <div className="min-h-screen w-full bg-gray-50 font-sans">
    {/* Container for background image and profile info section */}
    <div className="relative">
      {/* Parallax background image */}
      <div
        className="h-64 w-full bg-[url('/assets/tlo.png')] bg-cover bg-center bg-fixed"
      ></div>

      {/* Profile Info Section - positioned to overlap the background */}
      <div className="container mx-auto px-8 -mt-32 relative z-10 flex flex-col md:flex-row items-start justify-between gap-12">
        <AvatarCarousel images={creatorAvatarUrls} />
        {/* New flex container for the name/buttons and tip panel */}
        <div className="flex-1 flex flex-col md:flex-row justify-between items-start gap-6 mt-32">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900">Adam Duda</h1>
            <p className="text-gray-600 mt-1">Founder of tipjar.plus</p>
            <div className="flex flex-col md:flex-row md:items-start gap-4 mt-3">
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center text-gray-700">
                  <Users className="w-4 h-4 mr-1 text-teal-500" />
                  <span>1.2K Followers</span>
                </div>
                <button className="h-10 w-36 font-bold text-gray-900 border-2 border-gray-900 bg-transparent px-2 py-1 rounded-lg hover:bg-gray-900 hover:text-white transition-colors duration-300 flex items-center justify-center text-lg">
                  <PlusCircle className="w-6 h-6 mr-1" /> Follow
                </button>
              </div>
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex items-center text-gray-700">
                  <Heart className="w-4 h-4 mr-1 text-teal-500" />
                  <span>245 Supporters</span>
                </div>
                <button
                  onClick={handleTipSubmit}
                  className="h-10 w-36 bg-[#FFD700] text-gray-900 font-bold rounded-lg text-lg hover:scale-105 transition flex items-center justify-center border-2 border-gray-900 px-2 py-1">
                  <img src="/assets/icon-tipjarnone.svg" alt="Tip Jar Icon" className="w-8 h-8 mr-1" />
                  Tip it
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tip Panel OR Funding Goal Preview */}
      {showTipPanel ? (
        <div className="absolute top-[256px] right-8 w-96 bg-gray-100 text-gray-900 rounded-xl shadow-lg p-3 z-20">
          <button
            onClick={() => setShowTipPanel(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-1 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="mt-2">
            <input type="range" min="0.1" max="20" step="0.1" value={tipAmount} onChange={(e) => setTipAmount(parseFloat(e.target.value))} className="w-full h-[6px] rounded-lg appearance-none cursor-pointer" style={sliderBackground} />
          </div>
          <div className="mt-1 grid grid-cols-4 gap-2">
            {[1, 2, 5, 10].map((amount) => (
              <button
                key={amount}
                onClick={() => setTipAmount(amount)}
                className={`py-1 rounded-lg text-sm transition-colors ${
                  tipAmount === amount
                    ? 'w-full bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
          <div className="text-center mt-2">
            <button onClick={() => handlePayment("Direct Tip")} className="w-full font-bold bg-gradient-to-r from-teal-500 to-purple-500 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg inline-flex items-center justify-center gap-2 text-base">
              Tip ${tipAmount.toFixed(2)}
              <img src="/assets/logo_usdc_1.png" width={24} height={24} className="object-cover opacity-80" alt="USDC Logo" />
            </button>
          </div>
          <div className="mt-2 grid grid-cols-3 sm:grid-cols-6 gap-[4px] h-8">
            <PaymentIcon name="Google Pay">
              <img src="/assets/Google_Pay_Logo.svg" alt="Google Pay" width={24} height={24} className="object-contain"/>
            </PaymentIcon>
            <PaymentIcon name="Apple Pay">
              <img src="/assets/Apple_Pay_Mark_RGB.svg" alt="Apple Pay" width={24} height={24} className="object-contain"/>
            </PaymentIcon>
            <PaymentIcon name="Metamask">
              <img src="/assets/MetaMask-icon-fox.svg" alt="Metamask" width={24} height={24} className="object-contain"/>
            </PaymentIcon>
            <PaymentIcon name="Revolut">
              <img src="/assets/Revolut.svg" alt="Revolut" width={24} height={24} className="object-contain" />
            </PaymentIcon>
            <PaymentIcon name="WalletConnect">
              <img src="/assets/wc.svg" alt="WalletConnect" width={24} height={24} className="object-contain" />
            </PaymentIcon>
            <PaymentIcon name="Bank">
              <img src="/assets/bank-svgrepo-com.svg" alt="Bank" width={24} height={24} className="object-contain"/>
            </PaymentIcon>
          </div>
        </div>
      ) : (
        <div className="absolute top-[256px] right-8 w-96 bg-gray-100 text-gray-900 rounded-xl shadow-lg p-6 z-20">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Funding Goals</h2>
          <p className="text-gray-700 mb-4">
            Your support helps me get my first milion dolar
          </p>
          <div className="space-y-6">
            <div className="max-w-md">
              <div className="flex justify-between text-sm text-gray-700">
                <span>First Million Dollar</span>
                <span>{previewFundingProgress}%</span>
              </div>
              <div className="progress-bar mt-1">
                <div className="progress-fill" style={{ width: `${previewFundingProgress}%`, background: `linear-gradient(90deg, #14b8a6, #8b5cf6)` }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">${previewCurrentFunding} of ${previewFundingGoal} goal</div>
            </div>
          </div>
        </div>
      )}
    </div>


      {/* Main Content Section */}
      <div className="w-full px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Content */}
          <div className="flex-1">
            {/* Tab Navigation for My Content, Next Events, Funding, About Me */}
            <div className="flex gap-1 mb-6 bg-white rounded-xl shadow-sm p-2">
              <button
                onClick={() => setActiveContentTab("about")}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  activeContentTab === "about"
                    ? "bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Info className="w-4 h-4" /> About Me
              </button>
              <button
                onClick={() => setActiveContentTab("content")}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  activeContentTab === "content"
                    ? "bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <GalleryHorizontal className="w-4 h-4" /> My Content
              </button>
              <button
                onClick={() => setActiveContentTab("events")}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  activeContentTab === "events"
                    ? "bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <CalendarDays className="w-4 h-4" /> Next Events
              </button>
              <button
                onClick={() => setActiveContentTab("funding")}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  activeContentTab === "funding"
                    ? "bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <DollarSign className="w-4 h-4" /> Funding
              </button>
            </div>

            {/* Content based on activeContentTab */}
            {activeContentTab === "about" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About Me</h2>
                <p className="text-gray-700 mb-4">
                  Hey there! I'm Adam.
                </p>
                <p className="text-gray-700 mb-4">
                  Your supoport is fuel to build that site
                </p>

                {/* Social Links */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Find me on</h3>
                  <div className="flex flex-wrap gap-3">
                    <a href="#" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition flex items-center">
                      <Youtube className="w-5 h-5 text-red-500 mr-2" /> YouTube
                    </a>
                    <a href="#" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition flex items-center">
                      <Twitch className="w-5 h-5 text-purple-500 mr-2" /> Twitch
                    </a>
                    <a href="#" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition flex items-center">
                      <Twitter className="w-5 h-5 text-blue-400 mr-2" /> Twitter
                    </a>
                    <a href="#" className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition flex items-center">
                      <Linkedin className="w-5 h-5 text-blue-600 mr-2" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            )}
            {activeContentTab === "content" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Content</h2>
                <p className="text-gray-700 mb-4">
                  Tutaj bede dzielił się pomysłami na przyszłosc
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                    <img src="https://placehold.co/400x250/E0E0E0/333333?text=Art+Piece+1" alt="Art Piece 1" className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900">Digital Portrait Study</h4>
                      <p className="text-sm text-gray-600 mt-1">A detailed study of light and shadow.</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                    <img src="https://placehold.co/400x250/D0D0D0/333333?text=Tutorial+Video" alt="Tutorial Video" className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900">Procreate Ba</h4>
                      <p className="text-sm text-gray-600 mt-1">Learn how to get started with Procreate.</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                    <img src="https://placehold.co/400x250/C0C0C0/333333?text=New+Illustration" alt="New Illustration" className="w-full h-40 object-cover" />
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-900">Fantasy Landscape</h4>
                      <p className="text-sm text-gray-600 mt-1">My latest illustration inspired by nature.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeContentTab === "events" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Next Events</h2>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-900">Live Stream: Digital Painting Session</h3>
                    <p className="text-gray-700 text-sm mt-1">Date: July 15, 2025, 7:00 PM CEST</p>
                    <p className="text-gray-700 text-sm">Platform: Twitch</p>
                    <p className="text-gray-600 text-xs mt-2">Join me for a live digital painting session where I'll be working on a new character design. Q&A included!</p>
                    <a href="#" className="text-teal-600 hover:text-teal-700 text-sm mt-2 inline-block">View on Twitch</a>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-900">Workshop: Intro to Procreate</h3>
                    <p className="text-gray-700 text-sm mt-1">Date: August 5, 2025, 2:00 PM CEST</p>
                    <p className="text-gray-700 text-sm">Platform: Zoom</p>
                    <p className="text-gray-600 text-xs mt-2">Learn the basics of Procreate and start your digital art journey. Limited spots available!</p>
                    <a href="#" className="text-teal-600 hover:text-teal-700 text-sm mt-2 inline-block">Register Now</a>
                  </div>
                </div>
              </div>
            )}

            {activeContentTab === "funding" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Funding Goals</h2>
                <p className="text-gray-700 mb-4">
                  Your support helps me upgrade my equipment, create more content, and dedicate more time to what I love!
                </p>
                <div className="space-y-6">
                  <div className="mt-4 max-w-md">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>New Drawing Tablet</span>
                      <span>{Math.round(fundingProgress)}%</span>
                    </div>
                    <div className="progress-bar mt-1">
                      <div className="progress-fill" style={{ width: `${fundingProgress}%`, background: `linear-gradient(90deg, #14b8a6, #8b5cf6)` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">${currentFunding} of ${fundingGoal} goal</div>
                  </div>
                  <div className="mt-4 max-w-md">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Upgrade Streaming PC</span>
                      <span>20%</span>
                    </div>
                    <div className="progress-bar mt-1">
                      <div className="progress-fill" style={{ width: `20%`, background: `linear-gradient(90deg, #14b8a6, #8b5cf6)` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">$200 of $1,000 goal</div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-xl shadow-sm p-6 mt-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">Monthly Subscription</h4>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">$10/month</p>
                    <p className="text-gray-600 mt-2">
                      Subscribers: <span className="text-gray-900 font-semibold">42</span>
                    </p>
                    <button className="w-full mt-4 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold py-3 rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Support Wall/Comments (Combined with Recent Supporters) */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Support Wall</h2>

              <div className="flex items-start gap-3 mb-6">
                <img src="https://placehold.co/40x40/E0E0E0/333333?text=User" alt="User" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-100 text-gray-900 placeholder-gray-500"
                    rows={2}
                    placeholder="Leave a message of support..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <button
                    onClick={() => console.log("Post message:", message)}
                    className="mt-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold rounded-lg hover:from-teal-600 hover:to-purple-600 hover:scale-[1.02] transform transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none shadow-lg">
                    Post
                  </button>
                </div>
              </div>


              </div>
            </div>
          </div>

          {/* Right Column - Tip Panel (now always visible but conditionally rendered inside the header) */}
          {/* This column is now empty as its content has been moved to the header */}
        </div>
      </div>

      {showDepositModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowDepositModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Address</h2>

            <div className="text-center">
              <div className="bg-gray-100 p-4 rounded-lg inline-block mb-4">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x71C7656EC7ab88b098defB751B7401B5f6d8976F" alt="QR Code" />
              </div>

              <div className="bg-gray-100 p-3 rounded-lg mb-6">
                <div className="text-sm font-mono text-gray-800 break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</div>
              </div>

              <button
                onClick={() => copyToClipboard('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition flex items-center mx-auto"
              >
                <Copy className="w-4 h-4 mr-2" /> Copy Address
              </button>

              <p className="text-sm text-gray-500 mt-4">Send USDC directly to this address to support the creator.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .progress-bar {
            height: 8px;
            border-radius: 4px;
            background-color: #e5e7eb;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            border-radius: 4px;
            background: linear-gradient(90deg, #14b8a6, #8b5cf6);
            transition: width 0.3s ease;
        }
        .donation-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* Custom styles for range input */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        /* Track */
        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb; /* Default track color */
        }

        input[type="range"]::-moz-range-track {
          height: 6px;
          border-radius: 3px;
          background: #e5e7eb; /* Default track color */
        }

        /* Thumb */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          background-color: #FFD700; /* Golden color */
          border-radius: 50%;
          border: 2px solid #374151; /* Dark border */
          margin-top: -5px; /* Adjust thumb vertical position */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          background-color: #FFD700; /* Golden color */
          border-radius: 50%;
          border: 2px solid #374151; /* Dark border */
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default CreatorProfilePage;
