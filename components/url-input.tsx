"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error: string | null;
  disabled?: boolean;
}

export function UrlInput({ value, onChange, onSubmit, error, disabled }: UrlInputProps) {
  const inputId = "quickqr-url";
  const errorId = "quickqr-url-error";

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={inputId}>Destination URL</Label>
      <Input
        id={inputId}
        name="url"
        inputMode="url"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        placeholder="https://maps.google.com/..."
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={handleKeyDown}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(error && "border-compass")}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-compass">
          {error}
        </p>
      ) : (
        <p className="text-sm text-ink-faint">
          Works with any HTTP or HTTPS link, including Google Maps.
        </p>
      )}
    </div>
  );
}
