"use client";

import * as React from "react";
import QRCode from "qrcode";
import { ChevronDown, Loader2, QrCode } from "lucide-react";

import { UrlInput } from "@/components/url-input";
import { QrPreview } from "@/components/qr-preview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, normalizeAndValidateUrl } from "@/lib/utils";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type QrSize = 256 | 512 | 1024;

const SIZE_OPTIONS: QrSize[] = [256, 512, 1024];
const ERROR_CORRECTION_OPTIONS: ErrorCorrectionLevel[] = ["L", "M", "Q", "H"];

const EMPTY_URL_MESSAGE = "Please enter a URL.";
const INVALID_URL_MESSAGE = "Please enter a valid HTTP or HTTPS URL.";
const GENERATION_FAILURE_MESSAGE = "Unable to generate the QR code. Please try again.";

export function QrGenerator() {
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [confirmedUrl, setConfirmedUrl] = React.useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [size, setSize] = React.useState<QrSize>(512);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    React.useState<ErrorCorrectionLevel>("H");

  async function handleGenerate() {
    const validUrl = normalizeAndValidateUrl(url);

    if (url.trim().length === 0) {
      setError(EMPTY_URL_MESSAGE);
      return;
    }

    if (!validUrl) {
      setError(INVALID_URL_MESSAGE);
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const dataUrl = await QRCode.toDataURL(validUrl, {
        errorCorrectionLevel,
        margin: 4,
        width: size,
      });
      setQrDataUrl(dataUrl);
      setConfirmedUrl(validUrl);
    } catch {
      setError(GENERATION_FAILURE_MESSAGE);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleReset() {
    setUrl("");
    setError(null);
    setQrDataUrl(null);
    setConfirmedUrl(null);
  }

  function handleUrlChange(value: string) {
    setUrl(value);
    if (error) setError(null);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="items-center text-center">
        <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-surveyor-light text-surveyor-dark">
          <QrCode className="h-5 w-5" aria-hidden="true" />
        </div>
        <CardTitle>{qrDataUrl && confirmedUrl ? "Your QR code" : "Create a QR code"}</CardTitle>
        <CardDescription>
          {qrDataUrl && confirmedUrl
            ? "Scan to preview, or save it below."
            : "Paste a link and generate a scannable, printable QR code."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {qrDataUrl && confirmedUrl ? (
          <QrPreview qrDataUrl={qrDataUrl} url={confirmedUrl} onReset={handleReset} />
        ) : (
          <div className="flex flex-col gap-5">
            <UrlInput
              value={url}
              onChange={handleUrlChange}
              onSubmit={handleGenerate}
              error={error}
              disabled={isGenerating}
            />

            <div className="border-t border-hairline pt-4">
              <button
                type="button"
                onClick={() => setShowAdvanced((prev) => !prev)}
                aria-expanded={showAdvanced}
                aria-controls="quickqr-advanced-options"
                className="flex w-full items-center justify-between text-sm font-medium text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surveyor focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-sm"
              >
                Advanced options
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    showAdvanced && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {showAdvanced && (
                <div id="quickqr-advanced-options" className="mt-4 flex flex-col gap-4">
                  <fieldset className="flex flex-col gap-2">
                    <legend className="text-sm font-medium text-ink">QR size</legend>
                    <div className="flex gap-2">
                      {SIZE_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSize(option)}
                          aria-pressed={size === option}
                          className={cn(
                            "flex-1 rounded-md border px-3 py-2 text-sm font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surveyor focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                            size === option
                              ? "border-surveyor bg-surveyor-light text-surveyor-dark"
                              : "border-hairline bg-surface text-ink-soft hover:bg-ink/5"
                          )}
                        >
                          {option}px
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="text-sm font-medium text-ink">Error correction</legend>
                    <div className="flex gap-2">
                      {ERROR_CORRECTION_OPTIONS.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setErrorCorrectionLevel(option)}
                          aria-pressed={errorCorrectionLevel === option}
                          className={cn(
                            "flex-1 rounded-md border px-3 py-2 text-sm font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surveyor focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
                            errorCorrectionLevel === option
                              ? "border-surveyor bg-surveyor-light text-surveyor-dark"
                              : "border-hairline bg-surface text-ink-soft hover:bg-ink/5"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Generating&hellip;
                </>
              ) : (
                "Generate QR"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
