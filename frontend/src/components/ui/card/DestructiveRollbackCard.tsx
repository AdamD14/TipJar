import React from "react";

export interface DestructiveRollbackCardProps {
  title?: string;
  errorMessage?: string;
  buttonText?: string;
  onRetryClick?: () => void;
}

export const DestructiveRollbackCard: React.FC<DestructiveRollbackCardProps> = ({
  title = "DestructiveRollbackCard",
  errorMessage = "External network rejected the transaction signature (Gas Error). Your balance remains intact.",
  buttonText = "Retry Network",
  onRetryClick,
}) => {
  return (
      <output
        className="u-bezold-trigger gpu-layer shadow-maestro elevation-z-1 relative overflow-hidden isolate w-full"
        style={{
          backgroundColor: "var(--error-dark)",
          borderLeft: "4px solid var(--error-base)",
          borderRadius: "12px",
        }}
        role="alert"
      >
        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 mt-0.5" style={{ color: "var(--error-base)" }}>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className="text-lg font-semibold mb-1"
                style={{
                  color: "var(--error-base)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {errorMessage}
              </p>
            </div>
          </div>

          <button
            onClick={onRetryClick}
            className="squishy-3d text-sm whitespace-nowrap cursor-pointer font-semibold"
            style={{
              background: "transparent",
              color: "var(--error-base)",
              border: "1px solid var(--error-base)",
              padding: "10px 20px",
              borderRadius: "6px",
              fontFamily: "var(--font-body)",
              transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--error-base)";
              e.currentTarget.style.color = "var(--error-dark)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--error-base)";
            }}
          >
            {buttonText}
          </button>
        </div>
      </output>
  );
};

export default DestructiveRollbackCard;
