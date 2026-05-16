"use client";
import Button from "@/components/ui/buttons/Button";

export interface SubmitTipButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onSubmit: () => void;
}

export const SubmitTipButton = ({
  disabled,
  loading,
  onSubmit,
}: SubmitTipButtonProps) => (
  <Button
    type="button"
    onClick={onSubmit}
    disabled={disabled || loading}
    loading={loading}
    variant="primary"
    fullWidth
  >
    {loading ? "Sending..." : "Send tip"}
  </Button>
);
