# 360 Solution Provider — V1.0

A web platform designed to provide technical and educational solutions for engineering students. Built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build tools, no dependencies.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Pages & Navigation](#pages--navigation)
- [Login Credentials](#login-credentials)
- [Team](#team)
- [Architecture Notes](#architecture-notes)

---

## Overview

360 Solution Provider is a student-focused service platform connecting engineering students with professionals across computer science, mechanical, and educational domains. Users can browse service categories, submit queries, rate services, and manage their profiles.

---

## Features

- **Authentication** — Login/Signup modal with 6 pre-configured user accounts and localStorage session persistence
- **User Profiles** — Dynamic profile pages showing user info, settings, and query history
- **Service Categories** — Computer, Mechanical, and Educational services with query submission forms
- **Reviews & Ratings** — Star-based rating system (1–5) with comment submission
- **Settings Panel** — Notification toggle, location toggle, and dark mode
- **About Us** — Team member profiles and descriptions
- **Help Center** — Support search interface and contact information
- **Responsive Design** — Mobile-friendly layout with hamburger menu (breakpoint: 700px)

---

## Project Structure

```
360-solution-provider-v1-project/
├── index.html          # Main shell — sidebar, iframe container, login/signup modals
├── home.html           # Landing page — welcome message, ratings, intro
├── profile.html        # User dashboard — profile info, settings, query history
├── category.html       # Service categories — Computer, Mechanical, Educational
├── review.html         # Feedback page — star rating and comment form
├── aboutus.html        # Team profiles and descriptions
├── help.html           # Support center and help search
├── style.css           # External stylesheet (used by index.html)
├── javascript.js       # Core JavaScript — auth, navigation, dark mode, profile logic
├── assest/             # Images — logo, avatars, category icons, backgrounds
│   ├── logo.png
│   ├── vikas.JPG
│   ├── tarun.jpeg
│   ├── aman.jpg
│   ├── animesh.jpeg
│   ├── astha.jpg
│   └── (background images 1.jpg – 7.jpg, back.jpg, cat1–3.png)
└── dist/               # Pre-built distribution files
    ├── javascript.min.js
    ├── javascript.dev.js
    └── (source maps and HTML copies)
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (Flexbox, Gradients, Animations, Media Queries) |
| Scripting | Vanilla JavaScript (ES5) |
| Icons | Font Awesome 4.7.0 (CDN) |
| Storage | localStorage API |
| Dev Server | VS Code Live Server (port 5501) |
| Version Control | Git / GitHub |

---

## Getting Started

No installation or build step required.

### Option 1 — VS Code Live Server (Recommended)

1. Open the project folder in VS Code
2. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
3. Right-click `index.html` → **Open with Live Server**
4. App runs at `http://localhost:5501`

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

The app uses an **iframe-based architecture** — `index.html` acts as the persistent shell and loads content pages into an embedded `<iframe id="frame1">`. The sidebar stays fixed while content changes.

| Page | Route | Description |
|------|-------|-------------|
| Home | `home.html` | Welcome screen, feature overview, ratings |
| Profile | `profile.html` | User info, settings toggles, query history |
| Category | `category.html` | Browse and submit service queries |
| Review | `review.html` | Rate and review the service |
| About Us | `aboutus.html` | Team member profiles |
| Help | `help.html` | Help center and support contact |

---

## Login Credentials

> These credentials are hard-coded for demo purposes only. Do not use in production.

| Username | Password | Role |
|----------|----------|------|
| vikas gola | 24111999 | Founder |
| tarun gupta | 10112000 | Co-Founder / Design Manager |
| aman shakya | 18032001 | Co-Founder & CTO |
| taruwarsh kumar | 07082000 | Senior Developer |
| animesh dixit | 09062001 | Senior Graphic Designer |
| astha verma | 17112000 | Social Media Manager |

---

## Team

| Name | Role |
|------|------|
| Vikas Gola | Founder |
| Tarun Gupta | Co-Founder, Design Manager |
| Aman Shakya | Co-Founder, CTO |
| Taruwarsh Kumar | Senior Developer |
| Animesh Dixit | Senior Graphic Designer |
| Astha Verma | Social Media Manager |

---

## Architecture Notes

- **Iframe navigation** — Content pages load into a central iframe; no client-side router used.
- **CSS checkbox hack** — Hamburger menu toggled via hidden `<input type="checkbox">` and CSS sibling selectors.
- **Dark mode** — Implemented by toggling CSS variables/classes via JavaScript; state is not persisted across sessions.
- **No backend** — All data (users, team info, service categories) is hard-coded. There is no database, API, or server-side logic.
- **dist/ folder** — Contains minified production output with source maps, ready for static hosting (GitHub Pages, Netlify, Vercel).

---

## Deployment

This is a fully static site. Deploy the project root (or the `dist/` folder for minified output) to any static hosting service:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)

No server configuration or environment variables required.
