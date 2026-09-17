import { QrGenerator } from "@/components/qr-generator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 py-16 sm:py-24">
      <header className="mb-10 flex flex-col items-center text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          QuickQR
        </h1>
        <p className="mt-3 max-w-sm text-base text-ink-soft">Generate QR codes from any URL</p>
      </header>

      <QrGenerator />

      <footer className="mt-12 text-center text-xs text-ink-faint">
        Generated entirely in your browser. Nothing is uploaded or stored.
        <p className="mt-2">
          © 2026 QuickQR · Built by <span className="font-medium text-ink">Nishanth J</span>
        </p>
      </footer>
    </main>
  );
}
