"use client";

import { useState } from "react";
import Card from "@/components/ui/forms/Card";
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Send, 
  Sparkles, 
  Volume2, 
  Share2 
} from "lucide-react";

const INITIAL_POSTS = [
  {
    id: 1,
    creator: "@kate_premium",
    displayName: "Kate | Exclusive VIP 🍑",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "Exclusive VIP photoshoot dropping tonight at 8 PM EST! Make sure your Tier-3 sub is active to get full high-res access. 💎✨",
    likes: 342,
    comments: 89,
    time: "2 hours ago",
    liked: false
  },
  {
    id: 2,
    creator: "@coach_max",
    displayName: "Coach Max 💪",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    content: "Weekly Zoom Q&A session starts in 1 hour. Get your questions ready regarding macros, keto diets, or deadlift forms! 🎙️",
    likes: 128,
    comments: 41,
    time: "4 hours ago",
    liked: true
  }
];

export default function FanCommunityPage({
  params,
}: {
  params: { username: string };
}) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newComment, setNewComment] = useState("");

  const handleLike = (id: number) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          liked: !p.liked,
          likes: p.liked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-main text-white selection:bg-teal-600/30 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-teal-500/10 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-header tracking-tight flex items-center gap-2 bg-gradient-to-r from-teal-100 to-white bg-clip-text text-transparent">
              <Users className="text-teal-400" />
              Creator Community
            </h1>
            <p className="text-sm text-[#ABE1E1]/70 leading-relaxed">
              Interact directly with updates, Q&A sessions, and exclusive member announcements from creators you support.
            </p>
          </div>
        </div>

        {/* Community Board Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border border-teal-500/10 bg-[#002424]/40 rounded-3xl p-6 relative overflow-hidden space-y-4 transition-all duration-300 hover:border-teal-400/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <img
                    src={post.avatar}
                    alt={post.displayName}
                    className="w-10 h-10 rounded-full border border-teal-400/20 object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-black text-white">{post.displayName}</h3>
                    <p className="text-[10px] text-teal-400 font-mono">@{post.creator}</p>
                  </div>
                </div>
                <span className="text-[10px] text-teal-400/40 font-semibold">{post.time}</span>
              </div>

              <p className="text-xs text-teal-100/90 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Action stats */}
              <div className="flex items-center gap-4 pt-3 border-t border-teal-500/5 text-xs text-teal-400/60 font-black uppercase tracking-wider">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${post.liked ? "text-pink-400" : "hover:text-pink-300"}`}
                >
                  <Heart size={14} className={post.liked ? "fill-pink-400" : ""} />
                  {post.likes} Likes
                </button>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-teal-300">
                  <MessageSquare size={14} />
                  {post.comments} Comments
                </div>
                <button className="flex items-center gap-1.5 hover:text-teal-300 ml-auto">
                  <Share2 size={14} />
                  Share
                </button>
              </div>

              {/* Mock comment box */}
              <div className="relative pt-2">
                <input
                  type="text"
                  placeholder="Join the member conversation..."
                  className="w-full pl-4 pr-12 py-3 bg-black/40 border border-teal-500/10 focus:border-teal-400 rounded-xl focus:outline-none placeholder-teal-800/40 text-xs transition-all text-white"
                />
                <button className="absolute inset-y-0 right-2 flex items-center pr-2 text-teal-400 hover:text-teal-300 transition-colors">
                  <Send size={14} />
                </button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
