# 360 Solution Provider — V2.0

A modern web platform connecting engineering students with professionals for technical and educational solutions. Built with HTML5, CSS3, vanilla JavaScript, and Bootstrap 5 — no build tools required.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Pages & Navigation](#pages--navigation)
- [Google Sheets Integration](#google-sheets-integration)
- [Team](#team)
- [Architecture Notes](#architecture-notes)

---

## Overview

360 Solution Provider is a student-focused service platform that connects engineering students with professionals across Computer Science, Mechanical Engineering, and Education. Users can browse service categories, submit queries, write reviews, and explore the team — all without any backend server.

---

## Features

- **Service Categories** — Computer, Mechanical, and Educational services with query submission saved to Google Sheets
- **Reviews** — Star rating system (1–5) with name and comment, fetched from and saved to Google Sheets in real time
- **Help Center** — Live-search Bootstrap accordion FAQ + support contact cards
- **About Us** — Founder spotlight and core team grid with hover animations
- **Responsive Sidebar** — Collapsible on desktop, slide-in drawer on mobile with overlay backdrop
- **Toast Notifications** — Slide-in feedback toasts for all user actions
- **Favicon** — SVG favicon with violet gradient and "360" text

---

## Project Structure

```
360-solution-provider-v1-project/
├── index.html              # Shell — topbar, sidebar, iframe, toast container
├── favicon.svg             # SVG favicon
├── README.md
│
├── pages/
│   ├── home.html           # Hero, animated stats, services, testimonials, footer
│   ├── category.html       # Service pills + query modal (saves to Google Sheets)
│   ├── review.html         # Star rating form + review list (Google Sheets)
│   ├── about-us.html       # Founder spotlight + team grid
│   └── help.html           # FAQ accordion with live search
│
└── assest/
    ├── images/             # All images — logos, avatars, category icons
    │   ├── logo.png
    │   ├── vikas.JPG
    │   ├── aman.jpg
    │   ├── tarun.jpeg
    │   ├── animesh.jpeg
    │   ├── astha.jpg
    │   ├── avtar.jpeg
    │   ├── back.jpg
    │   ├── cat1.png – cat3.png
    │   └── 1.jpg – 7.jpg
    ├── css/
    │   ├── index.css       # Shell styles — topbar, sidebar, overlay, toasts
    │   ├── home.css        # Home page — hero, stats, services, footer
    │   ├── category.css    # Categories — service pills, query modal
    │   ├── review.css      # Reviews — star buttons, review cards
    │   ├── about-us.css    # About — founder card, team grid
    │   └── help.css        # Help — banner, search, FAQ accordion
    └── js/
        └── index.js        # Navigation, sidebar toggle, toast system
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 + Bootstrap 5.3.3 |
| Icons | Bootstrap Icons 1.11.3 |
| Typography | Google Fonts — Inter (400–800) |
| Scripting | Vanilla JavaScript (ES2017) |
| Storage | Google Sheets (via Apps Script Web App) |
| Version Control | Git / GitHub |

---

## Getting Started

No installation or build step required.

### Option 1 — VS Code Live Server (Recommended)

1. Open the project folder in VS Code
2. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
3. Right-click `index.html` → **Open with Live Server**

### Option 2 — Python HTTP Server

```bash
cd 360-solution-provider-v1-project
python -m http.server 8000
# Open http://localhost:8000
```

### Option 3 — Direct File

Open `index.html` directly in any modern browser.

---

## Pages & Navigation

The app uses an **iframe-based architecture** — `index.html` is the persistent shell and loads content pages into `<iframe id="frame1">`. The sidebar and topbar stay fixed while only the content changes.

| Page | File | Description |
|------|------|-------------|
| Home | `pages/home.html` | Hero, animated stats, service cards, testimonials, footer |
| Categories | `pages/category.html` | Browse services, submit queries to Google Sheets |
| Reviews | `pages/review.html` | Write reviews and view all reviews from Google Sheets |
| About Us | `pages/about-us.html` | Founder spotlight and core team profiles |
| Help | `pages/help.html` | Live-search FAQ accordion and support contact |

---

## Google Sheets Integration

Reviews and queries are stored in a Google Sheet via a Google Apps Script Web App deployed as a public endpoint.

### Setup

1. Create a Google Sheet with two tabs named **`Reviews`** and **`Queries`**
2. Add headers:
   - **Reviews:** `Timestamp | Name | Rating | Comment | Date`
   - **Queries:** `Timestamp | Service | Email | Message | Date`
3. Go to **Extensions → Apps Script**, paste the script below, and deploy as a Web App (Execute as: Me, Access: Anyone)
4. Copy the Web App URL and replace `YOUR_APPS_SCRIPT_URL_HERE` in:
   - `pages/review.html` — `const SHEET_URL = '...'`
   - `pages/category.html` — `const SHEET_URL = '...'`

### Apps Script

```javascript
function doGet(e) {
  const sheet   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Reviews');
  const rows    = sheet.getDataRange().getValues();
  const reviews = rows.slice(1).reverse().map(row => ({
    timestamp: row[0],
    name:      row[1],
    rating:    parseInt(String(row[2])) || 0,
    comment:   row[3],
    date:      row[4]
  }));
  return ContentService
    .createTextOutput(JSON.stringify({ reviews }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  const data = JSON.parse(e.postData.contents);
  if (data.type === 'query') {
    ss.getSheetByName('Queries').appendRow([
      new Date().toLocaleString('en-IN'), data.service, data.email, data.message, data.date
    ]);
  } else {
    ss.getSheetByName('Reviews').appendRow([
      new Date().toLocaleString('en-IN'), data.name, data.rating, data.comment, data.date
    ]);
  }
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## Team

| Name | Role |
|------|------|
| Vikas Gola | Founder |
| Aman Shakya | Co-Founder & CTO |
| Tarun Gupta | Co-Founder, Design Manager |
| Taruwarsh Kumar | Senior Developer |
| Animesh Dixit | Senior Graphic Designer |
| Astha Verma | Social Media Manager |
| Nazia Fareen | Content Head |

---

## Architecture Notes

- **Iframe navigation** — Content pages load into a central iframe; `navigate(page)` in `index.js` sets the `src` and updates the active nav link.
- **Sidebar** — CSS `transform: translateX` driven by `body.sidebar-open` (mobile) and `body.sidebar-collapsed` (desktop). Overlay backdrop on mobile.
- **No authentication** — Login and profile features were removed. The platform is fully public.
- **Google Sheets as database** — `fetch()` with `mode: no-cors` for POST (fire-and-forget), standard GET for reading reviews.
- **Relative timestamps** — Review dates use a `timeAgo()` helper (Just now / 2 hr ago / 3 days ago).
- **No build step** — All assets are served as-is. Deploy the project root to any static host.

---

## Deployment

Deploy the project root to any static hosting service:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)

No server configuration or environment variables required.
