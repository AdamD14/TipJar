export type UiError = { message: string; code?: number; details?: unknown };

export function toUiError(
  e: unknown,
  fallback = "Something went wrong",
): UiError {
  if (!e) return { message: fallback };
  if (typeof e === "string") return { message: e };
  if (e instanceof Error) return { message: e.message || fallback };
  try {
    const any = e as any;
    const msg = any?.message || any?.error || any?.data?.message || fallback;
    const code = any?.status || any?.code || any?.data?.code;
    const details = any?.errors || any?.data?.errors;
    return { message: String(msg), code: Number(code) || undefined, details };
  } catch {
    return { message: fallback };
  }
}
