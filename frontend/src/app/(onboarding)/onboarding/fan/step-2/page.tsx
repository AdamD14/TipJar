"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiClient";
import Button from "@/components/ui/Button";
import { Check, Loader2 } from "lucide-react";

const CATEGORIES = [
  { id: "tech", label: "Technology", image: "💻" },
  { id: "lifestyle", label: "Lifestyle", image: "🧘" },
  { id: "gaming", label: "Gaming", image: "🎮" },
  { id: "music", label: "Music", image: "🎵" },
  { id: "education", label: "Education", image: "🎓" },
  { id: "cars", label: "Automotive", image: "🏎️" },
  { id: "fashion", label: "Fashion", image: "👗" },
  { id: "food", label: "Food", image: "🍔" },
  { id: "travel", label: "Travel", image: "✈️" },
];

export default function FanOnboardingStep2() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const mutation = useMutation({
    mutationFn: async () => {
      await apiClient.post("/api/fan/onboarding/step-2", {
        interests: selectedCategories,
      });
    },
    onSuccess: () => {
      // Redirect to dashboard on success
      router.push("/fan/dashboard");
    },
    onError: (error) => {
      console.error("Failed to save interests:", error);
      setIsSubmitting(false);
    },
  });

  const handleFinish = () => {
    setIsSubmitting(true);
    mutation.mutate();
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold font-header bg-gradient-to-r from-[#FFD700] to-[#f9c513] bg-clip-text text-transparent">
          Odkrywaj Twórców
        </h1>
        <p className="text-gray-400">
          Co Cię interesuje? Wybierz kategorie, abyśmy mogli dopasować treści
          dla Ciebie.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`
                relative group flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300
                ${
                  isSelected
                    ? "bg-[#1a2c2c] border-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                    : "bg-[#0F1E1E] border-[#004d4d] hover:border-[#006666] hover:bg-[#152525]"
                }
              `}
            >
              <span className="text-4xl mb-3 filter drop-shadow-md transition-transform group-hover:scale-110">
                {category.image}
              </span>
              <span
                className={`text-sm font-semibold transition-colors ${
                  isSelected
                    ? "text-[#FFD700]"
                    : "text-gray-300 group-hover:text-white"
                }`}
              >
                {category.label}
              </span>

              {isSelected && (
                <div className="absolute top-2 right-2 bg-[#FFD700] text-[#003737] rounded-full p-1 shadow-lg">
                  <Check size={12} strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center pt-8">
        <Button
          onClick={handleFinish}
          disabled={isSubmitting}
          className="w-full max-w-sm py-4 text-lg font-bold shadow-[0_0_20px_rgba(255,215,0,0.1)] hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]"
          variant="gold"
        >
          {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Zakończ"}
        </Button>
      </div>
    </div>
  );
}
