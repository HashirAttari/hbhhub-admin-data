# 🚀 hbh-deve

> A flexible SSR view engine and dynamic file-based route loader for Express.js.  
> Supports `.pug`, `.html`, `.md`, and `.js` views — with live reload, layouts, and developer-friendly DX.

---

## ✨ Features

- 📁 **File-based routing** — Auto-maps `views/pages/` structure to Express routes
- 🧠 **Multi-format views** — Render `.pug`, `.html`, `.md`, and `.js` as SSR templates
- 🔁 **Live reload** — Watches files and reloads connected browsers on changes
- 🧩 **Layouts** — Optional `layout.pug` support with layout toggling per-view
- 📦 **Frontmatter** — In Markdown and `.js` views for metadata
- 🛠️ **Middleware support** — Per-view Express middleware via `.js` exports
- 🔧 **Configurable** — Customizable via `hbh-deve.config.js` or use same defaults
- 🧪 **Error overlays** — In-browser overlays for SSR/runtime errors

---

## 📦 Installation

```bash
npm install hbh-deve
# or
yarn add hbh-deve
````

---

## 🗂️ Project Structure

```bash
project-root/
├── views/
│   ├── layout.pug            # Optional shared layout
│   └── pages/                # Route-driven views
│       ├── index.pug         # route: /
│       ├── about.html        # route: /about
│       ├── blog/
│       │   └── [slug].md     # dynamic: /blog/:slug
│       └── user/[id].js      # dynamic: /user/:id
├── hbh-deve.config.js        # Optional custom config
└── index.js                  # App entry
```

---

## ⚙️ Configuration (Optional)

```js
// hbh-deve.config.js
import path from 'path';

const __dirname = process.cwd();
const ViewBase = path.join(__dirname, 'views');

export const directories = {
  __dirname,
  ViewBase,
  PagesBase: path.join(ViewBase, 'pages'),
  Layout: path.join(ViewBase, 'layout.pug')
};
```

---

## 🚀 Quick Start

### 1. Create Express app

```js
import express from 'express';
import { Attach } from 'hbh-deve';

const app = express();

await Attach(app); // Loads all views + routes automatically

app.listen(3000, () => {
  console.log('✅ Running at http://localhost:3000');
});
```

### 2. Add views

#### ✅ `views/pages/index.pug`

```pug
h1 Welcome to my app!
p Current time: {{ new Date().toLocaleTimeString() }}
```

#### ✅ `views/pages/blog/[slug].md`

```md
---
title: My Blog Post
nolayout: false
---

# Hello {{ params.slug }}

This is a markdown page.
```

#### ✅ `views/pages/user/[id].js`

```js
export default async ({ params }) => {
  return {
    title: `User: ${params.id}`,
    html: `<p>Hello, <strong>${params.id}</strong></p>`
  };
};

export const middlewares = [
  (req, res, next) => {
    console.log('👋 User route hit');
    next();
  }
];
```

---

## 🔹 Layouts

Supports **optional layouts** (`layout.pug`) with automatic injection of default content and live reload. The behavior adapts based on what the user layout already contains.

---

### 1️⃣ Default Layout Injection

Given a layout like:

```pug
doctype html
html
  head
    title My App
  body
    h1 Header from layout
```

The engine automatically injects:

* **Live reload script** (always)
* **Default content block** if `.page!= page` is missing
* **Default scripts block** if `.scripts!= scripts` is missing

**Rendered final Pug:**

```pug
doctype html
html
  head
    title My App
  body
    h1 Header from layout

    // ✅ Injected automatically:
    script.
      const es = new EventSource('/__reload');
      es.onmessage = (e) => {
        if (e.data === 'reload') location.reload();
      };

    if page
      .page!= page

    if scripts
      .scripts!= scripts
```

> User-defined blocks are respected — duplicates are never injected.

---

### 2️⃣ Per-View Layout Toggle

You can disable the layout **per view** if needed:

| View Type | How to disable layout                                    |
| --------- | -------------------------------------------------------- |
| `.pug`    | Add `//- nolayout` at the top                            |
| `.md`     | Add `nolayout: true` in frontmatter                      |
| `.js`     | Return `{ nolayout: true }` from the async view function |

---

### 3️⃣ Injection Flow

