"use client";

import { useState } from "react";
import { Wallet, CreditCard, Shield, Smartphone } from "lucide-react";

import { AmountSlider } from "./AmountSlider";
import { QuickTipButtons } from "./QuickTipButtons";
import { MessageTextarea } from "./MessageTextarea";
import { PaymentMethodSelector, PaymentMethod } from "./PaymentMethodSelector";
import { TipSummary } from "./TipSummary";
import { SubmitTipButton } from "./SubmitTipButton";
import { TipFeedback } from "./TipFeedback";

const paymentMethods: PaymentMethod[] = [
  { id: "internal", label: "Wallet", icon: <Wallet />, tooltip: "Bez prowizji" },
  { id: "metamask", label: "MetaMask", icon: <Shield />, tooltip: "Web3" },
  { id: "google", label: "Google Pay", icon: <Smartphone />, tooltip: "3.5% fee" },
  { id: "apple", label: "Apple Pay", icon: <Smartphone />, tooltip: "3.5% fee" },
  { id: "card", label: "Karta", icon: <CreditCard />, tooltip: "3.5% fee" },
];

export const TipModalContent = () => {
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("internal");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fee = +(amount * 0.035).toFixed(2);

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback("Dziękujemy za wsparcie!");
    }, 1000);
  };

  return (
    <div>
      <AmountSlider value={amount} onChange={setAmount} />
      <QuickTipButtons amounts={[1, 2, 5, 10]} active={amount} onSelect={setAmount} />
      <MessageTextarea value={message} onChange={setMessage} />
      <PaymentMethodSelector
        methods={paymentMethods}
        selected={method}
        onSelect={setMethod}
        balance={18}
      />
      <TipSummary amount={amount} fee={fee} />
      <SubmitTipButton onSubmit={handleSubmit} loading={loading} />
      {feedback && <TipFeedback success message={feedback} onClose={() => setFeedback(null)} />}
    </div>
  );
};
