"use client";
import React from "react";
import Input from "@/components/ui/forms/Input";

export default function AmountInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <Input
      type="number"
      inputMode="decimal"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
}
