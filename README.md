# Apex Athletics — Landing Page

A single-file, framework-free landing page (HTML + CSS + JS) built to drive
sign-ups for the 6-Week Transformation Challenge.

## What's in the box

Just one file: `index.html`. All CSS and JavaScript live inside it — there's
nothing to build, bundle, or `npm install`. Open it in a browser and it works.

## Running it locally

Double-click `index.html`, or serve it with any static server, e.g.:

```
npx serve .
```

or

```
python3 -m http.server
```

Then visit `http://localhost:PORT`.

## Deploying it

Upload `index.html` to any static host — Netlify, Vercel, GitHub Pages,
Cloudflare Pages, or your existing web host via FTP. No server-side code,
no database, no build step required.

## Before you go live — placeholders to replace

| What | Where | Search for |
|---|---|---|
| Gym address | Footer | `428 Foundry Street` |
| City / state / zip | Footer | `Your City, ST 00000` |
| Email | Footer | `train@apexathletics.example` |
| Phone | Footer | `(000) 000-0000` |
| Social links | Footer | the three `<a href="#" aria-label="Apex Athletics on ...">` tags |
| Hero photo | `<section class="hero">` | `heroImg` — currently hotlinked from Unsplash; swap in a real gym photo for `src` |

## The lead capture form

The form posts to your Formspree endpoint:

```
https://formspree.io/f/xzdnpkgo
```

It's already wired up in the JavaScript (`FORM_ENDPOINT` near the bottom of
the `<script>` block). Submissions will show up in your Formspree dashboard
and can be forwarded to email from there. No page reload happens on submit —
a successful send swaps the form out for a "You're In" confirmation panel;
a failed send shows an inline error and re-enables the button so the visitor
can try again.

If you ever swap Formspree for a different provider, that's the only line
you need to change.

## Editing pricing or perks

Both plans (Monthly Membership and 6-Week Challenge) are defined in one
JavaScript object near the bottom of the file:

```js
var plans = {
  monthly: { name, tagline, price, suffix, note, cta, perks: [...] },
  challenge: { name, tagline, price, suffix, note, cta, perks: [...] }
};
```

Edit the values there — the toggle, price display, and perks list all
re-render from this object, so nothing else needs to change.

## Editing testimonials

Each testimonial is a `.t-card` block inside `#carouselTrack`. Copy an
existing block, swap the quote/name/role, and it's automatically picked up
by the carousel (dots and autoplay adjust to however many cards are there).

## Design tokens

Colors, fonts, and spacing are set once as CSS variables at the top of the
`<style>` block (`:root { ... }`). Changing the accent color, background
shade, or fonts site-wide is a one-line edit per token rather than a
find-and-replace across the file.

## Browser support

Built on standard HTML5, CSS3 (custom properties, Grid, Flexbox), and
vanilla ES5-friendly JavaScript. Works in all current browsers. Respects
`prefers-reduced-motion` for visitors who've turned down animation at the
OS level.
