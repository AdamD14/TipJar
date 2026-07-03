// frontend/src/lib/api/community/posts.contracts.ts
// Mirrors backend/src/community/posts — keep in sync with the Prisma enums
// and the shape PostsController actually returns.

export type PostType = 'POST' | 'UPDATE' | 'ANNOUNCEMENT' | 'MEDIA';
export type PostVisibility = 'PUBLIC' | 'SUBSCRIBERS_ONLY' | 'DRAFT';

export interface ReactionCounts {
  heart: number;
  fire: number;
  clap: number;
  viewerReacted: string[];
}

export interface Post {
  id: string;
  creatorId: string;
  type: PostType;
  visibility: PostVisibility;
  content: string;
  mediaUrls: string[];
  linkUrl: string | null;
  tags: string[];
  isPinned: boolean;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
  reactionCounts: ReactionCounts;
}

export interface FeedResponse {
  posts: Post[];
  total: number;
}

export interface CreatePostPayload {
  type: PostType;
  content: string;
  mediaUrls?: string[];
  linkUrl?: string;
  tags?: string[];
  visibility?: PostVisibility;
  expiresAt?: string;
}

export type UpdatePostPayload = Partial<Omit<CreatePostPayload, 'type'>>;

export type ReactionEmoji = 'heart' | 'fire' | 'clap';
