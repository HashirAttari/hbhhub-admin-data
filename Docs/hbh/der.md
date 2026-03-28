# hbh-der

Dynamic, zero-config Express routing and middleware loader with hot-reload and subdomain support.

**Dynamic Express Routes (hbh-der)**  
🚀 A zero-config, filesystem-based Express routing and middleware loader with optional hot reloading and hybrid rendering support.

---

## 🌟 Features

- ✅ **Zero Manual Routing** — Auto-loads routes based on file structure
- ✅ **Middleware Auto-loader** — Plug in middleware files instantly
- 🔁 **Hot Reloading** — Watch mode using `chokidar` (optional) 🔥
- 🌐 **Hybrid Routes** — Serve API responses or HTML views from the same route
- ⚡ **Subdomain Routes** — Handle Subdomains Efficiently
- ⚙️ **Pluggable Config** — Easily override defaults with your own config
- 📁 **Nested Routing** — Supports deeply nested directories
- 📦 **Smart Middleware Sorting** — CORS and essentials come first
- 🧪 **Test Mode** — Load routes/middleware without executing them
- 📋 **Categorized Logging** — Structured logs for routes, warnings, errors
- 📋 **Extensive Built-in Middlewares** — Robust, ready-to-use middleware collection included out-of-the-box under `Middlewares`

---

## 📦 Installation

```bash
npm install hbh-der
```

Or with yarn:

```bash
yarn add hbh-der
```

---

## 🧩 Project Structure

Example directory layout:

```
my-app/
├── app/
│   ├── routes/
│   │   └── about.js       → GET /about
│   │   └── users/[id].js  → GET /users/:id
│   ├── middlewares/
│   │   └── cors.js        → Applies globally
│   └────── logger.js
├── hbh-der.config.js      → Optional
└── index.js
```

---

## 🚀 Quick Start

Create a `demo.js`:

```js
import { server } from "hbh-der";

server.start({
  port: 3000,
});
```

Run it:

```bash
node demo.js
```

---

## 🛠️ Configuration

Create `hbh-der.config.js` in your project root:

```js
import path from "path";

const __dirname = path.join(process.cwd(), "app");

export const directories = {
  __dirname,
  routes: "routes",
  middleware: "middlewares",
};
```

This is automatically loaded via `hbh-ccl`. You can optionally pass your own config when starting the server.

---

## 📁 Routes

Each file in `routes/` becomes an Express route.

### 🔁 File → Route Mapping

| File Path               | Route         |
| ----------------------- | ------------- |
| `routes/index.js`       | `/`           |
| `routes/about.js`       | `/about`      |
| `routes/users/[id].js`  | `/users/:id`  |
| `routes/blog/index.js`  | `/blog`       |
| `routes/blog/[slug].js` | `/blog/:slug` |

### 📄 Route Exports

Each route should default-export:

- A handler function
- OR an array of route tuples:

```js
export default [
  ["/hello", (req, res) => res.send("Hi!")],
  ["/goodbye", (req, res) => res.send("Bye!"), { method: "post" }],
];
```

You can also use query-based routing:

```js
export default [["/details?mode=edit", handlerFn]];
```

---

## 🧱 Middleware

Files in `middlewares/` are auto-loaded.

### ✨ Supported Patterns

```js
// default export
export default function(req, res, next) { ... }

// factory middleware
export default () => (req, res, next) => { ... }

// named export
export function myLogger(req, res, next) { ... }
```

Override or disable via config:

```js
server.start({
  middlewareConfig: {
    "logger.js": { export: "myLogger" }, // use named export
    "auth.js": false, // disable this middleware
  }
});
```

---

## 🌀 HybridRoute Support

`Routes.HybridRoute` returns an Express-compatible middleware function that decides, based on headers or query params, whether to serve the front-end HTML or backend JSON.

```js
import { Routes } from "hbh-der";

app.get( "/hello", Routes.HybridRoute({
    frontEndHandler: (req, res) => res.send(`<h1>Hello ${req.query.name || "Guest"}</h1>`),
    backEndHandler: (req, res) => res.json({ hello: req.query.name || "Guest" }),
  })
);
```
---

## 🌀 SubdomainRouting Support

Use `SubdomainRouting` to manage subdomains: And ensure the middleware is applied:

```js
import { Routes, Middlewares } from "hbh-der";
app.use(
  Middlewares.subdomainParser({
    baseDomainLevels: 1 /* based on '.' */,
    reverse: false,
  })
);
app.get(
  "/",
  Routes.SubdomainRouting({
    api: (req, res) => res.send("API subdomain"),
    admin: (req, res) => res.send("Admin subdomain"),
    "blog.api": (req, res) => res.send("Blog under API subdomain"),
    "*": (req, res) =>
      res.send(`Wildcard handler: ${req._subdomains.join(".")}`),
    "/": (req, res) => res.send("Main domain (no subdomain)"),
  })
);
```

---

## 🔁 Hot Reloading (`watch`)

Enable automatic hot-reloading of routes and middleware using `chokidar`.
⚠️ Hot reloading is intended for development use only. Avoid enabling `watch` in production environments for stability and performance reasons.

### ✅ Usage

Pass `watch: true` to `server.start()`:

```js
import { server } from "hbh-der";

server.start({
  port: 3000,
  watch: true, // enables hot reload
});
```

This will automatically watch for changes in:

* `routes/` directory
* `middlewares/` directory

When a file is **added**, **modified**, or **deleted**, the server will reload only the affected route or middleware — without restarting the entire process.

---

## 📊 Logs

Structured logging is available:

```js
import { logs, detailedLogs, allRoutes } from "hbh-der/utils/Logs.js";

console.log(logs); // raw log array
console.log(detailedLogs.success); // success logs
console.log(allRoutes); // all active routes
```

---

## 🔧 API Reference

### `server.start(config?)`

| Option             | Description                                  | Default       |
| ------------------ | -------------------------------------------- | ------------- |
| `port`             | Port to run the server                       | `4000`        |
| `directories`      | Override directory config                    | Auto-detected |
| `middlewareConfig` | Per-file middleware overrides                | `{}`          |
| `routesConfig`     | `useType`, global middlewares for all routes | `{}`          |

### `HybridRoute(app, path, handler, viewName)`

Serve both API and view response based on headers or `?api=true`.

---

## 🔬 Test Mode

Use `testMode: true` to load but not execute middlewares (for testing).

```js
await loadMiddlewares(app, "middlewares", { testMode: true });
```

---

## 🧩 Advanced Usage

### Global Middleware Sort

Customize load order:

```js
middlewareConfig: {
  sort: (a, b) => {
    if (a === "cors.js") return -1;
    return a.localeCompare(b);
  };
}
```

---

## 📦 Built-in Middlewares

`hbh-der` comes with a robust collection of 40+ pre-made middlewares available under the `Middlewares` export.

Example usage:

```js
import { server, Middlewares } from "hbh-der";

app.use(Middlewares.subdomainParser({ baseDomainLevels: 1, reverse: false }));
app.use(Middlewares.logRequest);
```

---

## 🧪 Example Middleware (factory)

```js
// middlewares/auth.js
export default () => (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized");
  }
  next();
};
```

---

## 📣 Credits

Created by **HBH**
Inspired by zero-config routing patterns and filesystem-first architectures.
