// frontend/src/lib/api/community/posts.queries.ts
// Feed hooks. Endpoints below are new — add them to your shared EP object
// in endpoints.ts instead of duplicating a second endpoint map (see the
// EP vs API cleanup discussed earlier — don't recreate that problem here).

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import type {
  FeedResponse,
  CreatePostPayload,
  UpdatePostPayload,
  ReactionEmoji,
  Post,
} from './posts.contracts';

const api = apiClient;

const FEED_EP = {
  publicFeed: (creatorId: string) => `/api/v1/community/posts/${creatorId}/public`,
  myFeed: '/api/v1/community/posts/mine',
  posts: '/api/v1/community/posts',
  post: (id: string) => `/api/v1/community/posts/${id}`,
  pin: (id: string) => `/api/v1/community/posts/${id}/pin`,
  reactions: (id: string) => `/api/v1/community/posts/${id}/reactions`,
  reaction: (id: string, emoji: string) => `/api/v1/community/posts/${id}/reactions/${emoji}`,
} as const;

export function usePublicFeed(creatorId: string, page = 1, limit = 20) {
  return useQuery({
    queryKey: ['feed', 'public', creatorId, page, limit],
    queryFn: async (): Promise<FeedResponse> =>
      (await api.get(FEED_EP.publicFeed(creatorId), { params: { page, limit } })).data,
    enabled: !!creatorId,
    retry: 1,
    staleTime: 30_000,
  });
}

export function useMyFeed(page = 1, limit = 20) {
  return useQuery({
    queryKey: ['feed', 'mine', page, limit],
    queryFn: async (): Promise<FeedResponse> =>
      (await api.get(FEED_EP.myFeed, { params: { page, limit } })).data,
    retry: 1,
    staleTime: 15_000,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreatePostPayload): Promise<Post> =>
      (await api.post(FEED_EP.posts, payload)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'mine'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdatePostPayload }): Promise<Post> =>
      (await api.patch(FEED_EP.post(id), payload)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'mine'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(FEED_EP.post(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'mine'] });
    },
  });
}

export function useTogglePin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string): Promise<Post> => (await api.patch(FEED_EP.pin(id))).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feed', 'mine'] });
    },
  });
}

/**
 * Optimistic reaction toggle. Reactions are low-stakes — we update the
 * cache immediately and roll back on error instead of waiting for the
 * round trip, so clicking a heart feels instant.
 */
export function useToggleReaction(feedQueryKey: readonly unknown[]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      emoji,
      isActive,
    }: {
      postId: string;
      emoji: ReactionEmoji;
      isActive: boolean;
    }): Promise<void> => {
      if (isActive) {
        await api.delete(FEED_EP.reaction(postId, emoji));
      } else {
        await api.post(FEED_EP.reactions(postId), { emoji });
      }
    },
    onMutate: async ({ postId, emoji, isActive }) => {
      await queryClient.cancelQueries({ queryKey: feedQueryKey });
      const previous = queryClient.getQueryData<FeedResponse>(feedQueryKey);

      queryClient.setQueryData<FeedResponse>(feedQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          posts: old.posts.map((p) => {
            if (p.id !== postId) return p;
            const delta = isActive ? -1 : 1;
            return {
              ...p,
              reactionCounts: {
                ...p.reactionCounts,
                [emoji]: Math.max(0, p.reactionCounts[emoji] + delta),
                viewerReacted: isActive
                  ? p.reactionCounts.viewerReacted.filter((e) => e !== emoji)
                  : [...p.reactionCounts.viewerReacted, emoji],
              },
            };
          }),
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(feedQueryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: feedQueryKey });
    },
  });
}
