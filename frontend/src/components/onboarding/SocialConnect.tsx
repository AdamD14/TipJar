"use client";
import React from 'react';
import Button from '@/components/ui/Button';

export default function SocialConnect({ onConnect }: { onConnect: (provider: string) => void }) {
  // Mock implementations
  return (
    <div className="flex gap-2">
      <Button type="button" variant="outline" size="sm" onClick={() => onConnect('twitter')}>Connect Twitter</Button>
      <Button type="button" variant="outline" size="sm" onClick={() => onConnect('twitch')}>Connect Twitch</Button>
    </div>
  );
}
