# A Deck of Us — Memory Birthday Site

A little "pull a card" birthday website. Opens on a heartfelt intro, then shows
a stacked card pack — each pull flips a card in 3D to reveal a photo/video and
a memory.

## Files

- `index.html` — page structure
- `style.css` — all styling (palette, type, the flip animation)
- `memories-data.js` — **the only file you need to edit**
- `app.js` — the logic (shuffling, flipping, lazy loading, confetti)

## Making it yours

Open `memories-data.js`:

1. Set `SITE_CONFIG.recipientName` and `SITE_CONFIG.introMessage` at the top.
2. Replace the demo data. Delete the `buildDemoMemories(...)` demo block and
   set `MEMORIES` to your own array, one object per memory:

   ```js
   const MEMORIES = [
     {
       type: "photo",                        // "photo" or "video"
       src: "assets/photos/01.jpg",           // your file, or any image/video URL
       caption: "The day we got lost looking for tacos.",
       date: "June 2019",                     // optional
       special: false,                        // true = gold border + confetti on pull
     },
     // ...as many as you like — there's no limit in the code.
   ];
   ```

3. Put your photos/videos in an `assets` folder next to these files and point
   `src` at them with a relative path (e.g. `assets/photos/beach.jpg`).

The demo ships with 100+ placeholder photos (from a free placeholder image
service) and two sample videos, purely so you can see the deck working before
you swap in your own media.

## How performance stays fast with 100+ memories

- Only the card currently being viewed loads its photo/video — nothing else
  in the deck is fetched until it's actually pulled.
- Thumbnails in the "Kept memories" gallery use `IntersectionObserver` so they
  only load once scrolled into view.
- Videos use `preload="none"` and don't play until their card has flipped.

## Opening it

Just open `index.html` in a browser — no build step, no server needed. To
share it as a real website, upload the whole folder (including `assets`) to
any static host (GitHub Pages, Netlify, Vercel, etc.).
