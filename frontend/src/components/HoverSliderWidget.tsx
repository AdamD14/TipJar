import { useState } from 'react';

interface HoverSliderWidgetProps {
  handle: string;
  avatar?: string;
}

export default function HoverSliderWidget({ handle, avatar = '/assets/ja1.jpg' }: HoverSliderWidgetProps) {
  const [showSlider, setShowSlider] = useState(false);
  const [amount, setAmount] = useState(5);
  const [open, setOpen] = useState(false);

  const toggleSlider = (flag: boolean) => {
    if (!open) {
      setShowSlider(flag);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setShowSlider(false);
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => toggleSlider(true)} onMouseLeave={() => toggleSlider(false)}>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#006D6D] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md"
      >
        💸
      </button>

      {showSlider && (
        <input
          type="range"
          min={0}
          max={20}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          onMouseUp={() => setOpen(true)}
          className="absolute left-14 top-1/2 -translate-y-1/2 w-40 h-1 bg-gray-300 rounded-full cursor-pointer"
        />
      )}

      {open && (
        <div className="absolute left-0 mt-4 w-56 bg-white rounded shadow-lg p-4 z-10">
          <div className="flex items-center gap-2 mb-3">
            <img src={avatar} alt={handle} className="w-8 h-8 rounded-full" />
            <span className="font-semibold">@{handle}</span>
          </div>
          <p className="mb-3">Tip {amount} USDC</p>
          <button onClick={closeModal} className="bg-[#FFD700] text-black px-3 py-1 rounded w-full">
            Tip Now
          </button>
        </div>
      )}
    </div>
  );
}
