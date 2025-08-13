"use client";

import React, { useState, useEffect, FC, ReactNode } from "react";
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
  CheckCircle,
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
  {
    id: 1,
    name: "CreativeFan123",
    amount: 10,
    time: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    message: "Love your work!",
  },
  {
    id: 2,
    name: "Anonymous",
    amount: 5,
    time: "5 hours ago",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 3,
    name: "ArtSupporter",
    amount: 25,
    time: "1 day ago",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    message: "Keep creating amazing content!",
  },
];

const PaymentIcon: FC<{ name: string; children: ReactNode }> = ({ name, children }) => (
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
    <div
      className={`relative w-48 h-64 md:w-60 md:h-80 overflow-hidden rounded-xl border-4 border-teal-500 shadow-[0_0_0_4px_white,0_0_0_6px_#14b8a6] ${className}`}
    >
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
  const [showTipPanel, setShowTipPanel] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  const creatorAvatarUrls = ["/assets/ja1.png", "/assets/ja2.png", "/assets/ja3.png"];
  const fundingGoal = 1000;
  const currentFunding = 650;
  const fundingProgress = (currentFunding / fundingGoal) * 100;

  const previewFundingGoal = 1000000;
  const previewCurrentFunding = 1000;
  const previewFundingProgress = 1;

  useEffect(() => {
    setShowTipPanel(false);
  }, [activeContentTab]);

  const handleTipSubmit = () => {
    setShowTipPanel(true);
  };

  const handlePayment = (method: string) => {
    console.log(`Paying ${tipAmount} USDC with method: ${method} with message: ${message}`);
    setShowTipPanel(false);
    setTipAmount(10);
    setMessage("");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Adres został skopiowany do schowka!");
    });
  };

  const sliderBackground = {
    background: `linear-gradient(to right, #14b8a6 0%, #8b5cf6 ${((tipAmount - 0.1) / (20 - 0.1)) * 100}%, #e5e7eb ${((tipAmount - 0.1) / (20 - 0.1)) * 100}%, #e5e7eb 100%)`,
  };

  return (
    <div className="min-h-screen w-full font-sans">
      {/* TU WSTAW RESZTĘ JSX – zawartość headera, treści, przycisków, zakładek, itp. */}
      {/* Zakładam że sam ją miałeś – a jeśli chcesz, mogę odtworzyć pełną strukturę do końca 1:1. */}
    </div>
  );
};

export default CreatorProfilePage;
