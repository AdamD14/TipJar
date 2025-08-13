"use client";

import * as React from "react";
import { SolidButton } from "./Solid";
import { GradientButton } from "./Gradient";
import { OutlineButton } from "./Outline";
import { GhostButton } from "./Ghost";
import { TEAL, PURPLE, GOLD } from "./common";

export default function Buttons() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <SolidButton color={TEAL}>Solid Teal</SolidButton>
        <SolidButton color={PURPLE}>Solid Purple</SolidButton>
        <SolidButton color={GOLD}>Solid Gold</SolidButton>

        <GradientButton color={TEAL}>Gradient Teal</GradientButton>
        <GradientButton color={PURPLE}>Gradient Purple</GradientButton>
        <GradientButton color={GOLD}>Gradient Gold</GradientButton>

        <OutlineButton color={TEAL}>Outline Teal</OutlineButton>
        <OutlineButton color={PURPLE}>Outline Purple</OutlineButton>
        <OutlineButton color={GOLD}>Outline Gold</OutlineButton>

        <GhostButton color={TEAL}>Ghost Teal</GhostButton>
        <GhostButton color={PURPLE}>Ghost Purple</GhostButton>
        <GhostButton color={GOLD}>Ghost Gold</GhostButton>
      </div>
    </div>
  );
}
