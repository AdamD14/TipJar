"use client";
import React, { useState } from "react";
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
  Linkedin
} from "lucide-react";

interface SupportHistoryItem {
  id: number;
  name: string;
  amount: number;
  time: string;
  avatar: string;
}

const supportHistory: SupportHistoryItem[] = [
  { id: 1, name: "@mike92", amount: 25, time: "10 min ago", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "@jennyart", amount: 10, time: "22 min ago", avatar: "https://randomuser.me/api/portraits/women/63.jpg" },
  { id: 3, name: "@david_t", amount: 50, time: "1 hour ago", avatar: "https://randomuser.me/api/portraits/men/75.jpg" },
  { id: 4, name: "@laura_s", amount: 15, time: "2 hours ago", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
  { id: 5, name: "@alexg", amount: 5, time: "3 hours ago", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
];

const PaymentIcon = ({ name, children }) => (
  <div title={name} className="flex items-center justify-center bg-white bg-opacity-10 rounded-lg p-1 hover:bg-opacity-20 transition-all">
    {children}
  </div>
);

const CreatorProfilePage = () => {
  const [tipAmount, setTipAmount] = useState(10);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const fundingGoal = 1500;
  const currentFunding = 812;
  const fundingProgress = (currentFunding / fundingGoal) * 100;

  const handleTipSubmit = () => setShowPaymentModal(true);

  const handlePayment = (method) => {
    setShowPaymentModal(false);
    setTipAmount(10);
    setMessage("");
    // Here you would integrate with actual payment processing
    console.log(`Payment processed with ${method} for $${tipAmount}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center py-12">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Profile Section - Left Side */}
        <div className="relative col-span-2 w-full bg-slate-900/60 rounded-2xl border border-purple-500/20 backdrop-blur-lg shadow-2xl px-10 pt-24 pb-10 overflow-visible">
          {/* Profile Avatar - Overlapping */}
          <div className="absolute -top-16 z-20">
            <div className="w-64 h-64 rounded-full border-4 border-purple-500/50 shadow-2xl shadow-purple-500/30 bg-gradient-to-br from-purple-600 to-slate-800">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="pl-40">
            <span className="block text-3xl font-bold text-white mt-1">@AdamDuda</span>
            <a
              href="https://tipjar.plus/@AdamDuda"
              className="block text-purple-300 text-sm underline hover:text-purple-200 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              tipjar.plus/@AdamDuda
            </a>
            <div className="my-6 text-gray-300 text-sm leading-relaxed max-w-lg">
              Founder of tipjar+ — built together with a team of AI agents.<br />
              Advocate of freedom, decentralization, and blockchain technology.<br />
              Web3 & AI pro user. Paleo-contact believer.
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 mb-6">
              <a href="#" aria-label="Twitter" className="hover:text-purple-300 text-purple-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Twitch" className="hover:text-purple-300 text-purple-400 transition-colors">
                <Twitch className="w-6 h-6" />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-purple-300 text-purple-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-purple-300 text-purple-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mb-6">
              {["profile", "support"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Supporters</span>
                    </div>
                    <div className="text-2xl font-bold text-white">1,234</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Total Raised</span>
                    </div>
                    <div className="text-2xl font-bold text-white">${currentFunding}</div>
                  </div>
                </div>
                
                {/* Funding Goals */}
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Funding Goals
                  </h4>
                  <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span>Progress: ${currentFunding} / ${fundingGoal}</span>
                    <span>{Math.round(fundingProgress)}%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-700">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-700"
                      style={{ width: `${fundingProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "support" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">Recent Support</h3>
                {supportHistory.map((support) => (
                  <div
                    key={support.id}
                    className="flex items-center gap-4 bg-slate-800/50 rounded-xl p-4 hover:bg-slate-800/70 transition-all"
                  >
                    <img
                      src={support.avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-semibold">{support.name}</h4>
                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold text-sm">
                          ${support.amount}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{support.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Support Widget - Right Side */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Support Creator</h3>
            
            {/* Tip Amount Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-300">Tip Amount</span>
                <span className="text-2xl font-bold text-white">${tipAmount.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={tipAmount}
                onChange={(e) => setTipAmount(parseFloat(e.target.value))}
                className="w-full h-2 rounded-lg cursor-pointer appearance-none bg-slate-700"
                style={{
                  background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${
                    (tipAmount / 100) * 100
                  }%, #374151 ${(tipAmount / 100) * 100}%, #374151 100%)`,
                }}
              />
            </div>
            
            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[5, 10, 25, 50].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setTipAmount(amount)}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    tipAmount === amount
                      ? "bg-yellow-400 text-black shadow-lg"
                      : "bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="mb-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message (optional)"
                className="w-full bg-slate-800 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-slate-700"
                rows={3}
              />
            </div>
            
            {/* Tip Button */}
            <button
              onClick={handleTipSubmit}
              className="w-full font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30 text-lg flex items-center justify-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              Tip ${tipAmount.toFixed(2)} USDC
            </button>
            
            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-gray-400 text-center mb-3 text-sm">
                Other payment methods
              </p>
              <div className="grid grid-cols-6 gap-2">
                <PaymentIcon name="Google Pay">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">GP</span>
                  </div>
                </PaymentIcon>
                <PaymentIcon name="Apple Pay">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AP</span>
                  </div>
                </PaymentIcon>
                <PaymentIcon name="Metamask">
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">MM</span>
                  </div>
                </PaymentIcon>
                <PaymentIcon name="Revolut">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">R</span>
                  </div>
                </PaymentIcon>
                <PaymentIcon name="WalletConnect">
                  <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">WC</span>
                  </div>
                </PaymentIcon>
                <PaymentIcon name="Bank">
                  <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center">
                    <span className="text-xs font-bold text-white">B</span>
                  </div>
                </PaymentIcon>
              </div>
            </div>
          </div>
          
          {/* Monthly Subscription */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl">
            <h4 className="text-yellow-400 font-semibold mb-3 text-center">Monthly Subscription</h4>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">$10/month</p>
              <p className="text-gray-300 mt-2">
                Subscribers: <span className="text-white font-semibold">42</span>
              </p>
              <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-purple-500/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">
                Choose Payment Method
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => handlePayment("Card")}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-all"
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-yellow-400 mr-3" />
                  <span>Pay with Card</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button
                onClick={() => handlePayment("TipJar Wallet")}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-all"
              >
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 text-yellow-400 mr-3" />
                  <span>TipJar Wallet (Balance: 25.50 USDC)</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              
              <button
                onClick={() => handlePayment("Crypto Wallet")}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition-all"
              >
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-yellow-400 mr-3" />
                  <span>Connect Crypto Wallet</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <button
              onClick={() => handlePayment("Final")}
              className="w-full mt-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 text-lg"
            >
              Pay ${tipAmount.toFixed(2)} USDC
            </button>
          </div>
        </div>
      )}

      {/* Custom Slider Styles */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #FFD700;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #FFD700;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default CreatorProfilePage;