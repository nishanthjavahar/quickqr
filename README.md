# QuickQR

A small, fast, client-side QR code generator. Paste any HTTP or HTTPS URL — including Google Maps links — and get a downloadable, print-ready PNG QR code. No server, no database, no accounts.

## Overview

QuickQR is a single-page utility built with Next.js. Everything happens in the browser: the URL you enter is validated locally and encoded into a QR code directly on your device using the `qrcode` npm package. The URL is never sent to a server, logged, or stored anywhere.

## Features

- Generate a QR code from any valid HTTP/HTTPS URL, including Google Maps links
- Client-side generation only — no network request is made with your URL
- High error correction (level H) by default, suitable for printing
- Adjustable advanced options: QR size (256 / 512 / 1024 px) and error correction level (L / M / Q / H)
- Download the QR code as a high-resolution `quickqr.png`
- Copy the original URL to the clipboard with one click
- Full keyboard support — press **Enter** in the URL field to generate
- Clear, accessible validation and error messages
- Responsive, mobile-first layout with visible focus states

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS](https://tailwindcss.com/)
- shadcn/ui-style components (Button, Input, Card, Label)
- [`qrcode`](https://www.npmjs.com/package/qrcode) for client-side QR generation
- ESLint + Prettier

## Folder structure

```
quickqr/
├── app/
│   ├── layout.tsx        # Root layout, fonts, SEO metadata
│   ├── page.tsx           # Landing page
│   └── globals.css        # Tailwind base styles
├── components/
│   ├── qr-generator.tsx   # Main stateful component: form, options, generation
│   ├── qr-preview.tsx     # QR display, download, copy, reset
│   ├── url-input.tsx      # Controlled, validated URL input
│   └── ui/                # shadcn/ui-style primitives (button, input, card, label)
├── lib/
│   └── utils.ts           # cn() class helper + URL validation
├── public/
│   └── favicon.ico
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Installation

Requires Node.js 18.18 or later.

```bash
npm install
```

## Development

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

Other useful commands:

```bash
npm run lint     # Run ESLint
npm run format   # Format with Prettier
```

## Production build

```bash
npm run build
npm start
```

## Deployment (Vercel)

QuickQR requires no environment variables, database, or backend service, so deployment is a single step:

1. Push this project to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Leave the default settings — Vercel detects Next.js automatically (`npm run build`, output directory managed automatically).
4. Click **Deploy**.

You can also deploy from the CLI:

```bash
npm install -g vercel
vercel
```

No configuration files, secrets, or environment variables are needed at any step.

## How QR generation works

1. The user types or pastes a URL into the input field.
2. On submit (button click or Enter key), the value is trimmed and validated with the browser's built-in `URL` parser, restricted to the `http:` and `https:` protocols.
3. If valid, the URL is passed to `QRCode.toDataURL()` from the `qrcode` package, which runs entirely in the browser and returns a base64-encoded PNG data URL.
4. The data URL is stored in component state and rendered directly as an `<img>` element — no canvas element needs to stay mounted, but the `qrcode` library uses a canvas internally to produce the image.
5. Downloading creates a temporary `<a>` element pointing at the data URL with a `download="quickqr.png"` attribute, and triggers a click — a fully client-side download with no server round trip.

## Security considerations

- **Untrusted input**: the entered URL is treated as untrusted. It is parsed with the native `URL` constructor rather than manipulated with string concatenation or regular expressions, and only `http:`/`https:` protocols are accepted (so `javascript:`, `data:`, and other schemes are rejected).
- **No `dangerouslySetInnerHTML`**: the app never injects raw HTML; the QR image is rendered as a standard `<img src>` pointing at a data URL.
- **No persistence**: URLs are kept only in component state for the duration of the page session. Nothing is written to a database, cookie, or localStorage.
- **No network exposure**: because QR generation happens client-side, the destination URL you enter is never transmitted to any server operated by this application.
- **No authentication, no tracking**: there are no accounts, sessions, or analytics scripts.
