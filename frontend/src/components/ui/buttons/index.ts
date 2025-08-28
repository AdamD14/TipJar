// Centralny punkt eksportu przycisków UI
// Pozwala importować wszystkie warianty z jednego miejsca.

export { Button, ButtonLink } from "../Button";
export { default as CtaGoldButton } from "../CtaGoldButton";
export { default as LoginButton } from "../LoginButton";

// Re-eksporty przycisków z innych modułów (bez przenoszenia plików)
export { BaseButton } from "@/components/base/buttons/BaseButton";
export { SubmitTipButton } from "@/components/tip/SubmitTipButton";
export { QuickTipButtons } from "@/components/tip/QuickTipButtons";

