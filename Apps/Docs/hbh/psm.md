# 🏗️ **HBH Project Structure Maker (hbh-psm)**

**A flexible Node.js project scaffolding tool** with support for templating, dry-run previews, conditional generation, backups, and more. 🚀

---

## 📦 Installation

```bash
npm install hbh-psm
```

---

## ✨ Features

* 🗂 **Flexible Project Generation**: Define folder/file structures in an easy, visual tree format.
* 🔧 **Templating**: Replace variables in files dynamically using `{{variable}}`.
* 👀 **Dry-run Mode**: Preview the generated project without writing files.
* 🛡 **File Backup**: Automatically backup existing files before overriding.
* ⚡ **Conditional Generation**: Generate certain files/folders only if conditions are met.
* 📝 **Callbacks**: Hook into file/folder creation events.
* 📄 **Append Mode**: Add content to existing files instead of overwriting.
* 🌟 **Verbose Logging**: Monitor the generation process step by step.

---

## 🛠️ Usage

### Import the package

```js
import { Maker, Parser } from 'hbh-psm';
```

* `Maker` → Project generator class.
* `Parser` → Text-based tree parser.

---

### 1️⃣ Define a Project Structure

You can define a structure using nested objects or parse from a text-based visual tree:

```js
const structure = {
  "src": {
    "index.js.template": "console.log('Hello {{name}}!');",
    "utils.js": "// utility functions"
  },
  "README.md": "# {{projectName}}"
};
```

Or parse from text:

```js
const textTree = `
src/
├── index.js.template    console.log('Hello {{name}}!');
├── utils.js
README.md    # Project README
`;

const structure = Parser(textTree, true, { separator: null, metadata: true });
```

---

### 2️⃣ Generate the Project

```js
const generator = new Maker('./my-project', structure, {
  variables: { name: 'World', projectName: 'AwesomeProject' },
  dryRun: false,       // true for preview only
  override: true,      // overwrite existing files
  addBackup: true,     // create backups if file exists
  verbose: true
});

generator.generate()
  .then(() => console.log('✅ Project created!'))
  .catch(err => console.error('❌ Error:', err));
```

---

### 3️⃣ Dry-Run Preview

```js
const generator = new Maker('./my-project', structure, { dryRun: true });
const preview = await generator.generate();

console.log(preview);
/*
[
  { type: 'folder', path: './my-project/src' },
  { type: 'file', path: './my-project/src/index.js', content: "console.log('Hello World!');" },
  { type: 'file', path: './my-project/README.md', content: '# AwesomeProject' }
]
*/
```

---

### 4️⃣ Conditional Generation

You can skip certain files or folders dynamically:

```js
const generator = new Maker('./my-project', structure, {
  conditions: { "utils.js": false } // will not generate utils.js
});
```

---

### 5️⃣ Callbacks on Creation

```js
const generator = new Maker('./my-project', structure, {
  onCreate: ({ type, path }) => console.log(`Created ${type}: ${path}`)
});
```

---

### 6️⃣ Ignore Patterns

Skip files/folders by name or regex:

```js
const generator = new Maker('./my-project', structure, {
  ignore: ['README.md', /\.log$/]
});
```

---

### 7️⃣ File Append Mode

Append content to existing files instead of overwriting:

```js
const generator = new Maker('./my-project', structure, {
  append: true
});
```

---

## ⚡ Quick Example

```js
import { Maker, Parser } from 'hbh-psm';

(async () => {
  // 1️⃣ Define project structure using text tree
  const textTree = `
src/
├── index.js.template    console.log('Hello {{name}}!');
├── utils.js             // Utility functions
README.md                # {{projectName}} Project
.env                     NODE_ENV=development
`;

  // 2️⃣ Parse the text tree into an object structure
  const structure = Parser(textTree, true, { separator: null, metadata: true });

  // 3️⃣ Configure generator options
  const generator = new Maker('./my-project', structure, {
    variables: { name: 'World', projectName: 'AwesomeProject' },
    dryRun: false,       // Set true to preview only
    override: true,      // Overwrite existing files
    append: false,       // Append content to files instead of overwriting
    addBackup: true,     // Backup existing files before overwriting
    verbose: true,       // Enable step-by-step logging
    ignore: ['.env'],    // Example: ignore environment file
    conditions: { 'utils.js': true }, // Conditionally generate utils.js
    onCreate: ({ type, path }) => console.log(`Created ${type}: ${path}`)
  });

  // 4️⃣ Generate the project
  try {
    const result = await generator.generate();
    console.log('✅ Project generation complete!');

    // 5️⃣ Optional: preview result in dry-run mode
    if (generator.options.dryRun) {
      console.log('Preview of files/folders:', result);
    }
  } catch (err) {
    console.error('❌ Error generating project:', err);
  }
})();
```

### ✅ What this example do:

1. Parses a **text-based project tree** into structured objects.
2. Supports **template variables** (`{{name}}`, `{{projectName}}`) in files.
3. Uses **dry-run / verbose / backup** options safely.
4. Skips files dynamically via **ignore patterns**.
5. Supports **conditional file generation**.
6. Hooks into **creation callbacks** for logging.
7. Includes **append mode** as optional behavior.

---

## 🧩 Options Reference

| Option        | Type     | Default     | Description                              |
| ------------- | -------- | ----------- | ---------------------------------------- |
| `dryRun`      | boolean  | `false`     | Preview without creating files           |
| `override`    | boolean  | `false`     | Overwrite existing files                 |
| `append`      | boolean  | `false`     | Append content to files                  |
| `verbose`     | boolean  | `false`     | Enable logging                           |
| `ignore`      | array    | `[]`        | List of names or regex to ignore         |
| `onCreate`    | function | `() => {}`  | Callback after file/folder creation      |
| `templateExt` | string   | `.template` | Extension used for template files        |
| `mode`        | number   | `0o644`     | File/folder permissions                  |
| `conditions`  | object   | `{}`        | Conditional generation map               |
| `addBackup`   | boolean  | `false`     | Backup existing files before overwriting |
| `variables`   | object   | `{}`        | Variables for template substitution      |

---

## 🌳 Text Tree Format Example

```text
src/
├── index.js.template    console.log('Hello {{name}}!');
├── utils.js
README.md    # Project README
```

* Folders end with `/`.
* Template files end with `.template`.
* Use spaces or separators to define inline content.

---

## 💡 Tips

* Combine `Parser` + `Maker` for a full text-to-project workflow.
* Use `dryRun: true` first to avoid accidental overwrites.
* Leverage `variables` for dynamic scaffolding.

---

## 🔑 Keywords

`project-generator`, `project-scaffold`, `nodejs`, `boilerplate`, `templating`, `automation`, `file-structure`, `project-init`, `dry-run`, `backup-files`

---

## 📄 License

ISC © HBH
