import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names, resolving conflicts in favor of the
 * class that appears last.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Validate that a string is a well-formed, absolute HTTP or HTTPS URL.
 * Returns the trimmed URL when valid, or null when it is not.
 */
export function normalizeAndValidateUrl(rawValue: string): string | null {
  const trimmed = rawValue.trim();

  if (trimmed.length === 0) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return null;
  }

  if (!parsed.hostname) {
    return null;
  }

  return trimmed;
}
