# Sigmoid – website

Static HTML/CSS/JS site. No build step needed.

## Files

| File | What it is |
|---|---|
| `index.html` | New homepage (desktop + mobile) |
| `home.css` | Homepage styles |
| `home.js` | Homepage interactions: hero slider, header, ticker, reveals, back to top |
| `cookies.css`, `cookies.js` | Cookie consent banner (EU: Accept / Reject / Customize) |
| `logo.svg`, `logo-mark.svg` | Logo and favicon |
| `about.html`, `contact.html`, `expertise.html`, `industries.html`, `insights.html`, `success-stories.html`, `working-with-us.html` | Inner pages (still the previous design) |
| `styles.css`, `script.js` | Styles and script for the inner pages |
| `buttons.html`, `typography.html` | Design-system reference pages (not linked in the menu) |

## Open in VS Code

1. Unzip, then in VS Code: **File → Open Folder…** and pick the `sigmoid-site` folder.
2. To preview, install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.
   (Opening the file directly also works, but the page transitions and cookie banner behave best from a local server.)

## Deploy to Vercel

Option A, with Git:
1. Push this folder to a GitHub repository.
2. On vercel.com → **Add New… → Project** → import the repository → **Deploy** (Framework preset: *Other*, no build command).

Option B, from the VS Code terminal:
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

## Notes

- Fonts load from Google Fonts. For GDPR it is better to self-host them (download Oswald 300/400 and Roboto 300/400 as `.woff2` into a `fonts/` folder and replace the Google Fonts `<link>` with `@font-face` rules).
- Cookie banner: other scripts should load analytics/marketing tags only after consent. Check `window.sigmoidConsent` or listen for the `sigmoid:consent` event. The consent text should be reviewed against your Cookie and Privacy policies.
- `?v=...` on the CSS/JS links in `index.html` forces browsers to load the newest files. Change the number when you edit those files.
