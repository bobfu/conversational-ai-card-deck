# Handoff and Packaging Guide

This guide explains how to give the project to another collaborator or let them run it in a browser-based coding environment.

## What to Include

When handing off the project, include:

```txt
src/
public/
content/
docs/
package.json
package-lock.json
tsconfig.json
next-env.d.ts
README.md
.gitignore
```

Do not include:

```txt
node_modules/
.next/
```

Those are generated locally.

## Important Assets

Templates:

```txt
public/assets/build-template.png
public/assets/grow-template.png
```

Fonts:

```txt
public/fonts/WenYuanRoundedSC-*.otf
```

Icons:

```txt
public/icons/cards/{icon}.svg
```

The app relies on local assets so PNG export works reliably.

## Local Setup

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

Production check:

```bash
npm run build
```

## CodeSandbox / StackBlitz Notes

Recommended setup:

```txt
Node.js 20+
npm install
npm run dev
```

Make sure these folders survive upload:

```txt
public/assets/
public/fonts/
public/icons/cards/
content/
```

If fonts are missing, the app still renders with fallback fonts, but exported PNGs will not match the intended design.

## Static Export Consideration

The current app uses a dynamic route:

```txt
src/app/api/icons/route.ts
```

It checks which SVG icons exist in `public/icons/cards/`.

If a future collaborator wants a fully static export, replace this API route with a generated icon manifest:

```txt
src/data/iconManifest.ts
```

Then the app can avoid runtime filesystem access.

## Suggested Handoff Checklist

Before handing off:

- Run `npm run build`.
- Confirm `http://localhost:3000` loads.
- Download one Chinese PNG.
- Download one English PNG.
- Download Chinese ZIP.
- Scan at least one QR code.
- Confirm latest CSV is in `content/`.
- Confirm template PNGs are 998 x 1331.

