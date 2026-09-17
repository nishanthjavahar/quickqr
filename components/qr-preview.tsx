"use client";

import * as React from "react";
import { Check, Copy, Download, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QrPreviewProps {
  qrDataUrl: string;
  url: string;
  onReset: () => void;
}

export function QrPreview({ qrDataUrl, url, onReset }: QrPreviewProps) {
  const [copyState, setCopyState] = React.useState<"idle" | "copied" | "error">("idle");

  React.useEffect(() => {
    if (copyState === "idle") return;
    const timer = window.setTimeout(() => setCopyState("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  function handleDownload() {
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "quickqr.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="flex animate-reveal flex-col items-center gap-6">
      <div className="flex w-full items-center justify-center rounded-card border border-hairline bg-white p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={qrDataUrl}
          alt={`QR code linking to ${url}`}
          className="h-56 w-56 max-w-full sm:h-64 sm:w-64"
          width={256}
          height={256}
        />
      </div>

      <p className="w-full break-all rounded-md bg-surveyor-light px-4 py-3 text-center font-mono text-sm text-surveyor-dark">
        {url}
      </p>

      <div className="flex w-full flex-col gap-3 sm:flex-row">
        <Button onClick={handleDownload} className="flex-1" size="lg">
          <Download className="h-4 w-4" aria-hidden="true" />
          Download PNG
        </Button>
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1"
          size="lg"
          aria-live="polite"
        >
          {copyState === "copied" ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy URL
            </>
          )}
        </Button>
      </div>

      {copyState === "error" && (
        <p role="alert" className="text-sm text-compass">
          Unable to copy the URL.
        </p>
      )}

      <Button onClick={onReset} variant="ghost" size="sm">
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Generate new QR
      </Button>
    </div>
  );
}
