# Collaboration Workflow

Use the CSV as the collaboration format and TypeScript as the runtime format.

## Canonical Flow

```txt
edit in Feishu / Excel / Numbers
  -> export CSV
  -> place in content/
  -> import into src/data/cards.ts
  -> run app
  -> export PNG or ZIP
```

Current latest CSV:

```txt
content/cards-final.csv
```

Current runtime data:

```txt
src/data/cards.ts
```

## CSV Columns

Use this schema:

```txt
id
series
icon
url
zh_title
zh_subtitle
zh_intro
en_title
en_subtitle
en_intro
status
notes
```

Rules:

- `id` must stay stable. It is used for filenames, icon lookup, and future linking.
- `series` must be `build` or `grow`.
- `icon` maps to `/public/icons/cards/{icon}.svg`.
- `url` generates the QR code for both Chinese and English versions.
- Chinese and English can be edited separately, but QR links are shared.
- `status` and `notes` are editorial fields and do not render on cards.

## Recommended Editorial Process

For early drafts:

```txt
only edit zh_title, zh_subtitle, zh_intro, url, status, notes
```

After Chinese copy is stable:

```txt
translate en_title, en_subtitle, en_intro
```

Before importing:

- Confirm 32 rows.
- Confirm there are no duplicate `id` values.
- Confirm `series` values are valid.
- Confirm `url` values are real links.
- Check long URLs, because QR codes become dense.

## QR Code Guidance

The app generates QR codes from `url`.

For exhibition print use, prefer short links. Very long URLs make QR codes dense and harder to scan.

Good:

```txt
https://example.com/campaign
https://mp.weixin.qq.com/mp/appmsgalbum?...album_id=...
```

Risky:

```txt
URLs above several hundred characters
links with long tracking params
temporary session URLs
```

If a QR is hard to scan, use a short link or a stable redirect page.

## Import Script Recommendation

The project does not yet have a formal import command. Recommended future script:

```txt
npm run import:cards -- content/cards-final.csv
```

The script should:

- validate row count and ids
- update `src/data/cards.ts`
- preserve TypeScript formatting
- optionally update English only when English columns are present
- print changed card ids

