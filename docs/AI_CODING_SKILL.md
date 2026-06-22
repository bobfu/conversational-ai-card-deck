# AI Coding Skill: Conversational AI Card System

Use this file as the portable instruction sheet for AI coding tools working on this project.

## Mission

Maintain and extend the Conversational AI Build & Grow card system.

The system currently generates printable card PNGs and ZIP bundles. It may later support exhibition interactions such as draw-a-word or draw-a-card experiences.

## Non-Negotiables

- Do not redesign the existing Build & Grow card templates unless explicitly asked.
- Keep template size at `998 x 1331` unless the user explicitly changes the design.
- Use local assets only for card rendering and PNG export.
- Do not use remote image URLs inside card DOM.
- QR codes are generated from `card.url`.
- Chinese and English versions share the same `url`.
- Icons are manually supplied SVGs from `/public/icons/cards/{icon}.svg`.
- Missing icons must not break rendering or export.
- Run `npm run build` before finishing meaningful code changes.

## Primary Files

```txt
src/app/page.tsx                    main generator page
src/components/DeckCard.tsx         card rendering and PNG export logic
src/components/DeckCard.module.css  card layout and typography
src/data/cards.ts                   runtime data
src/app/api/icons/route.ts          local icon discovery
public/assets/                      Build/Grow templates
public/fonts/                       local fonts
public/icons/cards/                 manual SVG icons
content/                            CSV collaboration files
```

## Data Rules

Runtime model:

```ts
interface CardItem {
  id: string;
  series: "build" | "grow";
  title: string;
  subtitle: string;
  intro: string;
  url: string;
  icon: string;
}
```

English data should override only:

```txt
title
subtitle
intro
```

Do not duplicate or separately maintain English URLs unless the user asks.

## Visual Rules

Chinese card typography:

```txt
WenYuanRoundedSC first
title heaviest
subtitle strong
intro lighter than subtitle
```

English card typography:

```txt
rounded-friendly font stack
title strongest
subtitle medium
intro lighter body text
```

QR code:

```txt
white background
black foreground
size currently 118px
generated with QRCodeSVG
```

Long URLs make dense QR codes. Prefer short links for print and exhibition use.

## Export Rules

Single PNG and ZIP files use global sequence numbers:

```txt
01-build-product-library-zh.png
17-grow-supersonic-en.png
```

Sequence is based on the full card data order, not current filter.

Bulk ZIP export should show progress:

```txt
rendering cards
current file
x / total
compressing zip
```

## Future Exhibition Draw Experience

If asked to build an exhibition experience, do not overload the current generator page. Prefer a separate route:

```txt
src/app/draw/page.tsx
```

Suggested principles:

- no database
- no login
- local data
- touch-friendly
- resettable between visitors
- works on a MacBook at a booth
- large type and clear motion
- optional keyboard shortcut for staff

Suggested data:

```ts
interface DrawWord {
  id: string;
  word: string;
  prompt: string;
  relatedCardId?: string;
  series?: "build" | "grow";
}
```

## Change Discipline

When modifying this project:

1. Read the existing component and CSS before editing.
2. Keep changes scoped to the request.
3. Preserve export behavior unless asked.
4. Keep local fonts and assets in `public/`.
5. Validate with `npm run build`.
6. Report exactly what changed.

