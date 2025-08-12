"use client";
import { TipModal as BaseTipModal } from "./tip/TipModal";

export interface TipModalProps {
  creator: { name: string; handle: string; avatarUrl?: string };
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const TipModal = ({ creator, open, onClose, children }: TipModalProps) => {
  return (
    <BaseTipModal
      creator={{ name: creator.name, avatar: creator.avatarUrl }}
      isOpen={open}
      onClose={onClose}
    >
      {children}
    </BaseTipModal>
  );
};
