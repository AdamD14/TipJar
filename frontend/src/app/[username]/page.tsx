"use client";

import React, { useState, FC, ReactNode } from "react";
import Image from "next/image";
import {
  Users,
  DollarSign,
  X,
  CreditCard,
  Wallet,
  ChevronRight,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  DollarSign as CryptoIcon,
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

  const fundingGoal = 1500;
  const currentFunding = 812;
  const fundingProgress = (currentFunding / fundingGoal) * 100;

  const handleTipSubmit = () => setShowPaymentModal(true);

  const handlePayment = (method: string) => {
    console.log(
      `Paying ${tipAmount} USDC with method: ${method} with message: ${message}`
    );
    setShowPaymentModal(false);
    setTipAmount(10);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004D40] via-[#263238] to-[#4A148C] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Parallax Header */}
        <div
          className="h-64 md:h-80 bg-cover bg-center rounded-t-3xl"
          style={{ backgroundImage: "url('/assets/reback.png')" }}
        ></div>

        {/* Main Header Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 -mt-16 relative z-10 border border-gray-700/50">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FFC107] to-[#FF9800] p-1">
                <div className="w-full h-full rounded-full bg-[#00695C] flex items-center justify-center text-4xl">
                  👩‍🎨
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#4CAF50] w-8 h-8 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">
                Sarah Johnson
              </h1>
              <p className="text-[#FFC107] text-lg mb-4">@sarahcreative</p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Digital artist & illustrator creating magical worlds and
                characters. Your support helps me create content full-time!
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                  <Users className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-white font-semibold">1.2K</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full">
                  <DollarSign className="w-4 h-4 text-[#FFC107]" />
                  <span className="text-white font-semibold">4.8K USDC</span>
                </div>
                <div className="bg-[#FFC107] text-black px-6 py-2 rounded-full font-semibold">
                  {Math.round(fundingProgress)}% Goal
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleTipSubmit}
                className="bg-[#FFC107] hover:bg-[#FFD54F] text-black px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Tip
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all">
                Follow
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-2 mb-6 border border-gray-700/50">
            <div className="flex gap-2">
              {(["profile", "funding", "support"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all capitalize ${
                    activeTab === tab
                      ? "bg-[#FFC107] text-black"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {activeTab === "profile" && (
                <div className="bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                  <div className="flex justify-center space-x-4 mt-3">
                    <Twitter className="w-6 h-6 text-[#B2DFDB] hover:text-[#FFC107] transition" />
                    <Instagram className="w-6 h-6 text-[#B2DFDB] hover:text-[#FFC107] transition" />
                    <Youtube className="w-6 h-6 text-[#B2DFDB] hover:text-[#FFC107] transition" />
                    <Twitch className="w-6 h-6 text-[#B2DFDB] hover:text-[#FFC107] transition" />
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
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a message (optional)"
                    className="w-full bg-gray-800 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC107]"
                    rows={2}
                  />
                </div>

                <div className="text-center mt-4 px-2">
                  <button
                    onClick={handleTipSubmit}
                    className="w-full font-bold bg-[#FFD700] text-gray-900 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/50 text-lg inline-flex items-center justify-center gap-2"
                  >
                    Tip ${tipAmount.toFixed(2)}
                    <Image
                      src="/assets/logo_usdc_1.png"
                      width={28}
                      height={28}
                      className="object-cover opacity-80"
                      alt="USDC Logo"
                    />
                  </button>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 text-center mb-2">
                    Other payment methods
                  </p>
                  <div className="grid grid-cols-6 gap-[4px] px-2 h-8">
                    <PaymentIcon name="Google Pay">
                      <Image
                        src="/assets/Google_Pay_Logo.svg"
                        alt="Google Pay"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </PaymentIcon>
                    <PaymentIcon name="Apple Pay">
                      <Image
                        src="/assets/Apple_Pay_Mark_RGB.svg"
                        alt="Apple Pay"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </PaymentIcon>
                    <PaymentIcon name="Metamask">
                      <Image
                        src="/assets/MetaMask-icon-fox.svg"
                        alt="Metamask"
                        width={30}
                        height={30}
                        className="object-contain"
                      />
                    </PaymentIcon>
                    <PaymentIcon name="Revolut">
                      <Image
                        src="/assets/revolut.svg"
                        alt="Revolut"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </PaymentIcon>
                    <PaymentIcon name="WalletConnect">
                      <Image
                        src="/assets/wc.svg"
                        alt="WalletConnect"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </PaymentIcon>
                    <PaymentIcon name="Bank">
                      <Image
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
                  <CryptoIcon className="w-5 h-5 text-[#FFC107] mr-3" />
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

      {/* Custom CSS */}
      <style jsx global>{`
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