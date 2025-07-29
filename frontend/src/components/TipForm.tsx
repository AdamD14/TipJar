"use client";

import React, { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/lib/stores/authStore";

interface TipFormProps {
  /**
   * ID użytkownika będącego twórcą, na którego wysyłany jest napiwek.
   */
  creatorId: string;
  /**
   * Opcjonalne wywołanie zwrotne po udanym przesłaniu napiwku.
   */
  onComplete?: () => void;
}

/**
 * Komponent formularza napiwku. Pozwala wybrać szybką kwotę, wpisać własną,
 * dodać wiadomość, ustawić anonimowość i wysłać dane do backendu.
 */
const TipForm: React.FC<TipFormProps> = ({ creatorId, onComplete }) => {
  const user = useAuthStore((state) => state.user);

  // Stany formularza
  const [selectedAmount, setSelectedAmount] = useState<string>("5");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Kwoty sugerowane – można łatwo dostosować lub przekazać jako props
  const quickAmounts = ["2", "5", "10", "20"];

  /**
   * Zwraca ostateczną kwotę napiwku jako string (zawsze z 2 miejscami po przecinku).
   */
  const getFinalAmount = (): string => {
    const amt = customAmount || selectedAmount;
    const parsed = parseFloat(amt);
    return parsed.toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const amountToSend = getFinalAmount();
    if (!amountToSend || isNaN(parseFloat(amountToSend)) || parseFloat(amountToSend) <= 0) {
      setError("Podaj poprawną kwotę napiwku.");
      return;
    }
    try {
      setLoading(true);
      const payload: any = {
        amount: amountToSend,
        creatorId,
        message: message || undefined,
        isAnonymous,
      };
      if (user) {
        // Zalogowany użytkownik – wysyłamy na endpoint autoryzowany
        await apiClient.post("/tips", payload);
      } else {
        // Gość – symulujemy token płatności (w finalnej integracji należy pobrać go z bramki płatności)
        await apiClient.post("/tips/guest", {
          ...payload,
          paymentGatewayToken: "demo_token_guest_payment",
        });
      }
      if (onComplete) onComplete();
      // Reset formularza po sukcesie
      setSelectedAmount("5");
      setCustomAmount("");
      setMessage("");
      setIsAnonymous(false);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || "Nie udało się wysłać napiwku.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Wybór kwoty sugerowanej */}
      <div className="flex space-x-2">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            type="button"
            className={`px-3 py-2 rounded-lg border ${
              selectedAmount === amt && !customAmount
                ? "bg-teal-600 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => {
              setSelectedAmount(amt);
              setCustomAmount("");
            }}
          >
            {amt} USDC
          </button>
        ))}
      </div>

      {/* Własna kwota */}
      <div>
        <label htmlFor="customAmount" className="block text-sm font-medium mb-1">
          Własna kwota
        </label>
        <input
          id="customAmount"
          type="number"
          step="0.01"
          min="0"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="np. 3.75"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-400"
        />
      </div>

      {/* Wiadomość */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Wiadomość dla twórcy (opcjonalnie)
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white placeholder-gray-400"
          placeholder="Np. Dziękuję za świetną treść!"
        />
      </div>

      {/* Anonimowość */}
      <div className="flex items-center">
        <input
          id="anonymous"
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          className="mr-2 h-4 w-4 text-teal-600 bg-gray-800 border-gray-700 rounded"
        />
        <label htmlFor="anonymous" className="text-sm">
          Wysyłam jako anonimowy
        </label>
      </div>

      {/* Komunikat błędu */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Przyciski */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
        >
          {loading ? "Wysyłanie..." : "Wyślij napiwek"}
        </button>
      </div>
    </form>
  );
};

export default TipForm;