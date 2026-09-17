import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-hairline bg-surface px-4 py-2 font-mono text-[15px] text-ink placeholder:text-ink-faint placeholder:font-sans transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surveyor focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-compass",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
