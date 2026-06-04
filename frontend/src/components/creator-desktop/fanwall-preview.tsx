"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";

interface FanMessage {
  id: string;
  author: string;
  initial: string;
  body: string;
  likes: number;
  timestamp: string;
}

const mockMessages: FanMessage[] = [
  {
    id: "1",
    author: "StreamFan99",
    initial: "S",
    body: "Best stream ever! When are you going live again?",
    likes: 12,
    timestamp: "15m ago",
  },
  {
    id: "2",
    author: "CryptoPanda",
    initial: "C",
    body: "Just discovered your channel \u2014 love the vibes!",
    likes: 8,
    timestamp: "1h ago",
  },
  {
    id: "3",
    author: "Alice.eth",
    initial: "A",
    body: "You inspired me to start my own channel. Thank you!",
    likes: 24,
    timestamp: "3h ago",
  },
];

export function FanwallPreview() {
  const [messages, setMessages] = useState<FanMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="card-surface !p-6">
        <div className="skeleton-shimmer h-4 w-28 rounded mb-4" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="skeleton-shimmer w-8 h-8 rounded-full shrink-0" />
              <div className="flex-1">
                <div className="skeleton-shimmer h-3 w-20 rounded mb-2" />
                <div className="skeleton-shimmer h-3 w-full rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card-surface !p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-sm uppercase tracking-widest text-text-tertiary">
          Fanwall
        </h3>
        <span className="font-body text-xs text-text-quaternary">
          {messages.length} messages
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
          <MessageSquare className="w-10 h-10 text-purple-300" />
          <p className="font-body text-sm text-text-secondary">
            Your fanwall is waiting. Fans will leave messages when you go live.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.slice(0, 3).map((msg, idx) => (
            <div
              key={msg.id}
              className="flex gap-3 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-purple-300/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="font-heading font-semibold text-xs text-purple-300">
                  {msg.initial}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body font-semibold text-sm text-text-primary">
                    {msg.author}
                  </span>
                  <span className="font-body text-[10px] text-text-quaternary">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {msg.body}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <ThumbsUp className="w-3 h-3 text-purple-300" />
                  <span className="font-body text-xs text-purple-300">{msg.likes}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Quick reply tease */}
          <div className="flex items-center gap-2 pt-2 border-t border-teal-600">
            <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-teal-800 text-text-tertiary">
              <Send className="w-3.5 h-3.5" />
              <span className="font-body text-xs">Say something to your fans...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}