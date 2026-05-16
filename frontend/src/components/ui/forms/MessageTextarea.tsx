"use client";

import { forwardRef } from "react";
import Textarea from "./Textarea";
import Field from "./Field";

export interface MessageTextareaProps {
  value: string;
  maxLength?: number;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  error?: string;
}

export const MessageTextarea = forwardRef<
  HTMLTextAreaElement,
  MessageTextareaProps & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">
>(
  (
    {
      value,
      maxLength = 140,
      onChange,
      label = "Message",
      id = "message",
      error,
      ...rest
    },
    ref,
  ) => (
    <Field label={label} htmlFor={id} error={error}>
      <Textarea
        ref={ref}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        maxLength={maxLength}
        placeholder="Add a message (optional)"
        state={error ? "error" : "default"}
        className="h-24 resize-none"
        {...rest}
      />
      <div className="mt-1 text-right text-xs text-text-ds-tertiary font-body">
        {value.length}/{maxLength}
      </div>
    </Field>
  ),
);

MessageTextarea.displayName = "MessageTextarea";

export default MessageTextarea;
