"use client";
import Button from "@/components/ui/buttons/Button";

export interface TipFeedbackProps {
  success?: boolean;
  message: string;
  onClose: () => void;
}

export const TipFeedback = ({
  success,
  message,
  onClose,
}: TipFeedbackProps) => (
  <div
    className={`mt-4 rounded-md p-3 text-center ${success ? "bg-emerald-600" : "bg-red-600"}`}
  >
    <p>{message}</p>
    <Button
      type="button"
      onClick={onClose}
      variant="link"
      size="sm"
      className="mt-2"
    >
      Close
    </Button>
  </div>
);