```text
        ┌─────────────────────┐
        │ Load user layout.pug │
        └─────────┬───────────┘
                  │
                  ▼
       ┌───────────────────┐
       │ Strip comments     │
       └─────────┬─────────┘
                 │
                 ▼
   ┌─────────────────────────────┐
   │ Build injection string       │
   │ (force reload + default      │
   │ content/scripts if missing)  │
   └─────────┬───────────┬───────┘
             │           │
             │           ▼
             │     ┌───────────────┐
             │     │ Inject into   │
             │     │ <body> tag    │
             │     │ maintain      │
             │     │ indentation   │
             │     └─────┬─────────┘
             ▼           │
   ┌─────────────────────────────┐
   │ Compile final Pug            │
   │ Render with locals           │
   └─────────────────────────────┘
```

---

### 4️⃣ Fallback

If `layout.pug` does not exist:

* A **default layout** with all blocks and live reload is used.
* Ensures the page always renders without breaking.

---

### 5️⃣ Example Usage in a Pug Page

`views/pages/index.pug`:

```pug
h1 Welcome
p Current time: {{ new Date().toLocaleTimeString() }}
```

**Behavior:**

* If `layout.pug` exists:

  * `h1 Welcome` remains intact
  * `.page!= page` is injected if missing
  * Live reload script is added automatically

* If `layout.pug` is missing:

  * Page is rendered with the default layout
  * `.page!= page` and live reload script are included automatically

### 6️⃣ Automatic Injection Overview

| Injection Type             | When It Happens                      | Notes                                            |
| -------------------------- | ------------------------------------ | ------------------------------------------------ |
| Live reload script         | **Always**                           | Injected in every page rendered                  |
| `.page!= page` block       | Only if missing in user `layout.pug` | Ensures content is displayed without duplication |
| `.scripts!= scripts` block | Only if missing in user `layout.pug` | Scripts section is added if not already present  |
| User-defined blocks        | Never overwritten                    | Preserves whatever user has already defined      |

> ✅ This table helps you quickly see what the engine automatically injects versus what it preserves.

---

## 🧠 Supported View Types

| Format  | Features                                                                        |
| ------- | ------------------------------------------------------------------------------- |
| `.pug`  | Pug syntax, supports `layout.pug`, variable injection                           |
| `.html` | HTML with `{{ variable }}` interpolation                                        |
| `.md`   | Markdown with frontmatter, supports `nolayout`                                  |
| `.js`   | Async view functions, return `{ html, title, ... }`, can export `middlewares[]` |

---

## 🧩 Routing Patterns

| File Name             | Route Path     |
| --------------------- | -------------- |
| `index.pug`           | `/`            |
| `about.html`          | `/about`       |
| `user/[id].js`        | `/user/:id`    |
| `blog/[[lang]].md`    | `/blog/:lang?` |
| `docs/[...slug].md`   | `/docs/*`      |
| `api/[[...catch]].js` | `/api/*?`      |

---

## 🔄 Live Reload

* Automatically watches `views/` and reloads browser
* Injects `<script>` tag automatically in rendered pages
* No browser extension required
* Works with `.pug`, `.html`, `.md`, and `.js` views

---

## 🧪 Template Interpolation

You can use `{{ variable }}` inside `.html`, `.pug`, and `.md`.

```html
<h1>Hello, {{ query.name }}</h1>
<p>Time: {{ new Date().toLocaleTimeString() }}</p>
```

> Certain blocks like `<script>` and comments are excluded from interpolation for safety.

---

## ❌ Error Overlay

When rendering fails (in dev), a browser overlay will appear:

```bash
⚠️ SSR Rendering Error

File: /views/pages/user/[id].js

Error: Unexpected token export
```

---

## 📄 Disabling Layout

Layout is applied automatically, but you can disable it per view:

| View Type | How to disable layout                                 |
| --------- | ----------------------------------------------------- |
| `.pug`    | Add `//- nolayout` at top                             |
| `.md`     | Add in frontmatter: `nolayout: true`                  |
| `.js`     | Return `{ nolayout: true }` or include in frontmatter |

---

## 📚 API Reference

### `Attach(app: Express, options?)`

* Loads routes from `views/pages/`
* Applies view rendering engine
* Enables live reload via SSE
* Supports optional config overrides

---

## 📦 Scripts

Add this in your `package.json`:

```json
"scripts": {
  "dev": "node index.js"
}
```

Then run:

```bash
npm run dev
```

---

## 🔐 Security Notes

* Sandboxed parser for `.html` and `.md`
* Blocks unsafe expressions like `eval`, `Function`, `window`, etc.

---

## 📝 License

[ISC](./LICENSE)

---

## ✍️ Author

**HBH**
Made with ❤️ for Express.js developers
