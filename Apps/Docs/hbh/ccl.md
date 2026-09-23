# 🧩 hbh-ccl

> A lightweight and flexible custom config loader for Node.js (ESM-only) projects.

`hbh-ccl` helps you load a configuration file from your project directory — either from the root or `./config/` folder — and gracefully fall back to a default config if none is provided.

✅ Built for modern ESM syntax  
⚡ Async and minimal  
🧠 Smart fallback + deep merging  

---

## ✨ Features

- ✅ Loads user-defined config from:
  - `./<configName>` or
  - `./config/<configName>`
- 🔄 Falls back to a default config path (relative or absolute)
- 🧠 Supports both `export default` and full module exports
- ⚡ Fully async and non-blocking
- 🗂️ ESM-only (no `.json`, `.cjs`, or CommonJS)
- 🧪 Clean and testable structure

---

## 📦 Installation 

Install via npm:

```bash
npm install hbh-ccl
```
Or using yarn:
```bash
yarn add hbh-ccl
```
---

## 🚀 Usage

### 1️⃣ Create your config file

Create a config file in your project root or inside `config/` folder (optional if you're using fallback only):

```js
// custom.config.js
export default {
  port: 3000,
  debug: true,
  database: {
    host: 'localhost',
    user: 'root'
  }
};
```

### 2️⃣ Load it in your app

```js
import { loadConfig } from 'hbh-ccl';

const config = await loadConfig({
  configName: 'custom.config.js',            // optional
  defaultConfigPath: './default.config.js',  // required
  verbose: true                              // optional
});

console.log('Loaded Config:', config);
```

> 🔍 If the config isn’t found in `./` or `./config/`, it will load the fallback from `defaultConfigPath`.

---

## 📂 Where It Looks for Config

`loadConfig()` checks for your config in the following order:

1. 📁 `./<configName>` (project root)
2. 📁 `./config/<configName>` (config subfolder)
3. 🧱 Fallback: `defaultConfigPath`

This ensures flexibility for both flat and organized project structures.

---

## 📄 API Reference

### `loadConfig(options) ⇒ Promise<Object>`

Loads a config file, optionally merging it over a default one.

#### Parameters

| Name                | Type      | Required | Default                  | Description                                                     |
| ------------------- | --------- | -------- | ------------------------ | --------------------------------------------------------------- |
| `configName`        | `string`  | ❌        | `'customName.config.js'` | Name of the config file to look for in `cwd/` and `cwd/config/` |
| `defaultConfigPath` | `string`  | ✅        | *None*                   | Path to fallback config (absolute or relative to `cwd`)         |
| `merge`             | `boolean` | ❌        | `true`                   | Whether to deep-merge user config over default                  |
| `verbose`           | `boolean` | ❌        | `false`                  | Log which config was loaded and from where                      |
| `cwd`               | `string`  | ❌        | `process.cwd()`          | Base path to resolve config paths                               |

#### Returns

* `Promise<Object>` — The exported config object (from `export default` or full module)

---

## 🧪 Example Configs

### ✅ Default Config (used as fallback)

```js
// default.config.js
export default {
  port: 8080,
  debug: false
};
```

### ✅ User Config (with default export)

```js
// custom.config.js
export default {
  port: 4000,
  debug: true,
  featureFlag: true
};
```

### ✅ User Config (with named exports)

```js
// custom.config.js
export const port = 5000;
export const debug = true;
```

> 🧠 `hbh-ccl` supports both default and named exports — whichever is present.

---

## 🗂 Example Project Structure

```
my-app/
├── custom.config.js          # Optional: user config
├── config/
│   └── custom.config.js      # Also supported!
├── default.config.js         # Required fallback
├── index.js
└── package.json
```

---

## ❗ Important Notes

* ⚠️ **ESM-only**: Config files must use `import`/`export` syntax
* ❌ `.json`, `.cjs`, or `require()` are not supported
* 🧱 Node.js v14+ is recommended
* 📍 Relative paths (like `./default.config.js`) are resolved from `cwd`

---

## 💡 Advanced Notes

* 🧠 Uses `structuredClone()` for deep cloning if available (Node.js 17+), with fallback to `JSON.parse(JSON.stringify(...))`
* 🗃 Configs are cached internally to prevent redundant imports (good for performance in CLI apps or scripts)

---

## 🛠 Troubleshooting

### ❌ `Error: Cannot find module`

* Ensure your config file path is spelled correctly
* Use `verbose: true` to see what file is being resolved

### ❌ `Unexpected token 'export'`

* You're likely using CommonJS. Make sure your config files use `export` instead of `module.exports`

---

## 🔗 Related Projects

| Project                                                     | Description                                              |
| ----------------------------------------------------------- | -------------------------------------------------------- |
| [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) | A powerful config loader that supports many file formats |
| [conf](https://github.com/sindresorhus/conf)                | Simple config handling, great for CLIs and Electron apps |

> 🧩 `hbh-ccl` is intentionally **lightweight and minimal** — no YAML, no JSON, no recursion, no surprises.

---

## 📜 License

This project is licensed under the [ISC License](./LICENSE).

---

## ✍️ Author

Made with ❤️ by **HBH**
