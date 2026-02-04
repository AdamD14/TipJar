"use client";
import React from "react";
import Image from "next/image";
import {
  Lock,
  Play,
  Image as ImageIcon,
  AlignLeft,
  ArrowRight,
} from "lucide-react";

export type ContentItem = {
  id: string;
  title: string;
  coverUrl?: string | null;
  locked?: boolean;
  type?: "video" | "post" | "gallery";
  date?: string;
};

type Props = {
  items: ContentItem[];
};

export default function ContentGrid({ items }: Props) {
  if (!items.length) {
    return (
      <p className="text-sm text-gray-400 text-center italic py-8">
        No posts yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map((it) => (
        <article
          key={it.id}
          className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:shadow-teal-500/5 cursor-pointer"
        >
          <div className="relative h-48 w-full overflow-hidden">
            {it.coverUrl ? (
              <Image
                src={it.coverUrl}
                alt={it.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full bg-white/5 flex items-center justify-center">
                <ImageIcon className="text-white/20 w-10 h-10" />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80"></div>

            {/* Premium Badge */}
            {it.locked && (
              <div className="absolute top-3 right-3 bg-black/90 backdrop-blur-md border border-yellow-500/30 px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-xl z-20">
                <Lock className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">
                  Premium
                </span>
              </div>
            )}

            {/* Type Icon */}
            <div className="absolute bottom-3 right-3 text-white/90 bg-black/40 p-1.5 rounded-lg backdrop-blur-sm border border-white/10 z-20">
              {it.type === "video" ? (
                <Play className="w-3 h-3" />
              ) : it.type === "gallery" ? (
                <ImageIcon className="w-3 h-3" />
              ) : (
                <AlignLeft className="w-3 h-3" />
              )}
            </div>
          </div>

          <div className="p-4">
            <h3 className="truncate text-base font-bold text-white group-hover:text-yellow-400 transition-colors mb-1">
              {it.title}
            </h3>
            <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-3">
              <span className="text-xs text-gray-400 font-mono opacity-70">
                {it.date || "Recently"}
              </span>
              <button className="flex items-center gap-1 text-xs text-teal-400 hover:text-yellow-400 font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                View <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
