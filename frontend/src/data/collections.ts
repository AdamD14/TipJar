export type HandleEntry =
  | string
  | {
      handle: string;
      score?: number;
      tags?: string[];
      createdAt?: string;
      avatarUrl?: string;
      live?: boolean;
    };

export type Collection = {
  slug: string;
  title: string;
  description?: string;
  handles: HandleEntry[];
};

export const collections: Collection[] = [
  // przykłady (opcjonalnie):
  // {
  //   slug: "gaming",
  //   title: "Gaming",
  //   handles: [
  //     {
  //       handle: "pro_streamer",
  //       score: 85,
  //       tags: ["twitch"],
  //       createdAt: "2025-07-01",
  //       avatarUrl: "https://example.com/avatar.jpg",
  //       live: true,
  //     },
  //   ],
  // },
];
