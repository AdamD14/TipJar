"use client";
export default function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-2 rounded-lg border border-error-base/30 bg-error-base/10 px-3 py-2 text-sm text-error-light font-body"
    >
      {message}
    </p>
  );
}
