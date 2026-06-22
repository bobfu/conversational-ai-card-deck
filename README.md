# Conversational AI: Build & Grow Card Deck

This is a web-based card generator for RTE Developer Community.

## Quick Start

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Documentation

For collaborators and AI coding tools:

```txt
docs/ARCHITECTURE.md
docs/COLLABORATION_WORKFLOW.md
docs/HANDOFF_AND_PACKAGING.md
docs/AI_CODING_SKILL.md
```

## Assets

Place the two template images here:

```txt
/public/assets/build-template.png
/public/assets/grow-template.png
```

Place generated SVG icons here:

```txt
/public/icons/cards/{icon}.svg
```

## Add a New Card

Edit:

```txt
src/data/cards.ts
```

Add:

```ts
{
  id: "new-card-id",
  series: "build",
  title: "Card Title",
  subtitle: "一句话介绍",
  intro: "一段话简介",
  url: "https://example.com",
  icon: "new-card-id"
}
```

Then place the matching hand-prepared SVG icon here:

```txt
/public/icons/cards/new-card-id.svg
```

## Replace Templates

Replace:

```txt
/public/assets/build-template.png
/public/assets/grow-template.png
```

Template size should remain:

```txt
998 x 1331
```

If the size changes, update `DeckCard.module.css`.

## QR Code

QR code is generated from `url`. No QR image file is needed.

## Download

Each card can be downloaded as PNG.

Filename format:

```txt
{sequence}-{series}-{id}-{locale}.png
```

## Deployment

This project can be deployed to Vercel.

All visual assets should be local files under `/public` to avoid CORS issues when exporting PNG.

## Icons

Icons are manually prepared SVG files. The app only reads them from `/public/icons/cards/`.

Recommended icon style:

```txt
black line, transparent background, no gradients, no color, no shadows
```
