# A Deck of Us — Birthday Memory Site

A personal birthday website: a festive home page with a letter and memory deck, organized by category. Pull cards to reveal photos and videos one at a time, with captions and dates.

No build step — plain HTML, CSS, and JavaScript.

## What it does

1. **Home page** — Birthday theme with cake, balloons, confetti, fireworks, and an intro message.
2. **Letter** — Tap **Open me** to read the personal birthday card.
3. **Category picker** — Choose what kind of memories to browse (mirror selfies, cute moments, funny moments, etc.).
4. **Memory deck** — Pull cards to reveal the next photo or video. Go back to previous cards, reset the deck, or switch categories anytime.

## Project structure

```
birthday/
├── index.html          # Page layout + home page intro text
├── style.css           # All styling and animations
├── app.js              # Deck logic, letter modal, fireworks, lazy loading
├── memories-data.js    # Memories, categories, birthday card message
├── cake.png            # Site favicon
├── images/             # Photos, grouped by category
│   ├── mirror/
│   ├── cute/
│   ├── funny/
│   ├── trio/
│   └── special/
└── videos/             # Videos, grouped by category
    ├── cute/
    ├── funny/
    ├── trio/
    └── special/
```

## Personalizing the site

### 1. Home page intro — `index.html`

Edit the recipient name and welcome message:

- `#recipientHeadline` — e.g. "My sweet Nawal"
- `#introMessage` — the paragraphs below the name

### 2. Birthday card — `memories-data.js`

Edit `BIRTHDAY_CARD`. This is what appears when the letter is tapped:

```js
const BIRTHDAY_CARD = {
  heading: "To Nawal",
  message:
    "First paragraph.\n\n" +
    "Second paragraph — use \\n\\n between paragraphs.",
  signoff: "Celine ♡",
};
```

### 3. Memories — `memories-data.js`

Each entry in `MEMORIES` looks like this:

```js
{
  type: "photo",                    // "photo" or "video"
  src: "images/cute/img1.jpg",      // path relative to index.html
  poster: "images/cute/img1.jpg",     // optional, for videos
  caption: "A note about this moment",
  date: "June 2025",                // optional
  category: "cute",                 // must match a CATEGORIES id
  special: false,                   // true = gold border + confetti
}
```

For videos, use `.mp4` (or `.MP4`) paths under `videos/`:

```js
{
  type: "video",
  src: "videos/cute/vid1.mp4",
  caption: "A little video memory",
  date: "May 2026",
  category: "cute",
  special: false,
}
```

**Important:** `src` must match the real filename exactly, including extension (`.jpg`, `.JPG`, `.PNG`, `.mp4`, etc.).

### 4. Categories — `memories-data.js`

Default categories:

| id | Label |
|---|---|
| `favorite-trio` | Your Favorite Trio |
| `mirror-selfies` | Mirror Selfies |
| `funny` | Funny Moments |
| `cute` | Cute Moments |
| `special` | Special |

To add a category, add an entry to `CATEGORIES` and tag memories with that `id`. Memories with `special: true` also appear in the Special category.

### 5. Special pulls — `memories-data.js`

`SITE_CONFIG.specialEveryAbout` controls how often a random pull gets a gold border and confetti (in addition to memories marked `special: true`).

## Performance

Media is lazy-loaded — only the card currently on screen is fetched. Nothing else loads until it is pulled.

For faster loading, keep individual photos under ~1 MB when possible. Many phone photos are much larger and will still work, but compressing them helps.

## Running locally

Open `index.html` directly in a browser, or use a simple local server (recommended):

```bash
npx serve .
```

Then visit the URL shown (usually `http://localhost:3000`).

Upload the entire folder — including `images/` and `videos/` — to any static host (GitHub Pages, Netlify, Vercel, etc.) to share it online.
