# Conversational AI Card System Architecture

This project is currently a printable card generator, but it should be treated as a reusable card system. Future collaborators can use the same content, assets, and visual language to build new experiences such as an exhibition draw-a-word site.

## Current Product

The current app generates Build & Grow card images.

```txt
content CSV
  -> src/data/cards.ts
  -> CardArtwork component
  -> preview grid
  -> single PNG download
  -> language ZIP download
```

Runtime data lives in:

```txt
src/data/cards.ts
```

Editable collaboration source lives in:

```txt
content/cards-final.csv
```

The CSV is not read directly by the website today. It is the human collaboration format. The TypeScript file is the runtime source.

## Core Boundaries

Keep these boundaries clear:

```txt
public/assets/       template images and large visual backgrounds
public/fonts/        local fonts used for export-safe rendering
public/icons/cards/  hand-prepared SVG icons
content/             CSV handoff files
src/data/            runtime card data
src/components/      reusable card and export components
src/app/             pages and routes
docs/                instructions for humans and AI coding tools
```

Do not mix editorial data into CSS or component logic. Do not put layout-specific code into the CSV.

## Card Data Model

Each card has:

```ts
id: string;
series: "build" | "grow";
title: string;
subtitle: string;
intro: string;
url: string;
icon: string;
```

English cards are derived from the same card object and only override:

```txt
title
subtitle
intro
```

That means Chinese and English share:

```txt
id
series
url
icon
```

QR codes are therefore synchronized across languages.

## Visual System

The card image is not a static final PNG. It is a layered web component:

```txt
template image
  + title
  + subtitle
  + intro
  + optional icon
  + generated QR code
```

Templates:

```txt
public/assets/build-template.png
public/assets/grow-template.png
```

Required size:

```txt
998 x 1331
```

Keep templates as full-background images. Do not split bubbles, labels, logos, or corner decorations into separate assets unless the whole design system is being intentionally rebuilt.

## Export System

The card component exports through `html-to-image`.

Single-card export:

```txt
DeckCard -> exportCardElementToPng -> download PNG
```

Bulk export:

```txt
page.tsx -> temporarily render target-language cards offscreen
         -> export each CardArtwork to PNG
         -> JSZip
         -> download ZIP
```

Current PNG naming:

```txt
01-build-product-library-zh.png
17-grow-supersonic-en.png
```

Sequence numbers are global across Build and Grow, using the data order.

## Future Exhibition Draw Site

The next product should be a separate experience, not a replacement for the generator.

Recommended path:

```txt
src/app/draw/page.tsx
src/components/DrawExperience.tsx
src/data/drawDeck.ts
public/assets/draw/
```

The draw site can reuse:

```txt
fonts
series colors
template mood
card ids
card themes
```

But it should not depend on the PNG export workflow unless it needs downloadable artifacts.

Suggested draw data:

```ts
export interface DrawWord {
  id: string;
  word: string;
  series?: "build" | "grow";
  prompt: string;
  relatedCardId?: string;
  tone?: "courage" | "curiosity" | "connection" | "beyond" | "craft";
}
```

The exhibition interaction should optimize for:

```txt
instant loading
touch-friendly UI
large typography
keyboard/mouse/touch support
reset between visitors
no login
no database
local assets only
```

## Recommended Development Strategy

Use this project as a source kit with modes:

```txt
Mode 1: Generator
  - current app
  - preview and export cards
  - content production workflow

Mode 2: Exhibition Draw
  - separate route or separate fork
  - no batch export required
  - local draw words and animations

Mode 3: Remix Template
  - collaborators create new card experiences
  - reuse data/assets/components selectively
```

Avoid making the generator page carry every future interaction. Add separate routes or forks once the concept is different enough.

