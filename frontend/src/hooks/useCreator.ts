"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublicProfile } from "@/lib/users";

export function useCreator(alias: string) {
  return useQuery({
    queryKey: ["creator", alias],
    queryFn: () => getPublicProfile(alias),
    enabled: !!alias,
  });
}
