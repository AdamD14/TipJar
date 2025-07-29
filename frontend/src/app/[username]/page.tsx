"use client";

import React, { useState, FC, ReactNode } from "react";
import WalletAddressModal from "../../components/WalletAddressModal";
import {
  X,
  CreditCard,
  Wallet,
  ChevronRight,
  ChevronLeft,
  Twitter,
  Youtube,
  Twitch,
  PlusCircle,
  MinusCircle,
  Linkedin,
} from "lucide-react";

interface SupportHistoryItem {
  id: number;
  name: string;
  amount: number;
  time: string;
  avatar: string;
}

const supportHistory: SupportHistoryItem[] = [
  {
    id: 1,
    name: "@mike92",
    amount: 25,
    time: "10 min ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "@jennyart",
    amount: 10,
    time: "22 min ago",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
  },
  {
    id: 3,
    name: "@david_t",
    amount: 50,
    time: "1 hour ago",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 4,
    name: "@laura_s",
    amount: 15,
    time: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: 5,
    name: "@alexg",
    amount: 5,
    time: "3 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

const PaymentIcon: FC<{ name: string; children: ReactNode }> = ({
  name,
  children,
}) => (
  <div
    title={name}
    className="flex items-center justify-center bg-white bg-opacity-10 rounded-lg p-1"
  >
    {children}
  </div>
);

const CreatorProfilePage: FC = () => {
  const [tipAmount, setTipAmount] = useState<number>(10);
  const [message, setMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"profile" | "funding" | "support">(
    "profile"
  );
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showMessageField, setShowMessageField] = useState<boolean>(false); // Re-introduced
  const [isGeneratingMessage, setIsGeneratingMessage] = useState<boolean>(false); // Re-introduced
  const carouselImages = ['/assets/ja1.png', '/assets/ja2.png', '/assets/ja3.png'];
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const walletAddress = "0x1234567890ABCDEF1234567890ABCDEF12345678";


  const fundingGoal = 1500;
  const currentFunding = 812;
  const fundingProgress = (currentFunding / fundingGoal) * 100;

  const prevImage = () => setCarouselIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length);
  const nextImage = () => setCarouselIndex((i) => (i + 1) % carouselImages.length);

  const handleTipSubmit = () => setShowPaymentModal(true);

  const handlePayment = (method: string) => {
    console.log(
      `Paying ${tipAmount} USDC with method: ${method} with message: ${message}`
    );
    setShowPaymentModal(false);
    setTipAmount(10);
    setMessage("");
  };

  const generateMessageSuggestion = async () => {
    setIsGeneratingMessage(true);
    try {
        const chatHistory = [];
        const prompt = "Napisz krótką, pozytywną wiadomość, którą fan mógłby wysłać twórcy treści online. Wiadomość powinna być zachęcająca i zawierać podziękowanie za ich pracę. Niech będzie to tylko jedna, zwięzła fraza.";
        chatHistory.push({ role: "user", parts: [{ text: prompt }] });
        const payload = { contents: chatHistory };
        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('Gemini API key not configured');
        }
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            setMessage(text);
        } else {
            console.error("Unexpected response structure from Gemini API:", result);
            setMessage("Nie udało się wygenerować wiadomości. Spróbuj ponownie.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        setMessage("Wystąpił błąd podczas generowania wiadomości.");
    } finally {
        setIsGeneratingMessage(false);
    }
};


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#004D40] via-[#263238] to-[#4A148C]">
      <div className="w-full">
        {/* Parallax Header with carousel */}
        <div
          className="relative h-64 md:h-80 bg-cover bg-center rounded-t-3xl"
          style={{
            backgroundImage: "url('/assets/reback.png')",
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <div className="relative w-36 h-24 rounded-xl overflow-hidden shadow-[0_0_15px_5px_rgba(255,215,0,0.7)]">
              <img
                src={carouselImages[carouselIndex]}
                alt="Creator work"
                className="w-full h-full object-cover"
              />
              <button onClick={prevImage} className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 text-yellow-200 p-1 rounded-full">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextImage} className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 text-yellow-200 p-1 rounded-full">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Header Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 -mt-16 relative z-10 border border-gray-700/50 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-8">

              <p className="text-yellow-400 mt-2 font-semibold text-lg">@AdamDuda</p>
              {/* Social Icons */}
              <div className="flex space-x-3 mt-1 text-yellow-400">
                <a href="#" aria-label="Twitter" className="hover:text-yellow-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" aria-label="Twitch" className="hover:text-yellow-300">
                  <Twitch className="w-5 h-5" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-yellow-300">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" aria-label="YouTube" className="hover:text-yellow-300">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>

              {/* Followers and Total Tips */}
              <div className="mt-4 space-y-1 text-center text-gray-300 text-sm">
                <div>Following: <span className="font-semibold text-white">238</span></div>
                <div>Total Raised: <span className="font-semibold text-yellow-400">812 USDC</span></div>
              </div>
            </div>

            {/* Support Section - wyrównana do góry i prawej */}
            <div className="flex-1 flex flex-col justify-start">
              {/* Progress Goals */}
              <div className="mb-6">
                <h3 className="text-yellow-400 font-semibold mb-3">Funding Goals</h3>

                {/* Single Progress Bar */}
                {[{label:'Goal 1', target:100, raised:65},{label:'Goal 2', target:1000, raised:0},{label:'Goal 3', target:1000000, raised:0}].map(({label, target, raised}, i) => {
                  const percent = Math.min((raised / target) * 100, 100);
                  return (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>{label}: ${raised.toLocaleString()} / ${target.toLocaleString()}</span>
                        <span>{Math.round(percent)}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-gray-700">
                        <div
                          className="h-3 rounded-full bg-yellow-400 transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Monthly Subscription */}
              <div className="mt-auto bg-gray-800 p-4 rounded-xl text-center text-gray-300">
                <h4 className="text-yellow-400 font-semibold mb-1">Monthly Subscription</h4>
                <p>$10 per month</p>
                <p className="mt-2 text-sm">Subscribers: <span className="font-semibold text-white">42</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6"> {/* Added max-w-6xl mx-auto and mt-6 here */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "profile" && (
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6">About Creator</h2>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#E91E63] to-[#9C27B0] rounded-full flex items-center justify-center"> {/* Pink to Purple gradient */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Specialty</h3>
                            <p className="text-gray-400">Digital art, Illustration, Character design</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#2196F3] to-[#00BCD4] rounded-full flex items-center justify-center"> {/* Blue to Cyan gradient */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-white"><path d="M12 12.9a1 1 0 1 0 0 2.2 1 1 0 0 0 0-2.2Z"/><path d="M19 10c0 7-7 12-7 12s-7-5-7-12a7 7 0 0 1 14 0Z"/><path d="M12 2a8 8 0 0 0-8 8c0 1.88 0.63 3.65 1.76 5.04L12 22l6.24-6.96C19.37 13.65 20 11.88 20 10a8 8 0 0 0-8-8Z"/></svg>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Location</h3>
                            <p className="text-gray-400">London, UK</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#009688] rounded-full flex items-center justify-center"> {/* Green to Teal gradient */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock text-white"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">Active Since</h3>
                            <p className="text-gray-400">March 2022</p>
                        </div>
                    </div>
                </div>
              </div>
            )}
            {activeTab === "funding" && (
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Funding Campaign
                </h2>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-semibold">
                      Progress
                    </span>
                    <span className="text-[#FFC107] font-bold">
                      {Math.round(fundingProgress)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
                    <div
                      className="h-4 rounded-full bg-[#FFC107]"
                      style={{ width: `${fundingProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${currentFunding} USDC raised</span>
                    <span>${fundingGoal} USDC goal</span>
                  </div>
                </div>
                <p className="text-gray-300">
                  I'm raising funds for a professional streaming microphone to
                  improve the audio quality of my streams and educational
                  content. Your support will help me create better content for
                  the community!
                </p>
              </div>
            )}
            {activeTab === "support" && (
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Support History
                </h2>
                <div className="space-y-4">
                  {supportHistory.map((support) => (
                    <div
                      key={support.id}
                      className="flex items-start gap-4 bg-gray-800 rounded-2xl p-4"
                    >
                      {/* Using regular img tag for external avatars from randomuser.me */}
                      <img
                        src={support.avatar}
                        alt="avatar"
                        className="w-12 h-12 rounded-full border-2 border-[#FFC107]"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-white font-semibold">
                            {support.name}
                          </h4>
                          <span className="bg-[#FFC107] text-black px-3 py-1 rounded-full font-semibold">
                            ${support.amount}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {support.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">
                Support Creator
              </h3>
              <div className="mt-4 px-2">
                <input
                  type="range"
                  min="0.1"
                  max="20"
                  step="0.1"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(parseFloat(e.target.value))}
                  className="w-full h-[6px] rounded-lg cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${
                      (tipAmount / 20) * 100
                    }%, rgba(255, 255, 255, 0.1) ${
                      (tipAmount / 20) * 100
                    }%, rgba(255, 255, 255, 0.1) 100%)`,
                  }}
                />
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2 px-2">
                {[1, 2, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTipAmount(amount)}
                    className={`py-2 rounded-lg text-sm transition-colors ${
                      tipAmount === amount
                        ? "bg-[#FFD700] text-gray-900 font-bold"
                        : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              <div className="mt-6">
              <button type="button" onClick={() => setShowMessageField(!showMessageField)} className="text-sm text-[#9C27B0] hover:text-[#6A1B9A] flex items-center mb-3">
                  {showMessageField ? <MinusCircle className="w-4 h-4 mr-1" /> : <PlusCircle className="w-4 h-4 mr-1" />} Add a message (optional)
              </button>
                  {showMessageField && (
                      <div className="mt-2">
                          <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              placeholder="Add a message (optional)"
                              className="w-full bg-gray-800 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                              rows={2}
                          />
                          <button type="button" onClick={generateMessageSuggestion} disabled={isGeneratingMessage}
                                  className="mt-2 w-full bg-[#6A1B9A] hover:bg-[#8E24AA] text-white font-bold py-2 px-4 rounded-xl shadow-md
                                             transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#9C27B0]
                                             flex items-center justify-center">
                              {isGeneratingMessage ? (
                                  <>
                                      <i className="fas fa-spinner fa-spin mr-2"></i> Generowanie...
                                  </>
                              ) : (
                                  <>
                                      ✨ Zasugeruj wiadomość
                                  </>
                              )}
                          </button>
                      </div>
                  )}
              </div>

              <div className="text-center mt-4 px-2">
                <button
                  onClick={handleTipSubmit}
                  className="w-full font-bold bg-[#FFD700] text-gray-900 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 text-lg inline-flex items-center justify-center gap-2"
                >
                  Tip ${tipAmount.toFixed(2)}
                  <img
                    src="/assets/logo_usdc_1.png"
                    width={28}
                    height={28}
                    className="object-cover opacity-80"
                    alt="USDC Logo"
                  />
                </button>
              </div>

              <div className="mt-2 text-center">
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="inline-flex items-center gap-1 text-sm text-[#9C27B0] hover:text-[#6A1B9A]"
                >
                  <Wallet className="w-4 h-4" /> Adres do wpłaty
                </button>
              </div>

              <div className="mt-6">
                <p className="text-gray-400 text-center mb-2">
                  Other payment methods
                </p>
                <div className="grid grid-cols-6 gap-[4px] px-2 h-8">
                  <PaymentIcon name="Google Pay">
                    <img
                      src="/assets/Google_Pay_Logo.svg"
                      alt="Google Pay"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </PaymentIcon>
                  <PaymentIcon name="Apple Pay">
                    <img
                      src="/assets/Apple_Pay_Mark_RGB.svg"
                      alt="Apple Pay"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </PaymentIcon>
                  <PaymentIcon name="Metamask">
                    <img
                      src="/assets/MetaMask-icon-fox.svg"
                      alt="Metamask"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </PaymentIcon>
                  <PaymentIcon name="Revolut">
                    <img
                      src="/assets/revolut.svg"
                      alt="Revolut"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </PaymentIcon>
                  <PaymentIcon name="WalletConnect">
                    <img
                      src="/assets/wc.svg"
                      alt="WalletConnect"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </PaymentIcon>
                  <PaymentIcon name="Bank">
                    <img
                      src="/assets/bank-svgrepo-com.svg"
                      alt="Bank"
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                  </PaymentIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-xl p-6 w-full max-w-md"
            style={{ backgroundColor: "#00695C" }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                Choose Payment Method
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-[#B2DFDB] hover:text-[#FFFFFF]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => handlePayment("Card")}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors duration-300 bg-[#00796B] text-white hover:bg-[#00897B]"
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-[#FFC107] mr-3" />
                  <span>Pay with Card</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B2DFDB]" />
              </button>

              <button
                onClick={() => handlePayment("TipJar Wallet")}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors duration-300 bg-[#00796B] text-white hover:bg-[#00897B]"
              >
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 text-[#FFC107] mr-3" />
                  <span>TipJar Wallet (Balance: 25.50 USDC)</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B2DFDB]" />
              </button>

              <button
                onClick={() => handlePayment("Crypto Wallet")}
                className="w-full flex items-center justify-between p-4 rounded-lg transition-colors duration-300 bg-[#00796B] text-white hover:bg-[#00897B]"
              >
                <div className="flex items-center">
                  <img src="/assets/logo_usdc_1.png" alt="USDC Icon" className="w-5 h-5 text-[#FFC107] mr-3" /> {/* Replaced CryptoIcon with img tag for consistency */}
                  <span>Connect Crypto Wallet</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B2DFDB]" />
              </button>
            </div>

            <button
              onClick={() => handlePayment("Final")}
              className="w-full mt-6 py-3 bg-[#6A1B9A] hover:bg-[#8E24AA] text-white font-bold rounded-lg transition-all duration-300"
            >
              Pay ${tipAmount} USDC
            </button>
          </div>
        </div>
      )}

      {showAddressModal && (
        <WalletAddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          address={walletAddress}
        />
      )}

      {/* Custom CSS */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background-color: #ffd700;
          border-radius: 50%;
          cursor: grab;
          margin-top: -5px;
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.5);
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background-color: #ffd700;
          border-radius: 50%;
          cursor: grab;
          border: none;
          box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default CreatorProfilePage;
