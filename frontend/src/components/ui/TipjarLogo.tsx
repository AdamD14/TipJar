import clsx from "clsx";

export function TipjarLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx("h-7 w-auto", className)}
      aria-label="TipJar"
    >
      <path
        d="M16 3L4 9v6l12 6 12-6V9L16 3z"
        fill="currentColor"
        fillOpacity={0.18}
      />
      <path
        d="M4 15v8l12 6 12-6v-8"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <path
        d="M4 9l12 6 12-6M16 15v14"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      <circle cx="16" cy="9" r="2" fill="currentColor" />
    </svg>
  );
}
